import DiscordAPI from 'discord.js';
import serverLog from '../Utils/serverLog.js';

const messagesDeleteHandler = ( client, delMsg ) => {

    if ( delMsg.author.id == client.user.id || !delMsg ) return;

    if ( delMsg.content.includes ( './fake' ) ) return;

    let logChannel = delMsg.guild.channels.cache.find ( channel => channel.name === 'logs-bot' );

    if ( !logChannel ) return serverLog ( `Fail on save deleteHandler in logChannel...`, 'red', true );

    if ( !delMsg.content ) return serverLog ( `Fail on save deleteHandler by msg.content!`, 'red', true );

    let logEmbed = new DiscordAPI.MessageEmbed ( )
        .setAuthor ( delMsg.author.tag, delMsg.author.avatarURL( ) )
        .setDescription ( `💬 | Hook Status: Deleted message in ${delMsg.channel}.` )
        .addField ( 'Message', delMsg.content )
        .setTimestamp ( )
        .setFooter ( `Discord Technology © 2020`, delMsg.guild.iconURL ( ) )
        .setColor( 0x304ffe );

    logChannel.send ( logEmbed )
}

export default messagesDeleteHandler;