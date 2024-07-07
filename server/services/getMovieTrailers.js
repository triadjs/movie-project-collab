const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`
    }
};

async function getMovieTrailers(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = getMovieTrailers;