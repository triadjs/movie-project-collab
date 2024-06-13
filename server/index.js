// very simple boilerplate express server to serve the static files

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '../client')));


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});