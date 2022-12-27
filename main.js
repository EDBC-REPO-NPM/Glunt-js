const bdl = require('./module/bundler');
const stream = require('stream');
const path = require('path');
const fs = require('fs');

//────────────────────────────────────────────────────────────────────────────────────────────────//

module.exports = async ( ...args )=>{

    const raw = fs.readFileSync(args[0]);

    let dir = path.join( args[0],'../' );
        dir = path.normalize(dir);

    const out = await bdl( raw,dir );

    if( args[1] )
         fs.writeFileSync( args[1],out );
    else {
        const o = process.stdout;
        const i = stream.Readable.from(out);
        stream.pipeline( i, o, ()=>{} );
    }

}

//────────────────────────────────────────────────────────────────────────────────────────────────//