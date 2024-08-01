const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`
    }
};

async function trendingList(pageNumber) {
    let url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${pageNumber}`;

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch(error) {
        console.log(error);
        throw error;
    }
}

module.exports = trendingList;