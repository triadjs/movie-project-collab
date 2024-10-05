const resultsContainer = document.getElementById('results');
const modalTrailers = document.getElementById("modalTrailers");

let currentVisibleDiv = null;

// Starts at 2 because the server sends back page 1 of the results
let pageNumber = 2;

async function getTrending() {
  try {
    const movieList = await fetch (`/api/loadMore/trending/${pageNumber}`);
    const results = await movieList.json();
    resultsContainer.insertAdjacentHTML("beforeend", results);
    pageNumber += 1;
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
}

async function getDiscoverMovie() {
  try {
    const movieList = await fetch (`/api/loadMore/discoverMovie/${pageNumber}`);
    const results = await movieList.json();
    resultsContainer.insertAdjacentHTML("beforeend", results);
    pageNumber += 1;
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
}

async function getDiscoverTv() {
  try {
    const tvList = await fetch (`/api/loadMore/discoverTv/${pageNumber}`);
    const results = await tvList.json();
    resultsContainer.insertAdjacentHTML("beforeend", results);
    pageNumber += 1;
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
}

async function getNowPlayingMovie() {
  try {
    const nowPlayingList = await fetch (`/api/loadMore/nowPlayingMovie/${pageNumber}`);
    const results = await nowPlayingList.json();
    resultsContainer.insertAdjacentHTML("beforeend", results);
    pageNumber+=1;
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
}
async function getPopularMovie() {
  try {
    const popularMovieList = await fetch(`/api/loadMore/popularMovie/${pageNumber}`);
    const results = await popularMovieList.json();
    resultsContainer.insertAdjacentHTML("beforeend", results);
    pageNumber+=1;
    console.log("inside getPopularMovie()")
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
}
async function getTopRatedMovie() {
try {
  const topRatedMovieList = await fetch(`/api/loadMore/popularMovie/${pageNumber}`);
  const results = await topRatedMovieList.json();
  resultsContainer.insertAdjacentHTML("beforeend", results);
  pageNumber+=1;
} catch (error) {
  console.log('Error fecthing data:', error);
}
}
async function getUpcomingMovie() {
  try {
    const upcomingMovieList = await fetch (`/api/loadMore/upcomingMovie/${pageNumber}`);
    const results = await upcomingMovieList.json();
    resultsContainer.insertAdjacentHTML("beforeend", results);
    pageNumber+=1;
  } catch (error) {
    console.error('Error fecthing data:', error);
  }
}

function toggleModalVisibility(movieId, contentType) {
  if (modalTrailers.classList.contains('modal__show')) {
      modalTrailers.classList.remove('modal__show');

      hideModal();
  } else {
      showModal(movieId, contentType);
  }
}

function hideModal() {
  const modalHeading = document.getElementById("modalHeading");
  const modalBody = document.getElementById("modalBody");
  // This line resets scrolling outside of the modal
  document.body.style.overflow = '';
  modalHeading.innerHTML = "";
  modalBody.innerHTML = "";
  // Reset currentVisibleDiv it handles the show hide of each trailer category
  currentVisibleDiv = null;
}

async function showModal(movieId, contentType) {
  const modalHeading = document.getElementById("modalHeading");
  const modalBody = document.getElementById("modalBody");

  modalTrailers.classList.add('modal__show');
  // This line prevents scrolling outside of the modal
  document.body.style.overflow = 'hidden';
  modalHeading.innerHTML = "Movie Trailers";

  let trailers = await getTrailers(movieId, contentType);

  modalBody.innerHTML = `${trailers}`;
  // Initialize currentVisibleDiv to the element with modal__show-trailers
  currentVisibleDiv = document.querySelector('.modal__show-trailers');
}

// Close the modal if someone clicks outside of the modal
document.addEventListener('DOMContentLoaded', (event) => {
  window.onclick = event => {
    if (event.target == modalTrailers) {
      toggleModalVisibility();
    }
  }
});

// Close the modal when touching outside of the modal content (for phones and tablets)
window.ontouchstart = event => {
  if (event.target == modalTrailers) {
    toggleModalVisibility();
  }
}

// Close modal if someone hits the escape key
document.onkeydown = event => {
  if (event.key === 'Escape') {
    if (modalTrailers.classList.contains('modal__show')) {
      toggleModalVisibility();
    }
  }
}

async function getTrailers(id, contentType) {
  const response = await fetch(`/api/trailers/${id}/${contentType}`);
  const results = await response.json();
  return results;
};

function hideMovieTrailers(divId) {
  // Hide the currently visible div if it exists
  if (currentVisibleDiv) {
    currentVisibleDiv.classList.remove('modal__show-trailers');
    currentVisibleDiv.classList.add('modal__hide-trailers');
  }
  
  // Show the clicked div
  const targetDiv = document.getElementById(divId);
  if (targetDiv) {
    targetDiv.classList.remove('modal__hide-trailers');
    targetDiv.classList.add('modal__show-trailers');
    
    // Update the currently visible div
    currentVisibleDiv = targetDiv;
  } else {
    console.error(`No element found with id: ${divId}`);
  }
}