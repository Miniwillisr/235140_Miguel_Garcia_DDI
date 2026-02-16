window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const personaje = document.querySelector('.alanWake');

    if (personaje) {
        // Ajuste la velocidad (0.5 es medio, 1 es rápido)
        const speed = 0.5; 
        // Se Aplico la traslación en diagonal
        personaje.style.transform = `translate(${scrollPosition * speed}px, ${scrollPosition * speed}px)`;
    }
});