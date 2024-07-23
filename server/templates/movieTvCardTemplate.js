function movieTvCardTemplate(movieTvList) {
    // This card template only handles movies. It eventually needs to handle tv shows as well.
    let tempString = '';
    
    movieTvList.map(movieTv => {
        let itemTitle = '';
        let date = '';
        let contentType = '';

        let { id, poster_path, title, release_date, name, first_air_date } = movieTv;
        
        // This handles if it is a movie or tv show based on The Movie DB API
        if (title != undefined) {
            itemTitle = title;
            date = release_date;
            contentType = 'movie';
        } else {
            itemTitle = name;
            date = first_air_date;
            contentType = 'tv';
        }

        let finalPosterPath = `https://image.tmdb.org/t/p/w185${poster_path}`

        tempString += `<div class="card" id="${id}">
            <div>
                <button class="card__trailer-btn" onClick="toggleModalVisibility('${id}', '${contentType}')">Play Trailer</button>
            </div>
            ${contentType === 'tv' 
                ?   `<div class="card__content-tv--wrapper">
                        <span class="card__content-tv">TV</span>
                        <img src="${finalPosterPath}" alt="${itemTitle} Poster" class="card__img-fluid">
                    </div>`
                :   `<div>
                        <img src="${finalPosterPath}" alt="${itemTitle} Poster" class="card__img-fluid">
                    </div>`
            }
            <div>
                <div>
                ${itemTitle}
                </div>
                <div class="card__release-date">
                    ${date}
                </div>
            </div>
        </div>`
    })
    return tempString;
}

module.exports = movieTvCardTemplate;