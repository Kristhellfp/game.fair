// Definición de objetos del juego
const objetos = [
    { tipo: "organico", emoji: "🍎" },
    { tipo: "plastico", emoji: "🧴" },
    { tipo: "papel", emoji: "📰" },
    { tipo: "vidrio", emoji: "🍶" },
    { tipo: "organico", emoji: "🍌" },
    { tipo: "plastico", emoji: "🛍️" },
    { tipo: "papel", emoji: "📦" },
    { tipo: "vidrio", emoji: "🍾" }
];

let puntuacion = 0;
let objetosRestantes = [...objetos];
const mensajeElemento = document.getElementById('mensaje');
const puntosElemento = document.getElementById('puntos');
const contenedorObjetos = document.getElementById('objetos');

// Inicializar el juego
function iniciarJuego() {
    puntuacion = 0;
    objetosRestantes = [...objetos];
    actualizarPuntuacion();
    mostrarObjetos();
    mensajeElemento.textContent = "¡Arrastra cada objeto a su lugar!";
    mensajeElemento.className = "mensaje";
}

function mostrarObjetos() {
    contenedorObjetos.innerHTML = '';
    
    objetosRestantes.forEach((objeto, indice) => {
        const elementoObjeto = document.createElement('div');
        elementoObjeto.className = 'objeto';
        elementoObjeto.draggable = true;
        elementoObjeto.id = `objeto-${indice}`;
        elementoObjeto.setAttribute('data-tipo', objeto.tipo);
        elementoObjeto.textContent = objeto.emoji;
        elementoObjeto.addEventListener('dragstart', arrastrar);
        contenedorObjetos.appendChild(elementoObjeto);
    });
}

function permitirSoltar(ev) {
    ev.preventDefault();
}

function arrastrar(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function soltar(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const objetoArrastrado = document.getElementById(id);
    const tipoContenedor = ev.target.closest('.contenedor').id;
    const tipoObjeto = objetoArrastrado.getAttribute('data-tipo');
    
    if (tipoObjeto === tipoContenedor) {
        
        mensajeElemento.textContent = `¡Correcto! ${objetoArrastrado.textContent} va aquí`;
        mensajeElemento.className = "mensaje correcto";
        puntuacion += 10;
        
        objetosRestantes = objetosRestantes.filter((_, i) => `objeto-${i}` !== id);
        
        objetoArrastrado.style.transform = 'scale(1.2) rotate(360deg)';
        objetoArrastrado.style.opacity = '0';
        setTimeout(() => objetoArrastrado.remove(), 500);
        
        if (objetosRestantes.length === 0) {
            setTimeout(() => {
                mensajeElemento.textContent = `¡Ganaste! Puntos: ${puntuacion}`;
                mensajeElemento.className = "mensaje correcto";
            }, 600);
        }
    } else {
        mensajeElemento.textContent = `¡Ups! ${objetoArrastrado.textContent} no va aquí`;
        mensajeElemento.className = "mensaje incorrecto";
        puntuacion = Math.max(0, puntuacion - 5);
        
        objetoArrastrado.style.animation = 'vibrar 0.5s';
        setTimeout(() => objetoArrastrado.style.animation = '', 500);
    }
    
    actualizarPuntuacion();
}

function actualizarPuntuacion() {
    puntosElemento.textContent = puntuacion;
}

function reiniciarJuego() {
    iniciarJuego();
}

document.querySelectorAll('.contenedor').forEach(contenedor => {
    contenedor.addEventListener('dragover', permitirSoltar);
    contenedor.addEventListener('drop', soltar);
});

window.onload = iniciarJuego;