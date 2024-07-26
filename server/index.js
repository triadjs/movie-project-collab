// This handles all of our Routes

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const listPage = require('./layout/listPage');
const discoverMovieList = require('./services/discoverMoviesList');
const discoverTvList = require('./services/discoverTvList');
const getMovieTrailers = require('./services/getMovieTrailers');
const getTvTrailers = require('./services/getTvTrailers');
const trendingList = require('./services/trendingList');
const movieTvCardTemplate = require('./templates/movieTvCardTemplate');
const trailersTemplate = require('./templates/trailersTemplate');

app.use(express.static(path.join(__dirname, '../client')));

// This is returning all which means tv and moives
// In the future it should handle "all", "movie", and "tv" endpoints from The Movie DB
// This endpoint needs to also handle "day" or "week"
app.get('/', async (req, res) => {
  const pageNumberStart = 1;
  const trending = await trendingList(pageNumberStart);
  const list = listPage(trending.results, 'trendingList');
  res.send(list);
})

app.get('/discover-movie', async (req, res) => {
  const pageNumberStart = 1;
  const movieList = await discoverMovieList(pageNumberStart);
  const list = listPage(movieList.results, 'discoverMovieList');
  res.send(list);
})

app.get('/discover-tv', async (req, res) => {
  const pageNumberStart = 1;
  const tvList = await discoverTvList(pageNumberStart);
  const list = listPage(tvList.results, 'discoverTvList');
  res.send(list);
})

app.get('/hello', (req, res) => {
  res.send(`
    <div class="tenor-gif-embed" data-postid="17724131" data-share-method="host" data-aspect-ratio="2.17687" data-width="100%"><a href="https://tenor.com/view/adele-hello-from-the-other-side-mv-music-video-gif-17724131">Adele Hello GIF</a>from <a href="https://tenor.com/search/adele-gifs">Adele GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
    <br>
    This page was rendered from the server
    `);
})

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

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});