import DiscordAPI from 'discord.js';

const messagesDeleteHandler = ( client, delMsg ) => {

    if ( delMsg.author.id == client.user.id || !delMsg ) return;

    let logChannel = delMsg.guild.channels.cache.find ( channel => channel.name === 'logs-bot' );

    if ( !logChannel ) return console.log ( `Fail on save deleteHandler in logChannel...` );

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