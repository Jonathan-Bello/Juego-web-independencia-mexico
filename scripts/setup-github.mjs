#!/usr/bin/env node
// Crea el repositorio en GitHub y lo deja listo para el equipo:
// sube el código, crea etiquetas, milestones por sesión, issues, activa GitHub Pages,
// protege la rama main e invita a colaboradores.
//
// Requisitos: git y GitHub CLI (https://cli.github.com) con sesión iniciada: `gh auth login`.
//
// Uso (desde la carpeta del proyecto):
//   node scripts/setup-github.mjs
//   node scripts/setup-github.mjs --nombre grito-en-tiempo-real --owner mi-organizacion
//   node scripts/setup-github.mjs --colaboradores usuario1,usuario2,usuario3
//   node scripts/setup-github.mjs --privado        (Pages y protección de main pueden requerir plan de pago)
//   node scripts/setup-github.mjs --simular        (muestra los comandos sin ejecutarlos)

import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(raiz);

// ---------- argumentos ----------
const args = process.argv.slice(2);
const valor = (flag, porDefecto) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : porDefecto;
};
const tiene = (flag) => args.includes(flag);

const simular = tiene('--simular');
const privado = tiene('--privado');
const nombre = valor('--nombre', 'juego-web-independencia-mexico');
const colaboradores = valor('--colaboradores', '').split(',').map((s) => s.trim()).filter(Boolean);
const sinIssues = tiene('--sin-issues');

// ---------- utilidades ----------
const avisos = [];

function correr(cmd, argumentos, { entrada, opcional = false, silencioso = false } = {}) {
  const linea = `${cmd} ${argumentos.map((a) => (/\s/.test(a) ? JSON.stringify(a) : a)).join(' ')}`;
  if (simular) {
    console.log(`  [simular] ${linea.length > 160 ? linea.slice(0, 160) + '…' : linea}`);
    return { ok: true, salida: '' };
  }
  const r = spawnSync(cmd, argumentos, {
    input: entrada,
    encoding: 'utf8',
    stdio: [entrada ? 'pipe' : 'inherit', 'pipe', 'pipe'],
  });
  const ok = r.status === 0;
  if (!ok) {
    const error = (r.stderr || r.error?.message || '').trim();
    if (opcional) {
      avisos.push(`${linea.slice(0, 80)}… → ${error.split('\n')[0]}`);
    } else {
      console.error(`\n✗ Falló: ${linea}\n${error}`);
      process.exit(1);
    }
  } else if (!silencioso && r.stdout.trim()) {
    console.log(`  ${r.stdout.trim().split('\n')[0]}`);
  }
  return { ok, salida: (r.stdout || '').trim() };
}

const esperar = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const paso = (texto) => console.log(`\n▸ ${texto}`);

// ---------- comprobaciones ----------
paso('Comprobando git y GitHub CLI');
if (!simular) {
  for (const [cmd, ayuda] of [
    ['git', 'Instala git: https://git-scm.com'],
    ['gh', 'Instala GitHub CLI: https://cli.github.com'],
  ]) {
    if (spawnSync(cmd, ['--version'], { encoding: 'utf8' }).status !== 0) {
      console.error(`✗ No encontré "${cmd}". ${ayuda}`);
      process.exit(1);
    }
  }
  if (spawnSync('gh', ['auth', 'status'], { encoding: 'utf8' }).status !== 0) {
    console.error('✗ GitHub CLI no tiene sesión. Corre: gh auth login');
    process.exit(1);
  }
}

const owner = valor('--owner') ?? (simular ? 'tu-usuario' : correr('gh', ['api', 'user', '--jq', '.login'], { silencioso: true }).salida);
const repo = `${owner}/${nombre}`;
console.log(`  Repositorio: ${repo} (${privado ? 'privado' : 'público'})`);

// ---------- 1. git local ----------
paso('Preparando el repositorio local');
if (!existsSync(join(raiz, '.git'))) {
  correr('git', ['init', '-b', 'main']);
}
correr('git', ['add', '-A']);
const hayCommits = simular || spawnSync('git', ['rev-parse', '--verify', 'HEAD'], { encoding: 'utf8' }).status === 0;
const hayCambios = simular || spawnSync('git', ['diff', '--cached', '--quiet']).status !== 0;
if (!hayCommits || hayCambios) {
  correr('git', ['commit', '-m', 'chore: estructura inicial del proyecto Grito en Tiempo Real']);
}
correr('git', ['branch', '-M', 'main']);

// ---------- 2. crear repo y subir ----------
paso('Creando el repositorio en GitHub y subiendo main');
const yaExiste = !simular && spawnSync('gh', ['repo', 'view', repo], { encoding: 'utf8' }).status === 0;
if (yaExiste) {
  console.log('  El repositorio ya existe; solo subo los cambios.');
  if (spawnSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' }).status !== 0) {
    correr('git', ['remote', 'add', 'origin', `https://github.com/${repo}.git`]);
  }
  correr('git', ['push', '-u', 'origin', 'main']);
} else {
  correr('gh', [
    'repo', 'create', repo,
    privado ? '--private' : '--public',
    '--source', '.', '--remote', 'origin', '--push',
    '--description', 'Quiz en tiempo real sobre la Independencia de México — proyecto de clase con agentes de IA',
  ]);
}

// ---------- 3. etiquetas y milestones ----------
const plan = JSON.parse(readFileSync(join(raiz, 'scripts', 'issues.json'), 'utf8'));

paso('Creando etiquetas');
for (const l of plan.labels) {
  correr('gh', ['label', 'create', l.name, '--repo', repo, '--color', l.color, '--description', l.description, '--force'], { opcional: true, silencioso: true });
}

paso('Creando milestones (una por sesión)');
const existentes = simular ? [] : JSON.parse(correr('gh', ['api', `repos/${repo}/milestones?state=all&per_page=100`], { silencioso: true }).salida || '[]').map((m) => m.title);
for (const m of plan.milestones) {
  if (existentes.includes(m.title)) continue;
  correr('gh', ['api', `repos/${repo}/milestones`, '-f', `title=${m.title}`, '-f', `description=${m.description}`], { opcional: true, silencioso: true });
}

// ---------- 4. issues ----------
if (!sinIssues) {
  paso(`Creando ${plan.issues.length} issues`);
  const titulos = simular ? [] : correr('gh', ['issue', 'list', '--repo', repo, '--state', 'all', '--limit', '200', '--json', 'title', '--jq', '.[].title'], { silencioso: true }).salida.split('\n');
  for (const i of plan.issues) {
    if (titulos.includes(i.title)) {
      console.log(`  (ya existe) ${i.title}`);
      continue;
    }
    const etiquetas = i.labels.flatMap((l) => ['--label', l]);
    correr('gh', ['issue', 'create', '--repo', repo, '--title', i.title, '--body', i.body, '--milestone', i.milestone, ...etiquetas], { opcional: true });
    if (!simular) esperar(1200); // evita el límite de velocidad de GitHub
  }
}

// ---------- 5. GitHub Pages ----------
paso('Activando GitHub Pages (publicación con GitHub Actions)');
correr('gh', ['api', '-X', 'POST', `repos/${repo}/pages`, '-f', 'build_type=workflow'], { opcional: true, silencioso: true });

// ---------- 6. proteger main ----------
paso('Protegiendo la rama main (PR obligatorio, 1 aprobación, CI en verde)');
const proteccion = JSON.stringify({
  required_status_checks: { strict: true, contexts: ['pruebas'] },
  enforce_admins: false,
  required_pull_request_reviews: { required_approving_review_count: 1, dismiss_stale_reviews: true },
  restrictions: null,
  allow_force_pushes: false,
  allow_deletions: false,
});
correr('gh', ['api', '-X', 'PUT', `repos/${repo}/branches/main/protection`, '--input', '-'], { entrada: proteccion, opcional: true, silencioso: true });

// ---------- 7. colaboradores ----------
if (colaboradores.length) {
  paso(`Invitando a ${colaboradores.length} colaboradores con permiso de escritura`);
  for (const u of colaboradores) {
    correr('gh', ['api', '-X', 'PUT', `repos/${repo}/collaborators/${u}`, '-f', 'permission=push'], { opcional: true, silencioso: true });
    console.log(`  invitación enviada: ${u}`);
  }
}

// ---------- resumen ----------
console.log(`\n✓ Listo: https://github.com/${repo}`);
console.log(`  Issues:     https://github.com/${repo}/issues`);
console.log(`  Milestones: https://github.com/${repo}/milestones`);
console.log(`  Pages:      https://${owner.toLowerCase()}.github.io/${nombre}/ (tarda unos minutos tras el primer push)`);
if (avisos.length) {
  console.log('\n⚠ Pasos que no se pudieron completar (puedes hacerlos a mano en Settings):');
  for (const a of avisos) console.log(`  - ${a}`);
}
