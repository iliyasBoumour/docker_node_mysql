const express = require('express')
const exphbs  = require('express-handlebars');
const fs = require('fs');
const path = require("path");
const multer = require("multer");
const data=require('./dao/personnagesDao')
const app = express()

// for handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
 
// body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes

app.get('/addNew', function (req, res) {
  res.render('addNew');
});

const upload = multer({
  // rescuperation de l'image et la mettre dans le dossier data
  dest: "./public/data"
});

app.post('/add',
upload.single("image"),(req, res) => {
  let tempPath 
  //verifier si l'utilisateur a saisi toutes les donnees (y'en a aussi une verification au niveau du front)
  if (req.body.name && req.body.email && req.body.phone && req.body.games )  {  
    tempPath=req.file.path;
    ext=path.extname(req.file.originalname).toLowerCase();
    // verifier s'il s'agit d'unr image si oui on l'ajoute avec son extension sinon on la retire du dossier data
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      fs.rename(tempPath, tempPath+ext, err => {
        if (err) fs.unlink(tempPath, err => {})
      });
    }else {
      fs.unlink(tempPath, err => {
        res.status(403).send("Only .png, .jpg, .jpeg files are allowed!");
      });
    }
                                                                                              // on enregistre le path de l'image 
    const newG = { name: req.body.name, email: req.body.email, phone: req.body.phone, games: req.body.games, picture: "data/"+path.basename(tempPath)+ext };
    data.addNew(newG);
    res.redirect('/');
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);
    });
    res.status(404).send('fill all fields');
} 
});

app.get('/', function (req, res) {
  // res.render('index')
  data.getAll((arr)=>{res.render('index', {gamers: arr});})
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
