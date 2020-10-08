const { Console } = require('console');
const express = require('express');
var fs = require("fs"),json;
var path = require('path');
const app = express()
const port = 3000
var filepath = __dirname;
var filenames =[];
var pathTowoodLibrary ='JSON/lankut.json'
var woodLibrary;
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Sahapeli app listening at http://localhost:${port}`)
})