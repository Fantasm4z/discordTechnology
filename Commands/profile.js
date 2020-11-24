import DiscordAPI from 'discord.js';

const command = {
    commandName: `profile`,
    description: `Obter perfil completo do usuário`,
    disabled: false,
    isAdminLvl: 1,
    exec ( msg, client, suffix ) {

        const memberMention = msg.mentions.members.first ( );
        const userMention = msg.mentions.users.first ( );

        if ( typeof ( userMention ) == 'undefined' )
            return msg.reply ( 'Usuário mencionado não encontrado.' );

        var embed = new DiscordAPI.MessageEmbed ( );
        embed.setColor ( 0x304ffe );
        embed.setThumbnail ( userMention.avatarURL ( ) );
        embed.addField ( 'Nick:', userMention.username );
        embed.addField ( 'Discriminador:', userMention.discriminator );
        embed.addField ( 'Criado em:', userMention.createdAt.toString( ) );
        embed.setAuthor( msg.author.username, msg.author.avatarURL ( ) );
        embed.setTimestamp ( );
        embed.setFooter ( `Discord Technology © 2020`, msg.guild.iconURL ( ) )
        
        msg.channel.send ( {embed} );

    }
};

export default command;