import DiscordAPI from 'discord.js';
import messagesHandler from './Controller/messagesHandler.js';

const client = new DiscordAPI.Client ( );

client.on ( 'ready', ( ) => {

    console.log ( ` [ Ready! ] - Logged in` );

} );

client.on ( 'message', msg => messagesHandler ( client, msg ) );

client.login ( 'NzAyNjI1MTQ0NzgyNDU0ODc0.XqCwqA.3h0mPkv2Ct01phvU1lYmfN85dCg' );