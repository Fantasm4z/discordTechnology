import DiscordAPI from 'discord.js';

const messagesUpdateHandler = ( client, oldMsg, newMsg ) => {

    if ( newMsg.author.id == client.user.id || !oldMsg || !newMsg ) return;

    let logChannel = newMsg.guild.channels.cache.find ( channel => channel.name === 'logs-bot' );

    if ( !logChannel ) return console.log ( `Fail on save updateHandler in logChannel...` );

    let logEmbed = new DiscordAPI.MessageEmbed ( )
        .setAuthor ( newMsg.author.tag, newMsg.author.avatarURL( ) )
        .setDescription ( `💬 | Hook Status: Edited message in ${oldMsg.channel}.` )
        .addField ( 'Before', oldMsg.content )
        .addField ('After', newMsg.content )
        .setTimestamp ( )
        .setFooter ( `Discord Technology © 2020`, newMsg.guild.iconURL ( ) )
        .setColor( 0x304ffe );

    logChannel.send ( logEmbed )
}

export default messagesUpdateHandler;