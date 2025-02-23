const clientId = '6495750786a44e008f46f8fe6c0c687d'; // Client ID de Spotify
const clientSecret = 'aa5a3e2fd3784273b001581a07bb5e6c'; // Client secret de Spotify

// Obtener token de acceso
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

// Buscar canciones
async function buscar() {
    const query = document.getElementById('searchInput').value;
    const token = await getAccessToken();

    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const tracks = response.data.tracks.items;
    resultadoBusqueda(tracks);
}

// Mostrar resultados
function resultadoBusqueda(tracks) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    tracks.forEach(track => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <img src="${track.album.images[0].url}" alt="${track.name}" class="img-thumbnail" style="width: 50px; height: 50px;">
            <strong>${track.name}</strong> - ${track.artists[0].name}
            <button class="btn btn-primary" type="button" onclick="valorarCancion('${track.album.images[0].url}','${track.name}','${track.artists[0].name}')">Valorar canción</button>
        `;
        results.appendChild(listItem);
    });
}

function valorarCancion(imgCancion,nombreCancion,artistaCancion) {
    const url = `rating.html?imgCancion=${encodeURIComponent(imgCancion)}&nombreCancion=${encodeURIComponent(nombreCancion)}&artistaCancion=${encodeURIComponent(artistaCancion)}`;
    window.location.href = url;
}