const container = window.document.querySelector(".container")
const input = window.document.querySelector("input")
const button = window.document.querySelector("button")

function createMovieCard(movie) {
    //pegar imagem, título, ano, gênero, diretor, sinpse

    const {Title, Year, Genre, Director, Plot, Poster} = movie;

    //criar as tags

    let moviePoster = document.createElement("div");
    let info = document.createElement("div");
    let imagem = document.createElement("img")
    let title = document.createElement("h2");
    let genero = document.createElement("h4");
    let diretor = document.createElement("h4");
    let sinopse = document.createElement("p");
    
    moviePoster.classList.add("poster");
    info.classList.add("info")

    title.textContent = `${Title} (${Year})`;
    genero.textContent = `Gênero: ${Genre}`;
    diretor.textContent = `Diretor: ${Director}`;
    sinopse.textContent = `Sinopse: ${Plot}`

    imagem.setAttribute('src', Poster);

    moviePoster.appendChild(imagem);

    info.appendChild(title);
    info.appendChild(genero);
    info.appendChild(diretor);
    info.appendChild(sinopse);

    container.appendChild(moviePoster);
    container.appendChild(info);

    return container;
}

function createErrorSpan(msg) {
    const msgSpan = document.createElement("span");
    msgSpan.innerHTML = msg;
    msgSpan.classList.add("msg-span");
    return msgSpan;
}

function getMovie() {

    container.innerHTML = '';

    function getJson(response) {
        return response.json();
    }

    function useJason(json) {
        if(json.Error) {
            container.appendChild(createErrorSpan(json.Error));
        } else {
            createMovieCard(json);
        }
    }

    fetch(`http://www.omdbapi.com/?apikey=81750ce2&t='${input.value}'`).then(getJson).then(useJason);
}

button.onclick = (e) => {
    getMovie();
}

input.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        getMovie();
    }
});