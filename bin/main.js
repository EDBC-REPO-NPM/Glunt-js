#!/usr/bin/env node
    
const glunt = require('../main');
const fs = require('fs');

function err(){ return console.error(
    `Options: \n\t glunt INPUT/FILE/PATH > OUTPUT/FILE/PATH`
)}

(()=>{
    try {
        
        const arg = process.argv.slice(2);
        process.env.TERMINAL = true;

        if( !arg || !fs.existsSync(arg[0]) ) 
            return err(); glunt( ...arg );

    } catch(e) { return err(); }
})();