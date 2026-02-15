window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const circle = document.getElementById('circle');

    // Ajusta estos valores para cambiar la velocidad
    // Cuanto mayor el número, más rápido se mueve
    const speed = 0.5; 

    // Movemos el círculo en diagonal (X e Y al mismo tiempo)
    // translate(X, Y)
    circle.style.transform = `translate(${scrollPosition * speed}px, ${scrollPosition * speed}px)`;
})