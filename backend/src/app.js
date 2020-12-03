const { Console, debug } = require('console');
const express = require('express');
var mysql = require('mysql');
const multer = require('multer')
const cors = require('cors')
var fs = require("fs"),json;
const app = express()
const port = 3000
var filepath = __dirname;
var imagepath = "";
var pathTowoodLibrary ='JSON/lankut.json'
app.use(express.json());
app.use(cors())
//sql testing
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hnais4op",
  database: "timberdb"
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

// Get image with filepath
app.get('/image/:path',function(req, res, next) {
  console.log(req.params.path);
  res.sendFile(req.params.path.Image);
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
        imagepath = req.file.path;
        console.log(req.file);
        res.sendStatus(200)
      });
    }
  })
})

app.listen(port, () => {
  console.log(`Sahapeli app listening at http://localhost:${port}`)
})