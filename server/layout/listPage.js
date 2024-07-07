const movieCardTemplate = require('../templates/movieCardTemplate');

function listPage(movieList) {
    
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
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 id="modalHeading">Modal Header</h2>
                            <span class="modal-close-btn" onclick="openCloseModal()">&times;</span>
                        </div>
                        <div id="modalBody" class="modal-body">
                        </div>
                    </div>
                </div>
                <div class="results-container" id="results">
                    ${movieCardTemplate(movieList)}
                </div>
                <div class="btn-container">
                    <button class="btn-load-more" id="loadMore" onClick="getMovies()">Load More</button>
                </div>
                <script src="./js/index.js"></script>
            </body>
            </html>`
}

module.exports = listPage;