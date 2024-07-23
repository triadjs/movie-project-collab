const movieTvCardTemplate = require('../templates/movieTvCardTemplate');

function listPage(movieTvList, currentEndpoint) {
    
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Initial Design</title>
                <link rel="stylesheet" href="./css/main.css">
            </head>
            <body>
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
                    <button class="load-more__btn" id="loadMore" onClick="getMovies('${currentEndpoint}')">Load More</button>
                </div>
                <script src="./js/index.js"></script>
            </body>
            </html>`
}

module.exports = listPage;