const { Console } = require('console')
const express = require('express')
var fs = require("fs"),json
const app = express()
const port = process.env.port || 3000
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

// post request for adding new content to lankut.json
// Tää varmaan pitäis tehdä promisella että saa noi errorit mukaan
// varmaan kanssa jotain chekkejä että toi body on oikein
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

app.listen(port, () => {
  console.log(`Sahapeli app listening at http://localhost:${port}`)
})