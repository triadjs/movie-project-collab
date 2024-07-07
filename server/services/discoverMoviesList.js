const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`
    }
};

async function discoverMovieList(pageNumber) {
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = discoverMovieList;