const bdl = require('./module/bundler');
const stream = require('stream');
const path = require('path');
const fs = require('fs');

//────────────────────────────────────────────────────────────────────────────────────────────────//

module.exports = async ( ...args )=>{

    const out = await bdl( args[0] );

    if( process.env.TERMINAL ){
        const wrt = !args[1] ? process.stdout : 
              fs.createWriteStream(args[1]);
        out.pipe(wrt);
    } else { return out }

}

//────────────────────────────────────────────────────────────────────────────────────────────────//