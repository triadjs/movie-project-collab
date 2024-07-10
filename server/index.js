// This handles all of our Routes

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const listPage = require('./layout/listPage');
const discoverMovieList = require('./services/discoverMoviesList');
const getMovieTrailers = require('./services/getMovieTrailers');
const movieCardTemplate = require('./templates/movieCardTemplate');
const trailersTemplate = require('./templates/trailersTemplate');

app.use(express.static(path.join(__dirname, '../client')));

// This endpoint will change to /discover-movie once we get trending api call working. Then trending will become the default endpoint.
app.get('/', async (req, res) => {
  const pageNumberStart = 1;
  const movieList = await discoverMovieList(pageNumberStart);
  const list = listPage(movieList.results);
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

app.get('/api/movieList/:pageNum', async (req, res) => {
  const { pageNum } = req.params;
  const movieList = await discoverMovieList(pageNum);
  const list = JSON.stringify(movieCardTemplate(movieList.results))
  res.send(list);
})

app.get('/api/movie-trailers/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const movieTrailers = await getMovieTrailers(id);
    res.send(JSON.stringify(trailersTemplate(movieTrailers)));
  } catch (error) {
    console.log(error);
    res.send("error getting trailers");
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});