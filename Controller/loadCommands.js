import * as fs from 'fs';

const loadCommands = async ( client ) => {

    try {
        const commandFiles = fs.readdirSync ( './Commands' ).filter ( file => file.endsWith ( '.js' ) );

        for ( const file of commandFiles ) {
            const command = await import ( `../Commands/${ file }` );
            client.commands.set ( command.default.commandName, command.default );
            console.log ( `Loaded ${ command.default.commandName }` );
        }
    } catch ( e ) {
        console.error ( e );
        process.exit ( );
    }

    console.log ( `All commands have been loaded.` );
}

export default loadCommands;