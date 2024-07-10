const buildTrailerIframe = require('../helpers/buildTrailerIframe');
const trailerButtons = require('../helpers/trailerButtons');
const listOutTrailers = require('../helpers/listOutTrailers');

function trailersTemplate(resultsArray) {
    let results = resultsArray.results;
    
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

    let buttons = trailerButtons(trailerListCount, teaserListCount, clipListCount, bloopersListCount, behindTheScenesListCount);

    let listOfTrailers = listOutTrailers(trailerList, teaserList, clipList, bloopersList, behindTheScenesList);
  
    return `${buttons}${listOfTrailers}`;
}

module.exports = trailersTemplate;