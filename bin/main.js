#!/usr/bin/env node
    
const glunt = require('../main');
const fs = require('fs');

function err(){
    return console.error(` Options: \n\t glunt INPUT/FILE/PATH > OUTPUT/FILE/PATH `);
}

(()=>{
    try {
        
        const i = process.argv[2];
        if( !i || !fs.existsSync(i) ) 
        return err(); glunt( i );

    } catch(e) { return err(); }
})();