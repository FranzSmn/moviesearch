// const { default: Axios } = require("axios");

const searchMovie = document.querySelector("#searchBtn");
const searchForm = document.forms.namedItem("search-form");
const moviesHtml = document.querySelector("#movies");
const movieHtml = document.querySelector("#movie");
const resSearch = document.querySelector("#search-result");
// const modal = document.getElementById("myModal");
// const btn = document.getElementById("myBtn");
// const span = document.getElementsByClassName("close")[0];

const inputMovie = searchMovie.addEventListener("click", function () {
  const movieToSearch = document.getElementById("input-movie").value;

  axios
    .get("http://www.omdbapi.com/?apikey=3c32f0f4&s=" + movieToSearch)
    .then((response) => {
      let movies = response.data.Search;
      let output = " ";
      let noimage = "../img/noImage.png";
      console.log(response);
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].Poster == "N/A") {
          output += `
          <div class="col-md-3">
              <div class="well text-center">
                </script>
                <img src="/assets/img/noImage.png">
                <h5>${movies[i].Title}</h5>
                <a onclick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
        `;
        } else {
          output += `
          <div class="col-md-3">
              <div class="well text-center">
                </script>
                <img src="${movies[i].Poster}">
                <h5>${movies[i].Title}</h5>
                <a onclick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
        `;
        }
      }
      moviesHtml.innerHTML = output;
      resSearch.innerHTML = `<div class="search-res"><h3>SEARCH RESULT FOR "${movieToSearch}"</h3></div>`;
    })
    .catch((err) => {
      console.log(err);
      resSearch.innerHTML = `<div><h3>0 RESULT FOR "${movieToSearch}"</h3></div>`;
    });
});

// prevent form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

// btn.onclick = function () {
//   modal.style.display = "block";
// };

// span.onclick = function () {
//   modal.style.display = "none";
// };

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

function getMovie() {
  let movieIds = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com/?apikey=3c32f0f4&i=" + movieIds)
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-default">Go Back To Search</a>
        </div>
      </div>
      `;
      movieHtml.innerHTML = output;
    })

    .catch((err) => {
      console.log(err);
    });
}
