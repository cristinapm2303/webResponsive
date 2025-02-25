document.addEventListener("DOMContentLoaded", function () {
    const formPerfil = document.getElementById("formPerfil");
    const nombre = sessionStorage.getItem("nombreUser");
    const apellidos = sessionStorage.getItem("apellidosUser");
    const fechaNacimiento = sessionStorage.getItem("fechaNacUser");
    const email = sessionStorage.getItem("userEmail");
    const logoutButton = document.getElementById("logout-btn");

    document.getElementById("nombre").value = nombre;
    document.getElementById("apellidos").value = apellidos;
    document.getElementById("fechaNacimiento").value = fechaNacimiento;
    document.getElementById("email").value = email;
    

    logoutButton.addEventListener("click", function () {
        sessionStorage.clear()
        console.log("Sesión eliminada"); 
        console.log(sessionStorage.getItem("loggedIn")); 

        window.location.href = "login.html";
    });

    formPerfil.addEventListener("submit", function (event) {
        event.preventDefault(); 

        if (!formPerfil.checkValidity()) {
            event.stopPropagation();
            formPerfil.classList.add("was-validated");

            mostrarMensaje("Hay errores en el formulario. Por favor, revisa los campos.", "error");
        } else {
            const nombreForm = document.getElementById("nombre").value;
            const apellidosForm = document.getElementById("apellidos").value;
            const fechaNacimientoForm = document.getElementById("fechaNacimiento").value;

            sessionStorage.setItem("nombreUser", nombreForm);
            sessionStorage.setItem("apellidosUser", apellidosForm);
            sessionStorage.setItem("fechaNacUser", fechaNacimientoForm);
            
            mostrarMensaje("Cambios guardados correctamente.", "exito");
        }
    });

    function mostrarMensaje(mensaje, tipo) {
        const mensajeMostrar = document.createElement("div");
        mensajeMostrar.className = tipo === "error" ? "alert alert-danger" : "alert alert-success";
        mensajeMostrar.textContent = mensaje;
        document.body.appendChild(mensajeMostrar);
    
        setTimeout(() => {mensajeMostrar.remove();}, 5000);
    }
});
