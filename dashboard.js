document.addEventListener("DOMContentLoaded", function () {
    const userEmail = sessionStorage.getItem("userEmail");
    const userEmailElement = document.getElementById("userEmail");
    const listas = document.getElementById("listas");
    const logoutButton = document.getElementById("logout-btn");
    const userName = sessionStorage.getItem("nombreUser");

    if (!userEmail) {
        window.location.href = "login.html";
    } else {
        userEmailElement.textContent = `Usuario: ${userEmail ?? ""}`;
    }
    document.getElementById("userName").innerHTML = userName;
    document.getElementById("linkBienvenida").addEventListener("click", function () {
    });

    logoutButton.addEventListener("click", function () {
        sessionStorage.clear()
        console.log("Sesión eliminada"); 
        console.log(sessionStorage.getItem("loggedIn")); 

        window.location.href = "login.html";
    });
});


