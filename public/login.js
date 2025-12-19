const loginForm = document.querySelector('form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Obtenemos los valores de los ID que tenés en tu HTML
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
        // Enviamos los datos al servidor
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        const result = await response.json();

        if (result.success) {
            // SI ES CORRECTO: Redirigimos al buscador (dashboard)
            window.location.href = '/dashboard.html';
        } else {
            // SI ES INCORRECTO: Mostramos el error
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        alert("No se pudo conectar con el servidor.");
    }
});