import DiscordAPI from 'discord.js';
import dotenv from 'dotenv';
import messagesHandler from './Controller/messagesHandler.js';

const result = dotenv.config ( );
const client = new DiscordAPI.Client ( );
const oToken = process.env.DISCORD_TOKEN || '';

if ( result.error ) {
    throw result.error
}

client.on ( 'ready', ( ) => {

    console.log ( ` [ Ready! ] - Logged in` );

} );

client.on ( 'message', msg => messagesHandler ( client, msg ) );

client.login ( oToken );