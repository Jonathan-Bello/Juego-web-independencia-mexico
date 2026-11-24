# Grito en Tiempo Real

Quiz web sobre la Independencia de México: 5 escenas que **suceden mientras respondes**. En cada una eliges 2 de 4 opciones antes de que termine el evento (30 s).

Proyecto de clase de creación de videojuegos: lo construye un equipo de personas y sus agentes de IA, coordinados con issues, ramas y Pull Requests.

| | |
| --- | --- |
| Documento de diseño | [`docs/GDD.md`](docs/GDD.md) (fuente de verdad) |
| Reglas para agentes de IA | [`AGENTS.md`](AGENTS.md) |
| Cómo colaborar (personas) | [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| Prompts por rol de agente | [`docs/prompts.md`](docs/prompts.md) |
| Juego publicado | GitHub Pages (Settings → Pages muestra el enlace) |

## Correr el juego en tu computadora

No hay dependencias ni compilación. Solo necesitas un servidor local, porque el juego carga `data/questions.json`:

```bash
# Opción 1: con Python
python3 -m http.server 8080
# Opción 2: con Node
npx serve .
```

Abre <http://localhost:8080>.

## Correr las pruebas

Requiere Node 20 o superior:

```bash
node --test
```

Las pruebas marcadas como `TODO` describen lo que falta implementar; no rompen la CI. Cuando implementes una pieza, quita su `todo` en la prueba.

## Estructura

```text
├─ index.html · css/styles.css
├─ src/main.js              arranque
├─ src/game/                state.js · timer.js · scoring.js  (lógica, sin DOM)
├─ src/ui/                  render.js · input.js              (pantallas y controles)
├─ data/questions.json      las 5 escenas
├─ assets/                  imágenes, audio y CREDITS.md
├─ tests/                   pruebas con node:test
├─ docs/                    GDD, decisiones (adr/) y prompts
├─ AGENTS.md · CLAUDE.md    instrucciones para las IA
└─ .github/                 plantillas de issue/PR, CI y publicación en Pages
```

## Estado del proyecto

El avance se sigue en **Issues** y **Milestones** (una por sesión de clase).
