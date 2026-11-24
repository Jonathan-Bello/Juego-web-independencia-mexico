// Dibuja las pantallas en el DOM — GDD sección 4.1.
// Sin reglas del juego aquí: recibe datos de src/game/ y solo los muestra.

/** @param {HTMLElement} raiz */
export function pantallaTitulo(raiz) {}

/** @param {HTMLElement} raiz @param {object} escena @param {1|2|3} tiempo @param {number} fraccion */
export function pantallaEscena(raiz, escena, tiempo, fraccion) {}

/** @param {HTMLElement} raiz @param {object} escena @param {number[]} elegidas @param {number} puntos */
export function pantallaResolucion(raiz, escena, elegidas, puntos) {}

/** @param {HTMLElement} raiz @param {{ total: number, rango: string, escenas: object[] }} resumen */
export function pantallaResultados(raiz, resumen) {}
