const { Buffer } = require('buffer');
const path = require('path');
const fs = require('fs');

let _dir;

function Component( dir ){
  dir = path.join(_dir,dir);
  dir = path.normalize(dir);
  return fs.readFileSync(dir);
}

function matchScript( data ){
  const index = [0,0];
  const result = new Array(); 
  Array.from(data).map((x,i)=>{
         if((/\/\°/i).test(data[i]+data[i+1])) index[0] = i;
    else if((/\°\//i).test(data[i]+data[i+1])){
        index[1] = i+2; result.push(
          data.slice( index[0],index[1] )
        );
    }
  }); return result;
}

async function compile( data ){
    
  const style = matchScript(data) || [];
  const loadr = data.match(/\<\°[^°]+\°\>/gi) || [];
  if( !style.length && !loadr.length ) return data;

  for( var i in style ){ const item = style[i];
    try {
      const path = item.replace(/\/\°|\°\//gi,'');
      data = data.replace( item,eval(path)||'');
    } catch(e) {
      const error = `/* something went wrong: ${e} */`;
      data = data.replace( item,error );
      console.log(e);
    }
  }

  for( var i in loadr ){ const item = loadr[i];
    try {
      const raw = item.replace(/\<\°|\°\>| /gi,'');
	  	data = data.replace( item,Component( raw ) );
    } catch(e) {
      const error = `/* something went wrong: ${e} */`;
      data = data.replace( item,error );
      console.log(e);
    }
  }
    
  return compile( data );
}

module.exports = ( raw,dir )=>{
  return new Promise(async(response,reject)=>{ _dir=dir;
    
    const arr = new Array(); const data = raw.toString();
    const style = data.match(/\/\°|\°\/|\<\°|\°\>/gi) || [];

    if( style.length >= 1 )
         arr.push( Buffer.from(await compile( data )) );
    else arr.push( raw );

    return response( arr[0] );
    
  });
};