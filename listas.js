document.addEventListener("DOMContentLoaded", function () {
const logoutButton = document.getElementById("logout-btn");
document.getElementById("linkListas").addEventListener("click", function () {
});
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

    function agregarCancion(index) {
        let nombreCancion = prompt("Introduce el nombre de la canción:");
        let artistaCancion = prompt("Introduce el artista:");
    
        if (!nombreCancion || !artistaCancion) {
            alert("Debes ingresar nombre y artista.");
            return;
        }
    
        let listas = JSON.parse(localStorage.getItem("listas")) || [];
    
        if (!listas[index].canciones) {
            listas[index].canciones = [];
        }
    
        listas[index].canciones.push({ nombre: nombreCancion, artista: artistaCancion });
        localStorage.setItem("listas", JSON.stringify(listas));
    
        cargarListas();
    }
    
    function eliminarCancion(listaIndex, cancionIndex) {
        let listas = JSON.parse(localStorage.getItem("listas")) || [];
    
        listas[listaIndex].canciones.splice(cancionIndex, 1);
        localStorage.setItem("listas", JSON.stringify(listas));
    
        cargarListas();
    }
    
    function cargarListas() {
        listasGuardadas.innerHTML = ""; 
        let listas = JSON.parse(localStorage.getItem("listas")) || [];

        listas.forEach((lista, index) => {
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `
                <strong>${lista.nombre}</strong> - ${lista.descripcion} (${lista.categoria}) 
                <button class="btn btn-danger btn-sm float-end me-2 eliminar-lista" data-index="${index}">Eliminar</button>
                <button class="btn btn-success btn-sm float-end agregar-cancion" data-index="${index}">Agregar Canción</button>
            `;

            let ulCanciones = document.createElement("ul");
            ulCanciones.className = "mt-2";

            if (lista.canciones) {
                lista.canciones.forEach((cancion, i) => {
                    let liCancion = document.createElement("li");
                    liCancion.innerHTML = `
                        🎵 ${cancion.nombre} - ${cancion.artista} 
                        <button class="btn btn-danger btn-sm ms-2 eliminar-cancion" data-lista-index="${index}" data-cancion-index="${i}">❌</button>
                    `;
                    ulCanciones.appendChild(liCancion);
                });
            }

            li.appendChild(ulCanciones);
            listasGuardadas.appendChild(li);
        });

        // Agregar eventos después de cargar las listas
        document.querySelectorAll(".agregar-cancion").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                agregarCancion(index);
            });
        });

        document.querySelectorAll(".eliminar-lista").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                eliminarLista(index);
            });
        });

        document.querySelectorAll(".eliminar-cancion").forEach(button => {
            button.addEventListener("click", function () {
                let listaIndex = this.getAttribute("data-lista-index");
                let cancionIndex = this.getAttribute("data-cancion-index");
                eliminarCancion(listaIndex, cancionIndex);
            });
        });
    }

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
            fecha: fechaCreacion,
            canciones: []
        };

        let listas = JSON.parse(localStorage.getItem("listas")) || [];
        listas.push(nuevaLista);
        localStorage.setItem("listas", JSON.stringify(listas));

        formLista.reset();
        cargarListas();
    });

    function eliminarLista(index) {
        let listas = JSON.parse(localStorage.getItem("listas")) || [];
        listas.splice(index, 1);
        localStorage.setItem("listas", JSON.stringify(listas));
        cargarListas();
    }

    cargarListas();
});
