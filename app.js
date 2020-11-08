import DiscordAPI from 'discord.js';
import dotenv from 'dotenv';
import messagesHandler from './Controller/messagesHandler.js';

dotenv.config ( );

const client = new DiscordAPI.Client ( );

client.on ( 'ready', ( ) => {

    console.log ( ` [ Ready! ] - Logged in` );

} );

client.on ( 'message', msg => messagesHandler ( client, msg ) );

client.login ( '' );