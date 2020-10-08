const { Console } = require('console')
const express = require('express')
var fs = require("fs"),json
const app = express()
const port = 3000
var filepath = __dirname
var pathTowoodLibrary ='JSON/lankut.json'
var woodLibrary
app.use(express.json())

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

woodLibrary = getJSON(pathTowoodLibrary)
var values = Object.values(woodLibrary)
var randomObject = values[parseInt(Math.random() * values.length)]
console.log(randomObject)

// get / sends JSON object
app.get('/', function(req, res, next) {
    var randomObject = values[parseInt(Math.random() * values.length)]
    res.json(randomObject)
    console.log(randomObject)
  });

  // get /image for testing purposes
app.get('/image', function(req, res, next) {
    var randomObject = values[parseInt(Math.random() * values.length)]
    res.sendFile(filepath+randomObject.Image)
  })

app.listen(port, () => {
  console.log(`Sahapeli app listening at http://localhost:${port}`)
})