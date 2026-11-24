// Valida data/questions.json contra las reglas del GDD (secciones 2.1, 3 y 5.3).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const { escenas } = JSON.parse(
  await readFile(new URL('../data/questions.json', import.meta.url), 'utf8'),
);

const texto = (v) => typeof v === 'string' && v.trim().length > 0;

test('hay exactamente 5 escenas', () => {
  assert.equal(escenas.length, 5);
});

test('los id de escena son únicos', () => {
  assert.equal(new Set(escenas.map((e) => e.id)).size, escenas.length);
});

test('las escenas están en orden cronológico', () => {
  const fechas = escenas.map((e) => e.fecha.slice(0, 7));
  assert.deepEqual(fechas, [...fechas].sort());
});

for (const e of escenas) {
  test(`escena "${e.id}": campos obligatorios`, () => {
    for (const campo of ['id', 'titulo', 'fecha', 'lugar', 'pregunta', 'dato', 'fuente']) {
      assert.ok(texto(e[campo]), `falta o está vacío "${campo}"`);
    }
  });

  test(`escena "${e.id}": 3 tiempos con narración e imagen`, () => {
    assert.equal(e.tiempos.length, 3);
    for (const t of e.tiempos) {
      assert.ok(texto(t.narracion));
      assert.ok(texto(t.imagen));
    }
  });

  test(`escena "${e.id}": 4 opciones, exactamente 2 correctas`, () => {
    assert.equal(e.opciones.length, 4);
    assert.equal(e.opciones.filter((o) => o.correcta === true).length, 2);
    assert.equal(new Set(e.opciones.map((o) => o.texto)).size, 4, 'hay opciones repetidas');
  });

  test(`escena "${e.id}": cada distractor explica por qué es falso`, () => {
    for (const o of e.opciones.filter((o) => !o.correcta)) {
      assert.ok(texto(o.porque), `el distractor "${o.texto}" no tiene "porque"`);
    }
  });

  test(
    `escena "${e.id}": fuente verificada por una persona`,
    { todo: 'Un revisor humano reemplaza "Pendiente" por la fuente real' },
    () => {
      assert.notEqual(e.fuente, 'Pendiente');
    },
  );
}
