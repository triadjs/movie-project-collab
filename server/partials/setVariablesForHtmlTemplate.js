const endpoints = {
    trendingList: {
        method: 'getTrending()',
        title: 'Trending'
    },
    discoverMovieList: {
        method: 'getDiscoverMovie()',
        title: 'Discover Movies'
    },
    discoverTvList: {
        method: 'getDiscoverTv()',
        title: 'Discover TV Shows'
    },
    nowPlayingMovieList: {
        method: 'getNowPlayingMovie()',
        title: 'Now Playing Movies'
    },
    popularMovieList: {
        method: 'getPopularMovie()', 
        title: 'Popular Movies'
    },
    topRatedMovieList: {
        method: 'getTopRatedMovie()',
        title: 'Top Rated Movies'
    },
    upcomingMovieList: {
        method: 'getUpcomingMovie()',
        title: 'Upcoming Movies'
    }
};

function setVariablesForHtmlTemplate(currentEndpoint)
{
    const endpointVariables = endpoints[currentEndpoint];

    console.log("made it");

    if (!endpointVariables) {
        return console.log("Error! Endpoint not found.");
    }

    return endpointVariables; 
}

module.exports = setVariablesForHtmlTemplate;