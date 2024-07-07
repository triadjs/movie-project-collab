function movieCardTemplate(movieList) {
    // This card template only handles movies. It eventually needs to handle tv shows as well.
    let tempString = '';
    
    movieList.map(movie => {
        
        let { id, poster_path, title, release_date } = movie;

        let finalPosterPath = `https://image.tmdb.org/t/p/w185${poster_path}`

        tempString += `<div class="card" id="${id}">
            <div class="btn-trailer-container">
                <button class="btn-trailer" onClick="openCloseModal('${id}')">Play Trailer</button>
            </div>
            <div class="card-img">
                <img src="${finalPosterPath}" alt="" class="img-fluid">
            </div>
            <div class="card-text">
                <div class="item-title">
                ${title}
                </div>
                <div class="release-date">
                    ${release_date}
                </div>
            </div>
        </div>`
    })
    return tempString;
}

module.exports = movieCardTemplate;