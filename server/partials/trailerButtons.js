function trailerButtons(trailerListCount, teaserListCount, clipListCount, bloopersListCount, behindTheScenesListCount) {
    return `
        <div>
            <button id="modalTrailersBtn" class="modal__buttons" onclick="hideMovieTrailers('modalTrailersDiv')">Trailers ${trailerListCount}</button>
            <button id="modalTeasersBtn" class="modal__buttons" onclick="hideMovieTrailers('modalTeasersDiv')">Teasers ${teaserListCount}</button>
            <button id="modalClipsBtn" class="modal__buttons" onclick="hideMovieTrailers('modalClipsDiv')">Clips ${clipListCount}</button>
            <button id="modalBloopersBtn" class="modal__buttons" onclick="hideMovieTrailers('modalBloopersDiv')">Bloopers ${bloopersListCount}</button>
            <button id="modalBehindTheScenesBtn" class="modal__buttons" onclick="hideMovieTrailers('modalBehindTheScenesDiv')">Behind The Scenes ${behindTheScenesListCount}</button>
        </div>`
}

module.exports = trailerButtons;