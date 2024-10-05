const movieTvCardTemplate = require('../templates/movieTvCardTemplate');

function listPage(movieTvList, currentEndpoint) {

    const {method, title} = setVariablesForHtmlTemplate(currentEndpoint); 

    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
                <link rel="stylesheet" href="./css/main.css">
            </head>
            <body>
                <nav class="navbar">
                    <div class="navbar__container">
                        <a class="navbar__brand" href="/">The Entertainment Website</a>
                        <div>
                            <ul class="navbar__list">
                                <li><a class="navbar__link" href="/">Trending</a></li>
                                <li><a class="navbar__link" href="/discover-movie">Discover Movie</a></li>
                                <li><a class="navbar__link" href="/discover-tv">Discover TV</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <!-- Modal Structure -->
                <div id="modalTrailers" class="modal">
                    <div class="modal__content">
                        <div class="modal__header">
                            <h2 id="modalHeading">Modal Header</h2>
                            <span class="modal__close-btn" onclick="toggleModalVisibility()">&times;</span>
                        </div>
                        <div id="modalBody" class="modal__body">
                        </div>
                    </div>
                </div>
                <div class="results-container" id="results">
                    ${movieTvCardTemplate(movieTvList)}
                </div>
                <div class="load-more__btn-container">
                    <button class="load-more__btn" id="loadMore" onClick="${method}">Load More</button>
                </div>
                <script src="./js/index.js"></script>
            </body>
            </html>`
}

function setVariablesForHtmlTemplate(currentEndpoint)
{
    let endpoints = {
        trendingMovie: {
            method: 'getTrending()',
            title: 'Trending'
        },
        discoverMovie: {
            method: 'getDiscoverMovie()',
            title: 'Discover Movies'
        },
        discoverTv: {
            method: 'getDiscoverTv()',
            title: 'Discover TV Shows'
        },
        nowplayingMovie: {
            method: 'nowPlayingMovieList()',
            title: 'Now Playing Movies'
        },
        popularMovie: {
            method: 'popularMovieList()', 
            title: 'Popular Movies'
        },
        topRatedMovie: {
            method: 'topRatedMovieList()',
            title: 'Top Rated Movies'
        },
        upcomingMovie: {
            method: 'upcomingMovieList()',
            title: 'Upcoming Movies'
        }
    };

    if (currentEndpoint == 'trendingList') {
        return endpoints.trendingMovie;
    } else if (currentEndpoint == 'discoverMovieList') {
        return endpoints.discoverMovie;
    } else if (currentEndpoint == 'discoverTvList') {
        return endpoints.discoverTv;
    } else if (currentEndpoint == 'nowPlayingMovieList') {
        return endpoints.nowplayingMovie;
    } else if (currentEndpoint == 'popularMovieList') {
        return endpoints.popularMovie;
    } else if(currentEndpoint=='topRatedMovieList') {
        return endpoints.topRatedMovie;
    } else if(currentEndpoint=='upcomingMovieList') {
        return endpoints.upcomingMovie
    }
    //QUESTION: How should situations where endpoint is not found be handled?
    return console.log("Error! Endpoint not found.");
}

module.exports = listPage;