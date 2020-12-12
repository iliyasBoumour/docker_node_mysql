
const express = require('express')
const exphbs  = require('express-handlebars');
const gamers = require('./readData')
const fs = require('fs');
const path = require("path");
const multer = require("multer");


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
        if (err) return handleError(err, res)
        res.status(200)
      });
    }else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
        res.status(403).send("Only .png, .jpg, .jpeg files are allowed!");
      });
    }
                                                                                                            // on enregistre le path de l'image 
    const newG = { name: req.body.name, Email: req.body.email, Phone: req.body.phone, games: req.body.games, picture: "data/"+path.basename(tempPath)+ext };
    gamers.push(newG)
    let json=JSON.stringify(gamers)   // on ecrit les modifications dans le fichier JSON
    fs.writeFile('public/data/users.json', json, 'utf8', function(err) {
      if (err) throw err;
      res.redirect('/');
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);
    });
    res.status(404).send('error');
} 
});

app.get('/', function (req, res) {
  res.render('index', {gamers : gamers});
  console.log(gamers)
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
