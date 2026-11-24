// Reglas de puntuación — GDD sección 2.3.
// Funciones puras: sin DOM, sin estado global. Se prueban en tests/scoring.test.js.

/** Multiplicador por tiempo de la escena: tiempo 1 = x3, tiempo 2 = x2, tiempo 3 = x1. */
export const MULTIPLICADORES = [3, 2, 1];

/** Puntaje máximo de una partida de 5 escenas. */
export const PUNTAJE_MAXIMO = 1500;

const RANGOS = [
  { minimo: 1200, nombre: 'Insurgente de honor' },
  { minimo: 700, nombre: 'Capitán trigarante' },
  { minimo: 300, nombre: 'Recluta de Dolores' },
  { minimo: 0, nombre: 'Cronista despistado' },
];

/**
 * Puntos base según cuántas opciones correctas eligió el jugador.
 * @param {number[]} elegidas  Índices de las opciones elegidas (0 a 2 elementos).
 * @param {{correcta: boolean}[]} opciones  Las 4 opciones de la escena.
 * @returns {number} 100 si eligió las 2 correctas, 25 si eligió 1 correcta, 0 en otro caso.
 */
export function puntosBase(elegidas, opciones) {
  const unicas = [...new Set(elegidas)];
  const aciertos = unicas.filter((i) => opciones[i]?.correcta === true).length;
  if (aciertos === 2 && unicas.length === 2) return 100;
  if (aciertos === 1) return 25;
  return 0;
}

/**
 * Puntos de una escena.
 * @param {number[]} elegidas
 * @param {{correcta: boolean}[]} opciones
 * @param {1|2|3|null} tiempo  Tiempo de la escena en que se confirmó; null si se acabó el reloj.
 * @returns {number} puntosBase × multiplicador del tiempo, o 0 si tiempo es null.
 */
export function puntosEscena(elegidas, opciones, tiempo) {
  if (tiempo == null) return 0;
  const multiplicador = MULTIPLICADORES.at(tiempo - 1);
  if (multiplicador === undefined || tiempo < 1) {
    throw new RangeError(`tiempo debe ser 1, 2, 3 o null; se recibió ${tiempo}`);
  }
  return puntosBase(elegidas, opciones) * multiplicador;
}

/**
 * Rango final según el total de la partida.
 * @param {number} total
 * @returns {'Insurgente de honor'|'Capitán trigarante'|'Recluta de Dolores'|'Cronista despistado'}
 */
export function rango(total) {
  return RANGOS.find((r) => total >= r.minimo)?.nombre ?? 'Cronista despistado';
}
