// very simple boilerplate express server to serve the static files

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const listPage = require('./layout/listPage');
const discoverMovieList = require('./services/discoverMoviesList');
const getMovieTrailers = require('./services/getMovieTrailers');
const movieCardTemplate = require('./templates/movieCardTemplate');
const formatMovieTrailers = require('./templates/formatMovieTrailers');

app.use(express.static(path.join(__dirname, '../client')));

// app.get('/', async (req, res) => {
//   res.send('Welcome to Our Movie Site');
// })

app.get('/', async (req, res) => {
  // res.send(listPage());
  const pageNumberStart = 1;
  const movieList = await discoverMovieList(pageNumberStart);
  // const movieResults = movieList.results;
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
  // res.send('Loaded later');
  // const {pageNum} = req.params;
  // res.send(JSON.stringify(`pageNum = ${pageNum}`));
  const { pageNum } = req.params;
  const movieList = await discoverMovieList(pageNum);
  const list = JSON.stringify(movieCardTemplate(movieList.results))
  // console.log(list);
  res.send(list);
})


// need to create a template that can handle all the trailers etc
// maybe in the modal it will have trailers, teasers, interviews or whatever the types are
// I probably need to develop this outside of the project
app.get('/api/movie-trailers/:id', async (req, res) => {
  try {
    const {id} = req.params;
    // console.log(id);
    const movieTrailers = await getMovieTrailers(id);
    res.send(JSON.stringify(formatMovieTrailers(movieTrailers)));
  } catch (error) {
    console.log(error);
    res.send("error getting trailers");
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});