let fs = require('fs');

let data = JSON.parse(fs.readFileSync('public/data/personnages.json', 'utf8'));

module.exports=data