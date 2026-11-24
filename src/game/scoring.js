// Reglas de puntuación — GDD sección 2.3.
// Funciones puras: sin DOM, sin estado global. Se prueban en tests/scoring.test.js.

/** Multiplicador por tiempo de la escena: tiempo 1 = x3, tiempo 2 = x2, tiempo 3 = x1. */
export const MULTIPLICADORES = [3, 2, 1];

/** Puntaje máximo de una partida de 5 escenas. */
export const PUNTAJE_MAXIMO = 1500;

/**
 * Puntos base según cuántas opciones correctas eligió el jugador.
 * @param {number[]} elegidas  Índices de las opciones elegidas (0 a 2 elementos).
 * @param {{correcta: boolean}[]} opciones  Las 4 opciones de la escena.
 * @returns {number} 100 si eligió las 2 correctas, 25 si eligió 1 correcta, 0 en otro caso.
 */
export function puntosBase(elegidas, opciones) {
  throw new Error('No implementado: ver el issue "Implementar scoring.js"');
}

/**
 * Puntos de una escena.
 * @param {number[]} elegidas
 * @param {{correcta: boolean}[]} opciones
 * @param {1|2|3|null} tiempo  Tiempo de la escena en que se confirmó; null si se acabó el reloj.
 * @returns {number} puntosBase × multiplicador del tiempo, o 0 si tiempo es null.
 */
export function puntosEscena(elegidas, opciones, tiempo) {
  throw new Error('No implementado: ver el issue "Implementar scoring.js"');
}

/**
 * Rango final según el total de la partida.
 * @param {number} total
 * @returns {'Insurgente de honor'|'Capitán trigarante'|'Recluta de Dolores'|'Cronista despistado'}
 */
export function rango(total) {
  throw new Error('No implementado: ver el issue "Implementar scoring.js"');
}
