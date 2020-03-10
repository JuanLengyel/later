// Import express to use it for the web application
const express = require('express');

// Instance express as the main holder of the application
const app = express();

// The port that the application will bind to. Defined by env variables. If not, default to 3000
const port = process.env.PORT || 3000;

// HTTP response to the most basic request
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Set the web app to listen on defined port
app.listen(port, () => {
  console.log(`Express web app available at localhost: ${port}`);
});
