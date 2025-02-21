document.addEventListener("DOMContentLoaded", function () {
    const userEmail = sessionStorage.getItem("userEmail");
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
        sessionStorage.clear()
        console.log("Sesión eliminada"); // Verificar en consola
        console.log(sessionStorage.getItem("loggedIn")); // Verificar que 'loggedIn' ya no existe
    
        window.location.href = "login.html"; 
    });
});


  document.addEventListener("DOMContentLoaded", function () {
    const formLista = document.getElementById("formLista");
    const listasGuardadas = document.getElementById("listasGuardadas");

    // Cargar listas previas desde localStorage
    function cargarListas() {
        listasGuardadas.innerHTML = ""; // Limpiar antes de insertar
        let listas = JSON.parse(localStorage.getItem("listas")) || [];

        listas.forEach((lista, index) => {
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `<strong>${lista.nombre}</strong> - ${lista.descripcion} (${lista.categoria}) 
            <button class="btn btn-danger btn-sm float-end" onclick="eliminarLista(${index})">Eliminar</button>`;
            listasGuardadas.appendChild(li);
        });
    }

    // Guardar nueva lista en localStorage
    formLista.addEventListener("submit", function (event) {
        event.preventDefault();

        let listaNombre = document.getElementById("listaNombre").value.trim();
        let descripcion = document.getElementById("descripcion").value.trim();
        let categoria = document.getElementById("categoria").value;
        let fechaCreacion = document.getElementById("fechaCreacion").value;

        if (!listaNombre || !descripcion || !categoria || !fechaCreacion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        let nuevaLista = {
            nombre: listaNombre,
            descripcion: descripcion,
            categoria: categoria,
            fecha: fechaCreacion
        };

        let listas = JSON.parse(localStorage.getItem("listas")) || [];
        listas.push(nuevaLista);
        localStorage.setItem("listas", JSON.stringify(listas));

        formLista.reset();
        cargarListas();
    });

    // Eliminar lista
    window.eliminarLista = function (index) {
        let listas = JSON.parse(localStorage.getItem("listas")) || [];
        listas.splice(index, 1);
        localStorage.setItem("listas", JSON.stringify(listas));
        cargarListas();
    };

    // Cargar listas al inicio
    cargarListas();
});
