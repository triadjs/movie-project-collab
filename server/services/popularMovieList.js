const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`
    }
};

async function popularMovieList(pageNumber){
    let url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}', options`;    
    try {
        const response = await fetch(url, options);
        return response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports=popularMovieList;