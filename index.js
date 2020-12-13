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
  // recuperation de l'image du personnage et la mettre dans le dossier data
  dest: "./public/data"
});
// supprime l'image du dossier data
const remove=(path)=>{
  fs.unlink(path, err => {
          if (err) return handleError(err, res);
        });
}

app.post('/add',
upload.single("image"),(req, res) => {
  let tempPath =req.file.path;
    //recuper le type du fichier
    ext=path.extname(req.file.originalname).toLowerCase();
    // verifier s'il s'agit d'unr image si oui on l'ajoute avec son extension sinon on la retire du dossier data
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      fs.rename(tempPath, tempPath+ext, err => {
        if (err) remove(tempPath)
      });
    }else {
        remove(tempPath)
        res.status(403).send("seul les fichiers .png, .jpg, .jpeg qui sont accepte!");
    }
                                                            // on enregistre le path de l'image 
    const newP = { name: req.body.name,  car: req.body.car, picture: "data/"+path.basename(tempPath)+ext };
    data.addNew(newP)
    res.redirect('/');
});

app.get('/', function (req, res) {
  data.getAll((arr)=>{res.render('index', {pers: arr});})
});



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
