// Especificación de la puntuación — GDD sección 2.3.
// Estas pruebas están marcadas como TODO: no rompen la CI mientras scoring.js no exista.
// Quien implemente scoring.js debe quitar el `todo` de cada prueba y hacerlas pasar.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { puntosBase, puntosEscena, rango, MULTIPLICADORES, PUNTAJE_MAXIMO } from '../src/game/scoring.js';

const TODO = { todo: 'Issue: Implementar scoring.js' };

// Opciones de ejemplo: las dos primeras son correctas.
const opciones = [
  { texto: 'A', correcta: true },
  { texto: 'B', correcta: true },
  { texto: 'C', correcta: false },
  { texto: 'D', correcta: false },
];

test('constantes del GDD', () => {
  assert.deepEqual(MULTIPLICADORES, [3, 2, 1]);
  assert.equal(PUNTAJE_MAXIMO, 1500);
});

test('puntos base: 2 correctas = 100', TODO, () => {
  assert.equal(puntosBase([0, 1], opciones), 100);
  assert.equal(puntosBase([1, 0], opciones), 100);
});

test('puntos base: 1 correcta + 1 distractor = 25', TODO, () => {
  assert.equal(puntosBase([0, 2], opciones), 25);
  assert.equal(puntosBase([3, 1], opciones), 25);
});

test('puntos base: 0 correctas o sin respuesta = 0', TODO, () => {
  assert.equal(puntosBase([2, 3], opciones), 0);
  assert.equal(puntosBase([], opciones), 0);
});

test('multiplicador por tiempo: x3, x2, x1', TODO, () => {
  assert.equal(puntosEscena([0, 1], opciones, 1), 300);
  assert.equal(puntosEscena([0, 1], opciones, 2), 200);
  assert.equal(puntosEscena([0, 1], opciones, 3), 100);
  assert.equal(puntosEscena([0, 2], opciones, 1), 75);
});

test('sin respuesta antes de que acabe el reloj = 0', TODO, () => {
  assert.equal(puntosEscena([0], opciones, null), 0);
  assert.equal(puntosEscena([], opciones, null), 0);
});

test('rangos y sus límites', TODO, () => {
  assert.equal(rango(1500), 'Insurgente de honor');
  assert.equal(rango(1200), 'Insurgente de honor');
  assert.equal(rango(1199), 'Capitán trigarante');
  assert.equal(rango(700), 'Capitán trigarante');
  assert.equal(rango(699), 'Recluta de Dolores');
  assert.equal(rango(300), 'Recluta de Dolores');
  assert.equal(rango(299), 'Cronista despistado');
  assert.equal(rango(0), 'Cronista despistado');
});
