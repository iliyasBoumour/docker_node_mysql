
const express = require('express')
const multer = require("multer");
var exphbs  = require('express-handlebars');
var gamers = require('./readData')
let fs = require('fs');
const path = require("path");



const app = express()

// for handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
 
// body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const upload = multer({
    dest: "./public/data"
  });

// routes
app.get('/', function (req, res) {
    res.render('form');
});


app.post("/upload",
    upload.single("file"),
    (req, res) => {
      let tempPath = req.file.path;
      console.log(tempPath)
  
      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, tempPath+".png", err => {
          if (err) return handleError(err, res);
  
          res
            .status(200)
            .contentType("text/plain")
            .end("File uploaded!");
        });
      }else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
    }
  );

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
