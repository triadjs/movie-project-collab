const resultsContainer = document.getElementById('results');
const modalTrailers = document.getElementById("modalTrailers");

let currentVisibleDiv = null;

// Starts at 2 because the server sends back page 1 of the results
let pageNumber = 2;

async function getMovies() {
  try {
    const movieList = await fetch (`/api/movieList/${pageNumber}`);
    const results = await movieList.json();
    resultsContainer.insertAdjacentHTML("beforeend", results);
    pageNumber += 1;
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
}

function toggleModalVisibility(movieId) {
  if (modalTrailers.classList.contains('modal__show')) {
      modalTrailers.classList.remove('modal__show');

      hideModal();
  } else {
      showModal(movieId);
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

async function showModal(movieId) {
  const modalHeading = document.getElementById("modalHeading");
  const modalBody = document.getElementById("modalBody");

  modalTrailers.classList.add('modal__show');
  // This line prevents scrolling outside of the modal
  document.body.style.overflow = 'hidden';
  modalHeading.innerHTML = "Movie Trailers";

  let getTrailers = await getMovieTrailers(movieId);

  modalBody.innerHTML = `${getTrailers}`;
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

async function getMovieTrailers(id) {
  const response = await fetch(`/api/movie-trailers/${id}`);
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