# Cómo colaborar

Guía para las personas del equipo. Tu agente de IA sigue `AGENTS.md`; tú sigues esta guía y **revisas todo lo que hace tu IA antes de pedir revisión**.

## Reglas del equipo

- Nadie trabaja directo en `main`. Todo entra por Pull Request (PR).
- Un issue = una rama = un PR.
- Cada PR necesita la aprobación de **otra persona** (no de quien lo abrió) y la CI en verde.
- Si cambia el diseño, primero se cambia `docs/GDD.md` en un PR propio.

## Flujo paso a paso

### 1. Toma un issue

En **Issues**, elige uno sin asignar del milestone de la sesión actual. Asígnatelo (*Assignees → yo*) y comenta "Lo tomo".

### 2. Actualiza tu copia y crea tu rama

```bash
git switch main
git pull
git switch -c feat/12-reloj-de-escena     # usa el número y tema de tu issue
```

Prefijos de rama: `feat/` (función nueva), `fix/` (arreglo), `content/` (textos o datos), `docs/` (documentación), `art/` (imágenes o audio).

### 3. Trabaja con tu IA

Abre el repositorio con tu herramienta (Claude Code, Copilot, Cursor u otra) y dale una instrucción como esta:

```text
Trabaja el issue #12 de este repositorio. Lee primero AGENTS.md y docs/GDD.md.
Cumple los criterios de aceptación del issue. No toques archivos fuera de su alcance.
Al terminar, corre node --test y dime qué cambiaste.
```

En `docs/prompts.md` hay instrucciones más completas para cada rol.

Luego **revisa tú** lo que hizo: lee el diff, corre el juego y las pruebas. Tú eres responsable de lo que subes.

### 4. Guarda y sube tus cambios

```bash
node --test
git add .
git commit -m "feat: reloj de escena con tres tiempos (#12)"
git push -u origin feat/12-reloj-de-escena
```

### 5. Abre el Pull Request

En GitHub aparece el botón **Compare & pull request**. Llena la plantilla y escribe `Closes #12` para que el issue se cierre al fusionar. Pide revisión a un compañero.

### 6. Revisa el PR de alguien más

- Lee los cambios en la pestaña *Files changed* y comenta líneas concretas.
- Descarga la rama y pruébala: `git fetch` y `git switch feat/12-reloj-de-escena`.
- Aprueba (*Approve*) o pide cambios (*Request changes*) explicando qué y por qué.
- Pregúntate: ¿cumple los criterios del issue?, ¿la IA inventó algo?, ¿tocó archivos que no debía?

### 7. Después de la fusión

```bash
git switch main
git pull
git branch -d feat/12-reloj-de-escena
```

## Si algo sale mal

- **Conflicto al actualizar tu rama:** `git switch tu-rama` y luego `git merge main`; resuelve los archivos marcados, `git add` y `git commit`. Si no sabes cómo, pide ayuda en el PR.
- **La CI falló:** abre el detalle en la pestaña *Checks*, corrige en tu rama y vuelve a hacer push. El PR se actualiza solo.
- **Subiste algo a la rama equivocada:** avisa antes de intentar arreglarlo.
