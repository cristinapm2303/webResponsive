document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Simulación de credenciales correctas
        const userDB = {
            email: "usuario@example.com",
            password: "123456789"
        };

        if (!loginForm.checkValidity()) {
            event.stopPropagation();
            loginForm.classList.add("was-validated");
            return;
        }
        if (email === userDB.email && password === userDB.password) {

            // Guardar sesión en localStorage
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userEmail", email);

            // Redirigir a la página de dashboard
            window.location.href = "dashboard.html";
        } else {
            // alert("Correo o contraseña incorrectos");
            errorMsg.style.display="block";
            errorMsg.textContent= "Correo o contraseña incorrectos"
        }
    });

    // Comprobamos si ya hay una sesión iniciada
    if (localStorage.getItem("loggedIn") === "true") {
        console.log("user logged in");
        window.location.href = "dashboard.html"; // Redirigir si ya está logueado
    }
});
