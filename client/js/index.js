const resultsContainer = document.getElementById('results');

let pageNumber = 1;
let resultsArray=[];
let posterSize = 'w185';
let posterFilePath = '';
let posterBaseURL = `https://image.tmdb.org/t/p/${posterSize}`;

async function getMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ''
    }
  };

  let URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}}&sort_by=popularity.desc`

  try {
    const response = await fetch(URL, options);
    resultsArray = await response.json();
    console.log(resultsArray);
    displayMovies();
  } catch(error) {
    console.log(error);
  }
}

function displayMovies() {
  let results = resultsArray.results;
  results.forEach(item => {
    posterFilePath = item.poster_path;
    
    let finalPosterPath = "";
    finalPosterPath = `${posterBaseURL}${posterFilePath}`;

    let title = '';
    title = item.title;

    // let resultsCell = `
    //   <img src="${finalPosterPath}">
    //   <br>
    //   <div>${title}</div>
    //   <br>`

    let relaseDate = '';
    relaseDate = item.release_date;

    let resultsCell = `
        <div class="card">
            <div class="btn-trailer-container">
              <button class="btn-trailer" onClick="collapse()">Play Trailer</button>
            </div>
            <div class="card-img">
                <img src="${finalPosterPath}" alt="" class="img-fluid">
            </div>
            <div class="card-text">
                <div class="item-title">
                    ${title}
                </div>
                <div class="release-date">
                    ${relaseDate}
                </div>
            </div>
        </div>
    `
    
    resultsContainer.insertAdjacentHTML("beforeend", resultsCell);
  });
  pageNumber += 1;
}

function collapse() {
  let collapseItem = document.getElementById("fullWidthTrailer");
  if (collapseItem.classList.contains('show')) {
      collapseItem.classList.remove('show');
  } else {
      collapseItem.classList.add('show');
  }
}

function loadMore () {
  getMovies();
}

// onload
getMovies();