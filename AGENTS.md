# Instrucciones para agentes de IA

Este archivo lo leen Claude Code, GitHub Copilot, Cursor, Codex y cualquier otro agente que trabaje en este repositorio. Las personas del equipo también deben conocerlo.

## Antes de empezar cualquier tarea

1. Lee `docs/GDD.md`. Es la fuente de verdad del diseño.
2. Lee el issue que te asignaron completo, incluidos sus criterios de aceptación.
3. Si la tarea contradice el GDD o no está clara, **no adivines**: detente y explica la duda en un comentario del issue.

## Cómo trabajar

- Trabaja solo en la rama del issue: `feat/<número>-<slug>`, `fix/<número>-<slug>` o `content/<número>-<slug>`.
- **Nunca** hagas push a `main` ni fusiones tu propio PR. Solo una persona aprueba y fusiona.
- Un issue = una rama = un PR. PRs pequeños: menos de 300 líneas cambiadas.
- Commits con prefijo: `feat:`, `fix:`, `content:`, `docs:`, `test:`, `chore:`.
- El PR enlaza su issue (`Closes #12`) y llena la plantilla completa.
- Toca solo los archivos que la tarea necesita. Si ves algo más que arreglar, propónlo en un issue nuevo.

## Reglas técnicas

- HTML, CSS y JavaScript con módulos ES. **Sin dependencias, frameworks ni paso de build.** Una dependencia nueva requiere un ADR aprobado en `docs/adr/`.
- `src/game/` no toca el DOM: funciones que se pueden probar con `node --test`.
- `src/ui/` no contiene reglas del juego: solo dibuja y escucha entradas.
- El reloj usa `performance.now()` con `requestAnimationFrame`, nunca `setInterval`.
- Corre `node --test` antes de abrir el PR. Si implementaste algo que tenía una prueba `todo`, quita el `todo` y haz que pase.
- Respeta las firmas de las funciones que ya existen en los archivos de `src/`. Si necesitas cambiarlas, explícalo en el PR.

## Contenido histórico

- No inventes fechas, nombres, citas ni datos. Usa solo lo que dice el GDD o el issue.
- Si propones texto nuevo, deja `"fuente": "Pendiente"`; un revisor humano verifica y anota la fuente.
- Los distractores deben ser falsos por una razón que enseñe algo (anacronismo, lugar o personaje equivocado) y llevar el campo `"porque"`.
- `data/questions.json` debe pasar `tests/questions.test.js`.

## Al terminar

En la descripción del PR indica: qué hiciste, cómo probarlo, qué no hiciste o qué dudas quedaron, y qué agente o herramienta usaste.
