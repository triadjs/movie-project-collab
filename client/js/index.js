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

async function openCloseModal(movieId) {
  const modalHeading = document.getElementById("modalHeading");
  const modalBody = document.getElementById("modalBody");

  if (modalTrailers.classList.contains('modal-show')) {
      modalTrailers.classList.remove('modal-show');
      
      document.body.style.overflow = '';
      modalHeading.innerHTML = "";
      modalBody.innerHTML = "";
      // Reset currentVisibleDiv
      currentVisibleDiv = null;
  } else {
      modalTrailers.classList.add('modal-show');
      document.body.style.overflow = 'hidden';
      modalHeading.innerHTML = "Movie Trailers";

      let getTrailers = await getMovieTrailers(movieId);

      modalBody.innerHTML = `${getTrailers}`;
      // Initialize currentVisibleDiv to the element with show-modal-trailers
      currentVisibleDiv = document.querySelector('.show-modal-trailers');
      // console.log(currentVisibleDiv);
  }
}

// Close the modal if someone clicks outside of the modal
document.addEventListener('DOMContentLoaded', (event) => {
  
  // Close the modal when clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target == modalTrailers) {
      openCloseModal();
    }
  }
});

// Close the modal when touching outside of the modal content
window.ontouchstart = function (event) {
  if (event.target == modalTrailers) {
    openCloseModal();
  }
}

// Close modal if someone hits the escape key
document.onkeydown = function (event) {
  if (event.key === 'Escape') {
      // Restore background scrolling
    if (modalTrailers.classList.contains('modal-show')) {
      openCloseModal();
    }
  }
}

async function getMovieTrailers(id) {
  const response = await fetch(`/api/movie-trailers/${id}`);
  const results = await response.json();
  // console.log(results);
  return results;
};

function hideMovieTrailers(divId) {
  // Hide the currently visible div if it exists
  if (currentVisibleDiv) {
    currentVisibleDiv.classList.remove('show-modal-trailers');
    currentVisibleDiv.classList.add('hide-modal-trailers');
  }
  
  // Show the clicked div
  const targetDiv = document.getElementById(divId);
  if (targetDiv) {
    targetDiv.classList.remove('hide-modal-trailers');
    targetDiv.classList.add('show-modal-trailers');
    
    // Update the currently visible div
    currentVisibleDiv = targetDiv;
  } else {
    console.error(`No element found with id: ${divId}`);
  }
}