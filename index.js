// Import express to use it for the web application
const express = require('express');
// Import body-parser to interpret json incoming to the server
const bodyParser = require('body-parser');
// Import database model definition
const Article = require('./db').Article;
// Import readability module to get a readable version of the stored articles
const read = require('node-readability');

// Instance express as the main holder of the application
const app = express();

// Set 'port' as an application property. Defined by env variables. If not, default to 3000
app.set('port', process.env.PORT || 3000);

// Support request bodies encoded as JSON
app.use(bodyParser.json());

// Support form encoded bodies
app.use(bodyParser.urlencoded({ extended: true}));

// Serve static bootstrap CSS
app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

// GET HTTP method to retrieve all stored articles
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);

    res.format({
      html: () => {
        res.render('articles.ejs', { articles });
      },
      json: () => {
        res.send(articles);
      }
      });
  });
});

// GET HTTP method to retrieve a single stored article
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.format({
      html: () => {
        res.render('article.ejs', { article })
      },
      json: () => {
        res.send(article);
      }
    });
  });
});

// POST HTTP method to store a new article
app.post('/articles', (req, res, next) => {
  const url = req.body.url;

  read(url, (err, result) => {
    if (err || !result) return res.status(500).send('Error downloading article');
    Article.create({ title: result.title, content: result.content }, (err) => {
      if (err) return next(err);
      res.send({ 'message' : `Stored article from URL: ${url}` });
    });
  });
});

// DELETE HTTP method to delete a single stored article
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({ 'message' : `Deleted article with id: ${id}` });
  });
});

app.listen(app.get('port'), () => {
  console.log('App started on port: ', app.get('port'));
});


module.exports = app;
