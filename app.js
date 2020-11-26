import DiscordAPI from 'discord.js';
import dotenv from 'dotenv';
import messagesHandler from './Controller/messagesHandler.js';
import messagesUpdateHandler from './Controller/messagesUpdateHandler.js';
import loadCommands from './Controller/loadCommands.js';
import messagesDeleteHandler from './Controller/messagesDeleteHandler.js';
import serverLog from './Utils/serverLog.js';

const result = dotenv.config ( );
const client = new DiscordAPI.Client ( );
const oToken = process.env.DISCORD_TOKEN || '';

if ( result.error ) {
    throw result.error
}

client.commands = new DiscordAPI.Collection ( );
client.queue = new DiscordAPI.Collection ( );
loadCommands ( client );

client.on ( 'ready', ( ) => {

    client.user.setActivity ( 'Intel > Amd', { type: 'STREAMING', url: 'https://www.twitch.tv/giovanimkx' } );
    
    serverLog ( `Ready!`, 'green', true );

} );

client.on ( 'message', async (msg) => {
});

client.on ( 'message', msg => messagesHandler ( client, msg ) );
client.on ( 'messageUpdate', ( oldMsg, newMsg ) => messagesUpdateHandler ( client, oldMsg, newMsg ) );
client.on ( 'messageDelete', msg => messagesDeleteHandler ( client, msg ) );

client.login ( oToken );