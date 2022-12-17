const pack = require('./main');
const path = require('path');

const input = path.join(__dirname,'test','main.css');
const output = path.join(__dirname,'test','out.css');
    
pack( input, output );