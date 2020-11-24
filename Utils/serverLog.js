import * as fs from 'fs';
import cor from 'colors';
import path from 'path';


const attachLog = ( text = '', color = '', showDate = false ) => {
    
    if ( !text ) return;
    if ( !color ) color = 'white';
    
    const logDate   = new Date ( );
    const logPath   = path.resolve ( `${ path.resolve ( ) }/Logs/LOG_${ logDate.getDate ( ) }.${ logDate.getMonth ( ) + 1 }.${ logDate.getFullYear ( ) }.csv` );
    
    let dateLog     = `${ logDate.getDate ( ) }/${ logDate.getMonth ( ) + 1 }/${ logDate.getFullYear ( ) }`;
    let hourLog     = `${ logDate.getHours ( ) }:${ logDate.getMinutes ( ) }:${ logDate.getSeconds ( ) }`;
    
    const preset    = cor.gray ( `[ * LOG ${ dateLog } - ${ hourLog } ] ` );
    const preset2   = `[ LOG ${ dateLog } - ${ hourLog } ] `;
    
    fs.appendFileSync( logPath, preset2 + text + "\n" );
    if ( !showDate ) return console.log( cor [ color ] ( text ) );
    if ( showDate ) return console.log( cor [ color ] ( preset + text ) );

}

export default attachLog;