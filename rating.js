function getParametrosURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
const logoutButton = document.getElementById("logout-btn");
    const imgCancion = getParametrosURL('imgCancion');
    const nombreCancion = getParametrosURL('nombreCancion');
    const artistaCancion = getParametrosURL('artistaCancion');

    if (imgCancion && nombreCancion && artistaCancion) {
        document.getElementById('imgCancion').src = imgCancion;
        document.getElementById('imgCancion').alt = nombreCancion;
        document.getElementById('nombreCancion').value = nombreCancion;
        document.getElementById('artistaCancion').value = artistaCancion;
        document.getElementById('valorarForm').style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const formValoracion = document.getElementById("formValoracion");
    const valoracionesGuardadas = document.getElementById("valoracionesGuardadas");
    const logoutButton = document.getElementById("logout-btn");
    // Cargar valoraciones previas desde localStorage
    function cargarValoraciones() {
        valoracionesGuardadas.innerHTML = "";
        let valoraciones = JSON.parse(localStorage.getItem("valoraciones")) || [];

        valoraciones.forEach((valoracion, index) => {
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `<img src="${valoracion.imgCancion}" alt="${valoracion.nombreCancion}" class="img-thumbnail" style="width: 50px; height: 50px;">
            <strong>${valoracion.nombreCancion}</strong> - ${valoracion.artistaCancion} (Valoración: <strong>${valoracion.valoracion}</strong>)
            <button class="btn btn-danger btn-sm float-end" onclick="eliminarValoracion(${index})">Eliminar</button>`;
            valoracionesGuardadas.appendChild(li);
        });
    }

    // Guardar nueva valoracion en localStorage
    formValoracion.addEventListener("submit", function (event) {
        event.preventDefault();

        let imgCancion = document.getElementById("imgCancion").src;
        let nombreCancion = document.getElementById("nombreCancion").value;
        let artistaCancion = document.getElementById("artistaCancion").value;
        let valoracion = document.getElementById("valoracion").value;
        let comentario = document.getElementById("comentario").value;

        if (!valoracion) {
            alert("Debe añadir una valoración.");
            return;
        }

        let nuevaValoracion = {
            imgCancion: imgCancion,
            nombreCancion: nombreCancion,
            artistaCancion: artistaCancion,
            valoracion: valoracion,
            comentario: comentario
        };

        let valoraciones = JSON.parse(localStorage.getItem("valoraciones")) || [];
        valoraciones.push(nuevaValoracion);
        localStorage.setItem("valoraciones", JSON.stringify(valoraciones));

        cargarValoraciones();
    });

    logoutButton.addEventListener("click", function () {
        sessionStorage.clear()
        console.log("Sesión eliminada"); // Verificar en consola
        console.log(sessionStorage.getItem("loggedIn")); // Verificar que 'loggedIn' ya no existe

        window.location.href = "login.html";
    });

    // Eliminar valoracion
    window.eliminarValoracion = function (index) {
        let valoraciones = JSON.parse(localStorage.getItem("valoraciones")) || [];
        valoraciones.splice(index, 1);
        localStorage.setItem("valoraciones", JSON.stringify(valoraciones));
        cargarValoraciones();
    };

    // Cargar valoraciones al inicio
    cargarValoraciones();
});