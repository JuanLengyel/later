const sqlite3 = require('sqlite3');
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

// Creates an article database table if it doesn't already exists
db.serialize(() => {
  const sql = `CREATE TABLE IF NOT EXISTS articles
    (id integer primary key, title, content TEXT)`;
    db.run(sql);
});

class Article {
  // Retrieves all records from articles table
  static all(cb) {
    db.all('SELECT * FROM articles', cb);
  }

  // Retrieves a single article using a provided id
  static find(id, cb) {
    db.get('SELECT * FROM articles WHERE id = ?', id, cb);
  }

  // Insert a new article to the database
  static create(data, cb) {
    const sql = 'INSERT INTO articles(title, content) VALUES(?, ?)';
    db.run(sql, data.title, data.content, cb);
  }

  // Delete an article indicating the article id
  static delete(id, cb) {
    if (!id) cb(new Error('Please provide an id'));
    const sql = 'DELETE FROM articles WHERE id = ?';
    db.run(sql, id, cb);
  }
}

module.exports = db;
module.exports.Article = Article;
