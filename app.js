var pathPhoto = "https://image.tmdb.org/t/p/original";
var api_key = "a1b35736a79583a39fef33408f7e1799";

function searchMovies(div, id)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.themoviedb.org/3/discover/movie?with_genres='+id+'&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799', false);
    xhttp.send();
    var retorno = JSON.parse(xhttp.responseText);
    var movies = retorno.results;

    //console.log(movies);

    var divPai = document.getElementById(div);
    divPai.innerHTML = '';
    
    for (var i in movies)
    {
        var a = document.createElement("a");
        a.href = "#topo";
        a.id = movies[i].id;
        a.onclick = function (e)
        {
            searchDetails(this.id);
        }

        var img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w300" + movies[i].poster_path;

        a.appendChild(img);
        divPai.appendChild(a);
    }

}

function searchDetails (id)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", 'https://api.themoviedb.org/3/movie/'+id+"?&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799", false);
    xhttp.send();

    var retorno = JSON.parse(xhttp.responseText);

    console.log(retorno);

    var title = document.getElementById("movie-title");
    title.innerHTML = retorno.title;

    var date = document.getElementById("movie-year");
    date.innerHTML = retorno.release_date.substring(0, 4);

    var resume = document.getElementById("resume");
    resume.innerHTML = retorno.overview;

    var genres = retorno.genres;
    document.getElementById("genres").innerHTML = " ";

    for (var i in genres)
    {
        if (i == 2)
        {
            console.log(i);
            document.getElementById("genres").innerHTML += genres[i].name;
        }

        else
        {
            document.getElementById("genres").innerHTML += genres[i].name + "; ";
        }

    }

    var photo = document.getElementById("background-image");
    photo.style.backgroundImage = "url(" + pathPhoto + retorno.backdrop_path + ")";

    var points = document.getElementById("div-points");
    points.innerHTML = Math.round(retorno.vote_average) + " Points";

}

function searchMoviesByIn()
{
    var movieName = document.getElementById("movie-name").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?query="+movieName+"&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799", false);
    xhttp.send();
    var retorno = JSON.parse(xhttp.responseText);
    var movies = retorno.results;

    console.log(movies);

    var divPai = document.getElementById("movies-results");

    var divSections = document.getElementById("movies-sections");
    divSections.innerHTML = '';

    var h1 = document.getElementById("results-title");
    h1.innerHTML = "Resultados encontrados para: " + movieName;

    for(var i in movies)
    {
        var a = document.createElement("a");
        a.href = "#topo";
        a.id = movies[i].id;
        a.onclick = function (e)
        {
            searchDetails (this.id);
        }

        var img = document.createElement("img");
        img.src = "https://image.tmdb.org/t/p/w300" + movies[i].poster_path;

        a.appendChild(img);
        divPai.appendChild(a);

    }

}