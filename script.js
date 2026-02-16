// Primero obtenemos los elementos del HTML que vamos a usar
const form = document.getElementById("commentForm");
const input = document.getElementById("commentInput");
const animalSelect = document.getElementById("animalSelect");
const commentsList = document.getElementById("commentsList");


// Intentamos cargar comentarios guardados anteriormente en el navegador.
// Si no hay nada guardado, iniciamos con un arreglo vacío.
let comments = JSON.parse(localStorage.getItem("librosEncantados")) || [];


// Esta función recibe el nombre de un animal y devuelve
// la ruta de la imagen correspondiente.
function getAnimalImage(animal) {

    // Objeto que relaciona cada animal con su imagen.
    const images = {
        oveja: "./images/oveja.png",
        cerdo: "./images/cerdo.jpg",
        gallina: "./images/gallina.jpg",
        vaca: "./images/vaca.png"
    };

    // Si el animal existe en el objeto, devuelve su imagen
    // Si no existe devuelve una imagen por defecto
    return images[animal] || 
    "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
}


// Esta función guarda el arreglo de comentarios en el navegador
// Se convierte a texto porque localStorage solo guarda strings
function saveComments() {
    localStorage.setItem("librosEncantados", JSON.stringify(comments));
}


// Esta función muestra todos los comentarios en la pantalla
function showComments() {

    // Primero limpiamos el contenedor para no duplicar información
    commentsList.innerHTML = "";

    // Recorremos el arreglo de comentarios
    comments.forEach((comment, index) => {

        // Creamos un contenedor para cada comentario
        const container = document.createElement("div");
        container.classList.add("comment");

        // Agregamos la imagen, el texto, la fecha y el botón de eliminar
        container.innerHTML = `
            <img src="${comment.image}" alt="animal">
            <div class="comment-content">
                <p>${comment.text}</p>
                <small>${comment.date}</small>
            </div>
            <button class="delete-btn" onclick="deleteComment(${index})">X</button>
        `;

        // Finalmente agregamos el comentario al contenedor principal
        commentsList.appendChild(container);
    });
}


// Esta función elimina un comentario según su posición en el arreglo
function deleteComment(index) {

    // Quitamos el comentario del arreglo
    comments.splice(index, 1);

    // Guardamos los cambios en el navegador
    saveComments();

    // Volvemos a mostrar la lista actualizada
    showComments();
}


// Aquí escuchamos cuando el usuario envía el formulario
form.addEventListener("submit", function(event) {

    // Evitamos que la página se recargue
    event.preventDefault();

    // Obtenemos el texto escrito y quitamos espacios innecesarios
    const text = input.value.trim();
    const animal = animalSelect.value;

    // Si el texto está vacío, no hacemos nada
    if (text === "") return;

    // Creamos un nuevo objeto con la información del comentario
    const newComment = {
        text: text,
        image: getAnimalImage(animal),
        date: new Date().toLocaleString()
    };

    // Lo agregamos al arreglo
    comments.push(newComment);

    // Guardamos los cambios
    saveComments();

    // Actualizamos la vista
    showComments();

    // Limpiamos el input para que quede vacío
    input.value = "";
});


// Cuando la página carga, mostramos los comentarios guardados
showComments();