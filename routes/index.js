// http://localhost:3000/

var express = require('express');
var router = express.Router();
var app = express();
var User = require('../models/user')
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sendatask';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup' , function(req,res) {
	res.render('signup');
});

router.get('/login' , function(req,res) {
	res.render('login');
});

router.post('/signup' , function(req,res) {
	console.log("We will sign you up  " + req.body.username);
	const results = [];
  // Grab data from http request
  const data = {username: req.body.username, name: req.body.name , email: req.body.email , password: req.body.password};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    console.log("creating new user for :  " + req.body.username);
    var user = new User(data.name,data.username, data.email,data.password );
    user.save();
	// SQL Query > Insert Data
    // client.query('INSERT INTO users(name, username,email,password) values($1,$2,$3,$4)',
    // [data.name, data.username,data.email,data.password]);
    // SQL Query > Select Data
    // const query = client.query('SELECT * FROM users ORDER BY name ASC');
    // // Stream results back one row at a time
    // query.on('row', (row) => {
    //   results.push(row);
    // });
    // // After all data is returned, close connection and return results
    // query.on('end', () => {
    //   done();
    //   return res.json(results);
    // });
    res.end();
  });
});

app.use('/', router);
module.exports = router;
