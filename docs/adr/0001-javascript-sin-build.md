# ADR 0001 — JavaScript puro, sin dependencias ni build

- **Estado:** aceptado
- **Fecha:** 2026-11-24

## Contexto

El equipo combina personas con distinta experiencia y varios agentes de IA. Queremos que cualquiera pueda correr el juego, entender los cambios de un PR y publicarlo en GitHub Pages sin configuración.

## Decisión

Usamos HTML, CSS y JavaScript con módulos ES nativos del navegador. No hay `npm install`, frameworks, motores ni paso de compilación. Las pruebas usan `node:test`, que viene con Node.

## Consecuencias

- Correr el juego solo requiere un servidor estático local.
- Los PRs son pequeños y legibles; los agentes no pueden agregar librerías por su cuenta.
- Si una necesidad real lo justifica (por ejemplo, un motor como Phaser), se propone en un ADR nuevo y lo aprueba el docente.

## Cómo escribir un ADR nuevo

Copia este archivo como `docs/adr/000N-titulo.md`, cambia el estado a "propuesto" y ábrelo en un PR.
