const pack = require('./main');
const path = require('path');
    
pack( path.join(__dirname,'test','main.css') )
.then(x=>{
    x.on('data',(chunk)=>{
        console.log(chunk.toString())
    })
    x.on('end',()=>{
        console.log('closed')
    })
}).catch(x=>{
    console.log(x)
});