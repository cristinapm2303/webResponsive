document.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("userEmail");
    const userEmailElement = document.getElementById("userEmail");
    const bienvenida = document.getElementById("bienvenida");
    const biblioteca = document.getElementById("biblioteca");
    const listas = document.getElementById("listas");
    const logoutButton = document.getElementById("logout-btn");

    if (!userEmail) {
        window.location.href = "login.html"; 
    } else {
        userEmailElement.textContent = `Usuario: ${userEmail ?? ""}`;
    }

        // Función para mostrar las pantallas
        // function showScreen(screenId) {
            // Ocultar todas las pantallas
            // bienvenida.style.display = "none";
            // biblioteca.style.display = "none";
            // listas.style.display = "none";
    
            // Mostrar la pantalla seleccionada
        //     document.getElementById(screenId).style.display = "block";
        // }
    
        // Agregar eventos de clic a los enlaces de navegación
        document.getElementById("linkBienvenida").addEventListener("click", function () {
            // showScreen("bienvenida");
        });
        document.getElementById("linkBiblioteca").addEventListener("click", function () {
            // showScreen("biblioteca");
        });
        document.getElementById("linkListas").addEventListener("click", function () {
            // showScreen("listas");
        });
    
        // Mostrar la pantalla de bienvenida por defecto
        // showScreen("bienvenida");


    logoutButton.addEventListener("click", function () {
        localStorage.clear()
        console.log("Sesión eliminada"); // Verificar en consola
        console.log(localStorage.getItem("loggedIn")); // Verificar que 'loggedIn' ya no existe
    
        window.location.href = "login.html"; 
    });
});
