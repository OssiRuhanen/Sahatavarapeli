require('dotenv').config()
const { Console, debug } = require('console');
const express = require('express');
var mysql = require('mysql');
const multer = require('multer')
const cors = require('cors')
var fs = require("fs"),json;
const app = express()
const port = 3000
var imagepath = "";
app.use(express.json());
app.use(cors())

//sql testing
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

function connect(){
    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})};

connect();

//Image Storage Engine
const storage = multer.diskStorage({
  destination: __dirname+'/images/',
  filename: function(req, file, callback){
    callback(null, file.originalname)
  }
})

//Init upload
const upload = multer({
  storage: storage
}).single('image')

//ROUTES
// get /image for testing purposes
// app.get('/image', function(req, res, next) {
//     var randomValue = values[parseInt(Math.random() * values.length)]
//     res.sendFile(filepath+randomValue.Image);
//   });

// get /sql returns random object from database
app.get('/timber', function(req, res, next) {
  var returnItem
  var sql = "SELECT * FROM timber ORDER BY RAND() LIMIT 1;";
  
  con.query(sql, (err, result) => {
    if (err) throw err;
    returnItem = JSON.parse(JSON.stringify(result))
    console.log(returnItem[0].imagepath);
  });
  res.json({ returnItem });
});

// returns random array of 15 objects from database
app.get('/timber/array', function(req, res, next) {
  var returnItem = [];
  var sql = "SELECT * FROM timber ORDER BY RAND() LIMIT 15;";
  
  con.query(sql, (err, result) => {
    if (err) throw err;

    Object.keys(result).forEach((key) => {
      var row = result[key];
      console.log(row);
      returnItem.push(row);
    });
    console.log(returnItem);
    res.json({ planks: returnItem });
  });
});

// Get image with filepath
app.get('/image/:path',function(req, res, next) {
  var path = req.params.path;

  console.log(path);
  res.sendFile(__dirname + '/images/' + path);
});

app.post('/timber', function(req, res, next){
  var data = req.body;
  console.log(data.Type);
  var sql = "INSERT INTO timber (type, grade, reason_finnish, reason_english, imagepath) VALUES (?, ?, ?, ?, ?)";
  con.query(sql, [data.type, data.grade, data.reason_finnish, data.reason_english, imagepath], (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.json(req.body)
});

//Image upload route
app.post('/upload', (req, res)=>{
  upload(req,res, (err) =>{
    if(err){
      res.status(500)
    }
    else{
      // Get folder size for naming purposes
      fs.readdir(__dirname+'/images/', (err, files) => {
        fs.renameSync(req.file.path, __dirname+'/images/'+files.length+"_"+req.file.originalname)
        imagepath = files.length+"_"+req.file.originalname;
        console.log(req.file);
        res.sendStatus(200)
      });
    }
  })
})


// Highscores

// Get top 10 highscores
app.get('/highscores',function (req,res,next){
  var returnItem = [];
  var sql = "SELECT * FROM highscore ORDER BY score DESC LIMIT 10;";
  con.query(sql, (err, result) => {
    if (err) throw err;

    Object.keys(result).forEach((key) => {
      var row = result[key];
      console.log(row);
      returnItem.push(row);
    });
    res.json({ scores: returnItem });
  });
});

// post highscore
app.post('/highscores', function(req, res, next){
  console.log(req.body);
  var data = req.body;
  console.log(data.Type);
  var sql = "INSERT INTO highscore (username, score) VALUES (?, ?)";
  con.query(sql, [data.username, data.score], (err, result) => {
    if (err) throw err;
    console.log("1 score inserted");
  });
  res.json(req.body)
});

app.listen(port, () => {
  console.log(`Sahapeli app listening at http://localhost:${port}`)
})