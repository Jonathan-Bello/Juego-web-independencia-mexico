// Reloj de escena — GDD secciones 2.2 y 5.2.
// Usa performance.now() dentro de requestAnimationFrame (nunca setInterval).
// Se pausa cuando la pestaña se oculta (visibilitychange).

/**
 * Crea el reloj de una escena dividida en tiempos.
 * @param {object} opciones
 * @param {number} [opciones.msPorTiempo=10000]  10000 normal, 15000 en Modo calma.
 * @param {number} [opciones.tiempos=3]
 * @param {(tiempo: 1|2|3) => void} opciones.alCambiarTiempo  Se llama al iniciar cada tiempo.
 * @param {(fraccion: number) => void} [opciones.alAvanzar]  Progreso de 0 a 1 en cada cuadro.
 * @param {() => void} opciones.alTerminar  Se llama una vez cuando se acaba la escena.
 * @param {() => number} [opciones.ahora=performance.now]  Inyectable para pruebas.
 * @returns {{ iniciar(): void, pausar(): void, reanudar(): void, detener(): void, tiempoActual(): 1|2|3 }}
 */
export function crearReloj(opciones) {
  throw new Error('No implementado: ver el issue "Implementar timer.js"');
}
