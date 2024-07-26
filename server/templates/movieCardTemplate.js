function movieCardTemplate(movieList) {
    // This card template only handles movies. It eventually needs to handle tv shows as well.
    let tempString = '';
    
    movieList.map(movie => {
        
        let { id, poster_path, title, release_date } = movie;

        let finalPosterPath = `https://image.tmdb.org/t/p/w185${poster_path}`

        tempString += `<div class="card" id="${id}">
            <div class="">
                <button class="card__trailer-btn" onClick="toggleModalVisibility('${id}')">Play Trailer</button>
            </div>
            <div class="">
                <img src="${finalPosterPath}" alt="" class="card__img-fluid">
            </div>
            <div class="">
                <div class="">
                ${title}
                </div>
                <div class="card__release-date">
                    ${release_date}
                </div>
            </div>
        </div>`
    })
    return tempString;
}

module.exports = movieCardTemplate;