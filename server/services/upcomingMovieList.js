const options = {
 method: 'GET',
 headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`

 }
}

async function upcomingMovieList(pageNumber)
{
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageNumber}`;

    try {
        const response = await fetch(url, options);    
        return response.json();
        
    } catch (error) {
        console.log(error);

        throw error;
    }
}

module.exports=upcomingMovieList;