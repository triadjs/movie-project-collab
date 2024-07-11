function listOutTrailers(trailerList, teaserList, clipList, bloopersList, behindTheScenesList) {
    return `
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
        </div>`
}

module.exports = listOutTrailers;