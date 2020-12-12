// att line 48 on indeex.js
gamers.push(newG)
    let json=JSON.stringify(gamers)   // on ecrit les modifications dans le fichier JSON
    fs.writeFile('public/data/users.json', json, 'utf8', function(err) {
      if (err) throw err;
      res.redirect('/');
    });