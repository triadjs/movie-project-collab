// This handles all of our Routes

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const listPage = require('./layout/listPage');

//Templates
const movieTvCardTemplate = require('./templates/movieTvCardTemplate');
const trailersTemplate = require('./templates/trailersTemplate');

//Services
const discoverMovieList = require('./services/discoverMoviesList');
const discoverTvList = require('./services/discoverTvList');
const getMovieTrailers = require('./services/getMovieTrailers');
const getTvTrailers = require('./services/getTvTrailers');
const trendingList = require('./services/trendingList');
const nowPlayingMovieList = require('./services/nowPlayingMovieList');
const popularMovieList = require('./services/popularMovieList');
const topRatedMovieList = require('./services/topRatedMovieList');
const upcomingMovieList = require('./services/upcomingMovieList');

app.use(express.static(path.join(__dirname, '../client')));

// This is returning all which means tv and moives
// In the future it should handle "all", "movie", and "tv" endpoints from The Movie DB
// This endpoint needs to also handle "day" or "week"
app.get('/', async (req, res) => {
  try {
    const pageNumberStart = 1;
    //QUESSTION: What would be a better name for 'trendingList'?
    const trending = await trendingList(pageNumberStart);
    const list = listPage(trending.results, 'trendingList');
    res.send(list);
  } catch (error) {
    //QUESTION: Should we create our own custom error page???
    console.log('Error fecthing data:', error);
  }
})

app.get('/discover-movie', async (req, res) => {
  try {
    const pageNumberStart = 1;
    const movieList = await discoverMovieList(pageNumberStart);
    const list = listPage(movieList.results, 'discoverMovieList');
    res.send(list);    
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
})

app.get('/discover-tv', async (req, res) => {
  try {
    const pageNumberStart = 1;
    const tvList = await discoverTvList(pageNumberStart);
    const list = listPage(tvList.results, 'discoverTvList');
    res.send(list);    
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
})

app.get('/hello', (req, res) => {
  res.send(`
    <div class="tenor-gif-embed" data-postid="17724131" data-share-method="host" data-aspect-ratio="2.17687" data-width="100%"><a href="https://tenor.com/view/adele-hello-from-the-other-side-mv-music-video-gif-17724131">Adele Hello GIF</a>from <a href="https://tenor.com/search/adele-gifs">Adele GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
    <br>
    This page was rendered from the server
    `);
})

app.get('/now-playing-movie', async (req, res) => {
  try {
    const pageNumberStart = 1;
    const nowPlaying = await nowPlayingMovieList(pageNumberStart);
    const list = listPage(nowPlaying.results, 'nowPlayingMovieList');
    res.send(list);
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
});

app.get('/popular-movie', async(req, res) => {
  try {
    const pageNumberStart = 1;
    const popular = await popularMovieList(pageNumberStart);
    const list = listPage(popular.results, 'popularMovieList');
    res.send(list);    
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
});

app.get('/top-rated-movie', async (req,res) =>{
  try {
    const pageNumberStart = 1;
    const topRated = await topRatedMovieList(pageNumberStart);
    const list = listPage(topRated.results, 'topRatedMovieList');
    res.send(list)    
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
});

app.get('/upcoming-movie', async (req, res) => {
  try {
    const pageNumberStart = 1;
    const upcoming = await upcomingMovieList(pageNumberStart);
    const list = listPage(upcoming.results, 'upcomingMovieList');
    res.send(list)
  } catch (error) {
    console.log('Error fecthing data:', error);
  }
});

//// Below are all of our own custom api endpoints that we can call from the frontend
app.get('/api/loadMore/trending/:pageNum', async (req, res) => {
  const { pageNum } = req.params;
  try {
    const trending = await trendingList(pageNum);
    const list = JSON.stringify(movieTvCardTemplate(trending.results));
    res.send(list);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

app.get('/api/loadMore/discoverMovie/:pageNum', async (req, res) => {
  const { pageNum } = req.params;
  try {
    const movieList = await discoverMovieList(pageNum);
    const list = JSON.stringify(movieTvCardTemplate(movieList.results));
    res.send(list);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

app.get('/api/loadMore/discoverTv/:pageNum', async (req, res) => {
  const { pageNum } = req.params;
  try {
    const tvList = await discoverTvList(pageNum);
    const list = JSON.stringify(movieTvCardTemplate(tvList.results));
    res.send(list);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})

app.get('/api/trailers/:id/:contentType', async (req, res) => {
  try {
    const {id, contentType } = req.params;
    let trailers = '';
    if (contentType == 'tv') {
      trailers = await getTvTrailers(id);
    } else {
      trailers = await getMovieTrailers(id);
    }
    res.send(JSON.stringify(trailersTemplate(trailers)));
  } catch (error) {
    console.log(error);
    res.send("error getting trailers");
  }
})

app.get('/api/loadMore/nowPlayingMovie/:pageNum', async (req, res) => {
const { pageNum } = req.params;
try {
  const nowPlaying = await nowPlayingMovieList(pageNum);
  const list = JSON.stringify(movieTvCardTemplate(nowPlaying.results));
  res.send(list);
} catch (error) {
  console.error('Error fetching data:', error);
}
});

app.get('/api/loadMore/popularMovie/:pageNum', async (req, res) => {
const { pageNum } = req.params;
try {
  const popular = await popularMovieList(pageNum);
  const list = JSON.stringify(movieTvCardTemplate(popular.results));
  res.send(list);  
} catch (error) {
  console.error('Error fetching data:', error);
}
});

app.get('/api/loadMore/topRatedMovie/:pageNum', async (req, res) => {
  const { pageNum } = req.params
  try {
    const topRated = await topRatedMovieList(pageNum);
    const list = JSON.stringify(movieTvCardTemplate(topRated.results));
    res.send(list);
  } catch (error) {
    console.error('Error fecthing data:', error);
  }
});

app.get('/api/loadMore/upcomingMovie/:pageNum', async (req, res) => {
  const { pageNum } = req.params;
  try {
    const upcoming = await upcomingMovieList(pageNum);
    const list = JSON.stringify(movieTvCardTemplate(upcoming.results));
    res.send(list);
  } catch (error) {
    console.error('Error fecthing data:', error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
}); 