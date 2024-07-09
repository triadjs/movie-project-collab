let trailerList = '';
let teaserList = '';
let clipList = '';
let behindTheScenesList = '';
let bloopersList = '';
let featuretteList = '';
let trailerListCount = 0;
let teaserListCount = 0;
let clipListCount = 0;
let behindTheScenesListCount = 0;
let bloopersListCount = 0;
let featuretteListCount = 0;

function formatMovieTrailers(resultsArray) {
    let results = resultsArray.results;
    trailerList = '';
    teaserList = '';
    clipList = '';
    behindTheScenesList = '';
    bloopersList = '';
    featuretteList = '';
    trailerListCount = 0;
    teaserListCount = 0;
    clipListCount = 0;
    behindTheScenesListCount = 0;
    bloopersListCount = 0;
    featuretteListCount = 0;
  
    results.forEach(item => {
      let site = item.site;
      let type = item.type;
      let youtubeId = item.key;
      let trailerTitle = item.name;
  
      if (site == "YouTube") {
        if (type == "Trailer") {
          trailerList += buildTrailerIframe(type, youtubeId, trailerTitle);
          trailerListCount += 1;
        } else if (type == "Teaser") {
          teaserList += buildTrailerIframe(type, youtubeId, trailerTitle);
          teaserListCount += 1;
        } else if (type == "Clip") {
          clipList += buildTrailerIframe(type, youtubeId, trailerTitle);
          clipListCount += 1;
        } else if (type == "Behind the Scenes") {
          behindTheScenesList += buildTrailerIframe(type, youtubeId, trailerTitle);
          behindTheScenesListCount += 1;
        } else if (type == "Bloopers") {
          bloopersList += buildTrailerIframe(type, youtubeId, trailerTitle);
          bloopersListCount += 1;
        } else if (type == "Featurette") {
          featuretteList += buildTrailerIframe(type, youtubeId, trailerTitle);
          featuretteListCount += 1;
        } 
      }
    });
    
    if (trailerList == '') {
      trailerList = 'Sorry there are no trailers for this movie at this time.';
    } 
  
    if (teaserList == '') {
      teaserList = 'Sorry there are no teaser trailers for this movie at this time';
    }
  
    if (clipList == '') {
      clipList = 'Sorry there are no clips for this movie at this time';
    }
  
    if (behindTheScenesList == '') {
      behindTheScenesList = 'Sorry there are no behind the scenes trailers for this movie at this time';
    }
  
    if (bloopersList == '') {
      bloopersList = 'Sorry there are no bloopers for this movie at this time';
    }
  
    if (featuretteList == '') {
      featuretteList = 'Sorry there are no featurettes for this movie at this time';
    }
  
    return displayMovieTrailers();
}

function buildTrailerIframe(type, youtubeId, trailerTitle) {

  if (type == "Clip") {
    return `
    <h3 class="trailer__iframe--title">${trailerTitle}</h3>
    <div class="trailer__iframe--container">
      <iframe 
        style="position: absolute; top: 0; left:0; width: 100%; height: 100%; border: 0;"
        loading="lazy";
        src="https://www.youtube.com/embed/${youtubeId}" 
        title="${trailerTitle}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>`
  } else {
    return `
      <h3 class="trailer__iframe--title">${trailerTitle}</h3>
      <div class="trailer__iframe--container">
        <iframe 
          style="position: absolute; top: 0; left:0; width: 100%; height: 100%; border: 0;"
          loading="lazy";
          srcdoc="<style>
            * {
            padding: 0;
            margin: 0;
            overflow: hidden;
            }
            
            body, html {
              height: 100%;
            }
            
            img, svg {
              position: absolute;
              width: 100%;
              top: 0;
              bottom: 0;
              margin: auto;
            }
            
            svg {
              filter: drop-shadow(1px 1px 10px hsl(206.5, 70.7%, 8%));
              transition: all 250ms ease-in-out;
            }
            
            body:hover svg {
              filter: drop-shadow(1px 1px 10px hsl(206.5, 0%, 10%));
              transform: scale(1.2);
            }
          </style>
          <a href='https://www.youtube.com/embed/${youtubeId}?autoplay=1'>
            <img src='https://img.youtube.com/vi/${youtubeId}/sddefault.jpg' alt='${trailerTitle}' onerror='this.onerror=null; this.src=&quot;./img/failed-to-load-trailer-image.jpg&quot;'>
            <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'><circle cx='12' cy='12' r='10'></circle><polygon points='10 8 16 12 10 16 10 8'></polygon></svg>
          </a>
          "
          src="https://www.youtube.com/embed/${youtubeId}" 
          title="${trailerTitle}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>`
  }
}

function displayMovieTrailers() {
  let modalButtons = `
        <div>
          <button id="modalTrailersBtn" class="modal__buttons" onclick="hideMovieTrailers('modalTrailersDiv')">Trailers ${trailerListCount}</button>
          <button id="modalTeasersBtn" class="modal__buttons" onclick="hideMovieTrailers('modalTeasersDiv')">Teasers ${teaserListCount}</button>
          <button id="modalClipsBtn" class="modal__buttons" onclick="hideMovieTrailers('modalClipsDiv')">Clips ${clipListCount}</button>
          <button id="modalBloopersBtn" class="modal__buttons" onclick="hideMovieTrailers('modalBloopersDiv')">Bloopers ${bloopersListCount}</button>
          <button id="modalBehindTheScenesBtn" class="modal__buttons" onclick="hideMovieTrailers('modalBehindTheScenesDiv')">Behind The Scenes ${behindTheScenesListCount}</button>
        </div>
      `;
  let listOutTrailers = `
        <div id="modalTrailersDiv" class="modal__show-trailers">
          ${trailerList}
        </div>
        <div id="modalTeasersDiv" class="modal__hide-trailers">
          ${teaserList}
        </div>
        <div id="modalClipsDiv" class="modal__hide-trailers">
          ${clipList}
        </div>
        <div id="modalBloopersDiv" class="modal__hide-trailers">
          ${bloopersList}
        </div>
        <div id="modalBehindTheScenesDiv" class="modal__hide-trailers">
          ${behindTheScenesList}
        </div>
      `;

  return `${modalButtons}${listOutTrailers}`;
}

module.exports = formatMovieTrailers;