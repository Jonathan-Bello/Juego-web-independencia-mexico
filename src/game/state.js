// Máquina de estados — GDD sección 5.2.
// TITULO → ESCENA (tiempos 1→2→3) → RESOLUCION → ESCENA siguiente o RESULTADOS → TITULO

export const ESTADOS = Object.freeze({
  TITULO: 'TITULO',
  ESCENA: 'ESCENA',
  RESOLUCION: 'RESOLUCION',
  RESULTADOS: 'RESULTADOS',
});

/**
 * Crea una partida.
 * @param {object[]} escenas  Las escenas de data/questions.json.
 * @param {{ modoCalma?: boolean, barajar?: (arr: any[]) => any[] }} [config]
 * @returns {{
 *   estado(): string,
 *   escenaActual(): object|null,
 *   jugar(): void,
 *   elegir(indice: number, tiempo: 1|2|3): void,
 *   terminarTiempo(): void,
 *   siguiente(): void,
 *   resumen(): { total: number, rango: string, escenas: object[] }
 * }}
 */
export function crearPartida(escenas, config = {}) {
  throw new Error('No implementado: ver el issue "Implementar state.js"');
}
