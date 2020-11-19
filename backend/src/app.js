const { Console } = require('console');
const express = require('express');
var mysql = require('mysql');
var fs = require("fs"),json;
var path = require('path');
const app = express()
const port = 3000
var filepath = __dirname;
var filenames =[];
var pathTowoodLibrary ='JSON/lankut.json'
var woodLibrary;
app.use(express.json());

//sql testing
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hnais4op",
  database: "timberdb"
});

function test(){
    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})};

test();

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getJSON(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

woodLibrary = getJSON(pathTowoodLibrary);
var values = Object.values(woodLibrary)
var randomValue = values[parseInt(Math.random() * values.length)]
console.log(randomValue)

// get / sends JSON object
app.get('/', function(req, res, next) {
    var randomValue = values[parseInt(Math.random() * values.length)]
    res.json(randomValue);
    console.log(randomValue);
  });

// get /image for testing purposes
app.get('/image', function(req, res, next) {
    var randomValue = values[parseInt(Math.random() * values.length)]
    res.sendFile(filepath+randomValue.Image);
  });

app.post('/', function(req, res, next) {
  fs.readFile(pathTowoodLibrary, (error, data) =>  {
    var json = JSON.parse(data)
    json.push(req.body)
    // write JSON string to a file
    fs.writeFile("./"+pathTowoodLibrary, JSON.stringify(json), (err) => {
      if (err) {
          console.log("err")
      }
      else {
        console.log("JSON data is saved.")
      }
    }); 
  }) 
  res.json(req.body)
})

// get / sends JSON object
app.get('/sql', function(req, res, next) {
  var returnItem
  var sql = "SELECT * FROM timber ORDER BY RAND() LIMIT 1;";
  // Get amount of items
  con.query(sql, function (err, result) {
    if (err) throw err;
    returnItem = JSON.parse(JSON.stringify(result))
    console.log(returnItem);
  });
  res.json(returnItem);
});

app.post('/sql', function(req, res, next){
  var data = req.body;
  console.log(data.Type);
  var sql = "INSERT INTO timber (type, grade, reason_finnish, reason_english, imagepath) VALUES (" 
  +data.type+","+data.grade+","+data.reason_finnish+","+data.reason_english+","+data.imagepath+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.json(req.body)
});

app.listen(port, () => {
  console.log(`Sahapeli app listening at http://localhost:${port}`)
})