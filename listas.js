
// Credenciales de Spotify
const clientId = '6495750786a44e008f46f8fe6c0c687d';
const clientSecret = 'aa5a3e2fd3784273b001581a07bb5e6c';

// Evento para manejar la carga del DOM
document.addEventListener("DOMContentLoaded", function () {
    inicializarEventos();
    cargarListas();
});

function inicializarEventos() {
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.clear();
            window.location.href = "login.html";
        });
    }

    const formLista = document.getElementById("formLista");
    if (formLista) {
        formLista.addEventListener("submit", function (event) {
            event.preventDefault();
            agregarLista();
        });
    }
}

async function getAccessToken() {
    const response = await axios.post('https://accounts.spotify.com/api/token',
        'grant_type=client_credentials', {
        headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data.access_token;
}

async function buscar() {
    let query = document.getElementById("searchInput").value;
    if (!query) return;

    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    mostrarResultados(response.data.tracks.items);
}

function mostrarBuscador(index) {
    document.getElementById("searchScreen").style.display = 'block';
    window.currentIndex = index;
}

function mostrarResultados(tracks) {
    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    tracks.forEach(track => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
        <div class="d-flex align-items-center">
            <img src="${track.album.images[0].url}" alt="${track.name}" class="img-thumbnail" style="width: 50px; height: 50px; margin-right: 10px;">
            <strong>${track.name}</strong> - ${track.artists[0].name}
        </div> `;
        listItem.addEventListener("click", function () {
            agregarCancionSeleccionada(track.name, track.artists[0].name);
            document.getElementById("searchInput").value = "";
            document.getElementById("results").innerHTML = "";
        });

        resultsContainer.appendChild(listItem);
    });
}

function agregarCancionSeleccionada(nombre, artista) {
    document.getElementById("searchScreen").style.display = 'none';

    let listas = JSON.parse(localStorage.getItem("listas")) || [];
    if (!listas[window.currentIndex].canciones) {
        listas[window.currentIndex].canciones = [];
    }

    listas[window.currentIndex].canciones.push({ nombre, artista });
    localStorage.setItem("listas", JSON.stringify(listas));
    cargarListas();
}

function agregarLista() {
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

    document.getElementById("formLista").reset();
    cargarListas();
}

function cargarListas() {
    const listasGuardadas = document.getElementById("listasGuardadas");
    listasGuardadas.innerHTML = "";
    let listas = JSON.parse(localStorage.getItem("listas")) || [];

    listas.forEach((lista, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
            <strong>${lista.nombre}</strong> - ${lista.descripcion} (${lista.categoria}) 
            <button class="btn btn-danger btn-sm float-end eliminar-lista" data-index="${index}" style="margin-left:10px">Eliminar</button>
            <button class="btn btn-success btn-sm float-end agregar-cancion" data-index="${index}">Agregar Canción</button>
        `;

        let ulCanciones = document.createElement("ul");
        ulCanciones.className = "mt-2";

        if (lista.canciones) {
            lista.canciones.forEach((cancion, i) => {
                // let liCancion = document.createElement("li");
                // liCancion.innerHTML = `
                //     🎵 ${cancion.nombre} - ${cancion.artista} 
                //     <button class="btn btn-danger btn-sm ms-2 eliminar-cancion" data-lista-index="${index}" data-cancion-index="${i}">✖</button>
                // `;

                let liCancion = document.createElement("li");
                liCancion.className = "d-flex justify-content-between align-items-center p-2"; // Flexbox para alineación
                liCancion.innerHTML = `
    <span>🎵 ${cancion.nombre} - ${cancion.artista}</span>
    <button class="btn btn-danger btn-sm eliminar-cancion" data-lista-index="${index}" data-cancion-index="${i}" style="color: white;">X</button>
`;
                ulCanciones.appendChild(liCancion);
            });
        }

        li.appendChild(ulCanciones);
        listasGuardadas.appendChild(li);
    });

    document.querySelectorAll(".agregar-cancion").forEach(button => {
        button.addEventListener("click", function () {
            mostrarBuscador(this.getAttribute("data-index"));
        });
    });

    document.querySelectorAll(".eliminar-lista").forEach(button => {
        button.addEventListener("click", function () {
            eliminarLista(this.getAttribute("data-index"));
        });
    });

    document.querySelectorAll(".eliminar-cancion").forEach(button => {
        button.addEventListener("click", function () {
            eliminarCancion(this.getAttribute("data-lista-index"), this.getAttribute("data-cancion-index"));
        });
    });
}

function eliminarLista(index) {
    let listas = JSON.parse(localStorage.getItem("listas")) || [];
    listas.splice(index, 1);
    localStorage.setItem("listas", JSON.stringify(listas));
    cargarListas();
}

function eliminarCancion(listaIndex, cancionIndex) {
    let listas = JSON.parse(localStorage.getItem("listas")) || [];
    listas[listaIndex].canciones.splice(cancionIndex, 1);
    localStorage.setItem("listas", JSON.stringify(listas));
    cargarListas();
}
