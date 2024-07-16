const fs = require('node:fs');
const path = require('path');

async function getFilesContentNode(){
    const res = fs.readFileSync(path.resolve(__dirname,'../static/db.json'))
    console.log("node:res => ",res);
    return res;
}

module.exports = {
    getFilesContentNode
}