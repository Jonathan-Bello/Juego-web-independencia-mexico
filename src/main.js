// Arranque del juego. Por ahora solo comprueba que los datos cargan.
// El bucle completo se arma en el issue "Conectar estado, reloj e interfaz".

const raiz = document.getElementById('juego');

try {
  const respuesta = await fetch('data/questions.json');
  const { escenas } = await respuesta.json();
  raiz.innerHTML = `
    <h1>Grito en Tiempo Real</h1>
    <p>Prototipo en construcción: ${escenas.length} escenas cargadas.</p>
    <ol>${escenas.map((e) => `<li>${e.titulo}</li>`).join('')}</ol>`;
} catch (error) {
  raiz.textContent = 'No se pudieron cargar las escenas. ¿Abriste el juego con un servidor local? (ver README)';
  console.error(error);
}
