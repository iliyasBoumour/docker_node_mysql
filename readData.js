let fs = require('fs');

let data = JSON.parse(fs.readFileSync('public/data/users.json', 'utf8'));

module.exports=data