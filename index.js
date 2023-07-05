const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const PORT = process.env.PORT || 4000;
const sql = require('mysql')
const bodyParser = require('body-parser');


const con = sql.createConnection({
  host:'localhost',
  user:'root',
  password:'root123',
  database:'graph'
  
})

const static_path = path.join(__dirname, "/public");
const template_path = path.join(__dirname, "/template/views");
const partials_path = path.join(__dirname, "/template/partials");

app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


hbs.registerHelper('isActiveLink', function(link, options) {
  if (link === this.activeLink) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use(function(req, res, next) {
    res.locals.isActiveLink = function(link, activeClass) {
      return req.originalUrl === link ? activeClass : '';
    };
    next();
});

app.get('/', function(req, res) {
  res.render('index', { activeLink: '/' });
});

app.get('/our-game', function(req, res) {
  res.render('our-game', { activeLink: '/our-game' });
});

app.get('/studio', function(req, res) {
  res.render('studio', { activeLink: '/studio' });
});
app.get('/blog', function(req, res){
  res.render('blog', {activeLink: '/blog'})
})

app.get('/contact', function(req, res){
  res.render('contact', {activeLink: '/contact'})
})

app.post('/contact', function(req, res) {
  const { name, subject, email, mobile, message } = req.body;

  var sql = 'INSERT INTO gaming (name, subject, email, mobile, message) VALUES (?, ?, ?, ?, ?)';
  con.query(sql, [name, subject, email, mobile, message], function(error, result) {
    if (error) throw error;
    res.redirect('/');
  });
});
app.get('/shop', function(req, res) {
  res.render('shop', { activeLink: '/shop' });
});
app.get('/views', function(req, res){
  res.render('views')
})
app.get('/views1', function(req, res){
  res.render('views1')
})
app.get('/views2', function(req, res){
  res.render('views2')
})
app.get('/views3', function(req, res){
  res.render('views3')
})
app.get('/views4', function(req, res){
  res.render('views4')
})
app.get('/views5', function(req, res){
  res.render('views5')
})
app.listen(PORT, function() {
  console.log(`Listening port ${PORT}`);
});
