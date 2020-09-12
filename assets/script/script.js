//const { default: Axios } = require("axios");
const searchMovie = document.querySelector("#searchBtn");
const searchForm = document.forms.namedItem("search-form");
const moviesHtml = document.querySelector("#movies");
const movieHtml = document.querySelector("#movie");
const resSearch = document.querySelector("#search-result");
let url;
// const modal = document.getElementById("myModal");
// const btn = document.getElementById("myBtn");
// const span = document.getElementsByClassName("close")[0];

searchMovie.addEventListener("click", () => {
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
                <img src="/assets/img/noImage.png">
                <h5 class="movie-titles">${movies[i].Title}</h5>
                <a onclick="movieSelected('${movies[i].imdbID}')" id="search-btn" class="btn btn-primary">Movie Details</a>
              </div>
            </div>
        `;
        } else {
          output += `
          <div class="col-md-3">
              <div class="well text-center">
                <img class="poster" src="${movies[i].Poster}">
                <h5 class="movie-titles">${movies[i].Title}</h5>
                <a onclick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" id="search-btn">Movie Details</a>
              </div>
            </div>
        `;
        }
        // <a onclick="movieSelected('${movies[i].imdbID}')" data-toggle="modal" data-target=".modal" class="btn btn-primary" id="searchBtn" href="#">Movie Details</a>
      }
      moviesHtml.innerHTML = output;
      resSearch.innerHTML = `<div class="search-res" id="search-res"><h3>Search results for "${movieToSearch}"</h3></div>`;
      scrollDown();
    })
    .catch((err) => {
      console.log(err);
      resSearch.innerHTML = `<div id="search-res"><h3>0 RESULT FOR "${movieToSearch}"</h3></div>`;
    });
});

// prevent form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

function scrollDown() {
  document.getElementById("search-res").scrollIntoView();
}

function movieSelected(id) {
  // sessionStorage.setItem("movieId", id);
  // url = window.location = `movie.html?movieid=${id}`;
  // return false;
  axios
    .get("http://www.omdbapi.com/?apikey=3c32f0f4&i=" + id)
    .then((response) => {
      let movie = response.data;
      let output = `
      <div class="movie-details">
     <div class="row">
       <div class="col-md-4">
         <img src="${movie.Poster}" class="thumbnail">
       </div>
       <div class="col-md-8">
         <h2 class="h2Title">${movie.Title}</h2>
         <ul class="list-group" id="listgroup">
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
     </div>
     <div class="row" id="plotDetails">
       <div class="well">
         <h3>Plot</h3>
         ${movie.Plot}
         <hr>
         <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
         <a href="index.html" class="btn btn-default">Go Back To Search</a>
       </div>
     </div>
     `;
      moviesHtml.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
  // <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
  // <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
  // <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
  // <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
  // <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
  // <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
  // <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
}

// function getMovie() {
//   // let movieIds = sessionStorage.getItem("movieId");
//   let urlNow = window.location.href;
//   let output = " ";
//   // output = `<div class="col-md-3">
//   //   <div class="well text-center">
//   //     <h5>hello there</h5>
//   //   </div>
//   // </div>`;
//   output = `
//           <div class="col-md-3">
//               <div class="well text-center">
//                 <img src="/assets/img/noImage.png">
//                 <h5>${movies[i].Title}</h5>
//                 <a onclick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
//               </div>
//             </div>
//         `;
//   movieHtml.innerHTML = output;
//   //   .get("http://www.omdbapi.com/?apikey=3c32f0f4&i=" + movieIds)
//   //   .then((response) => {
//   //     console.log(response);
//   //     let movie = response.data;
//   //     let output = `
//   //     <div class="row">
//   //       <div class="col-md-4">
//   //         <img src="${movie.Poster}" class="thumbnail">
//   //       </div>
//   //       <div class="col-md-8">
//   //         <h2>${movie.Title}</h2>
//   //         <ul class="list-group">
//   //           <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
//   //           <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
//   //           <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
//   //           <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
//   //           <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
//   //           <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
//   //           <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
//   //         </ul>
//   //       </div>
//   //     </div>
//   //     <div class="row">
//   //       <div class="well">
//   //         <h3>Plot</h3>
//   //         ${movie.Plot}
//   //         <hr>
//   //         <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
//   //         <a href="index.html" class="btn btn-default">Go Back To Search</a>
//   //       </div>
//   //     </div>
//   //     `;
//   //     movieHtml.innerHTML = output;
//   //   })

//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
// }
