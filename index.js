// Import express to use it for the web application
const express = require('express');
// Import body-parser to interpret json incoming to the server
const bodyParser = require('body-parser');

// Instance express as the main holder of the application
const app = express();

// Array used to store articles
const articles = [{title: 'Yo Momma'}];

// Set 'port' as an application property. Defined by env variables. If not, default to 3000
app.set('port', process.env.PORT || 3000);

// Support request bodies encoded as JSON
app.use(bodyParser.json());

// Support form encoded bodies
app.use(bodyParser.urlencoded({ extended: true}));

// GET HTTP method to retrieve all stored articles
app.get('/articles', (req, res, next) => {
  res.send('OK');
});

// GET HTTP method to retrieve a single stored article
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Fetching: ', id);
  res.send(articles[id]);
});

// POST HTTP method to store a new article
app.post('/articles', (req, res, next) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

// DELETE HTTP method to delete a single stored article
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Deleting: ', id);
  delete articles[id];
  res.send({ message: 'Delete' });
});

app.listen(app.get('port'), () => {
  console.log('App started on port: ', app.get('port'));
});


module.exports = app;
