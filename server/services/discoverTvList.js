const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`
    }
};

async function discoverTvList(pageNumber) {
    let url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = discoverTvList;