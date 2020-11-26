import DiscordAPI from 'discord.js';

const command = {
    commandName: `ban`,
    description: `Ban mentioned server user`,
    disabled: false,
    type: 'moderation',
    isAdminLvl: 1,
    exec ( msg, client, suffix ) {

        const mentionedMember = msg.mentions.members.first ( ); /*|| msg.mentions.users.first ( );*/
        
        let contentArr = suffix.split ( '> ' );
        let messageContent = contentArr [ 1 ];
        let senderAvatar;

        if ( typeof ( mentionedMember ) == 'undefined' )
            return msg.reply ( 'Usuário mencionado não encontrado.' );

        if ( !msg.member.hasPermission ( 'BAN_MEMBERS' ) && !msg.guild.me.hasPermission ( 'BAN_MEMBERS' ) )
            return msg.reply ( 'Permissões inválidas para continuar...' );

        if ( mentionedMember.id === msg.author.id )
            return msg.reply ( 'Você não pode se banir né' );
            
        if ( mentionedMember.id === process.env.DEV_ID || mentionedMember.id === process.env.DEV_ID2 )
            return msg.reply ( 'Você não pode banir um desenvolvedor.' );

        if ( mentionedMember.hasPermission ( 'ADMINISTRATOR' ) || mentionedMember.hasPermission ( 'MANAGE_MESSAGES' )  )
            return msg.reply ( 'Você não pode banir um administrador.' );

        if ( typeof ( contentArr ) == 'undefined' || contentArr.length < 2 )
            return msg.reply ( 'Argumentos inválidos.' );

        mentionedMember.ban ( messageContent ).catch ( e => {
            if ( e ) return msg.reply ( 'Falha ao banir este usuário.' );
        } );

        senderAvatar = mentionedMember.user.avatarURL ( ) || mentionedMember.user.displayAvatarURL ( ) || `https://cdn.discordapp.com/avatars/${ mentionedMember.id }/${ mentionedMember.user.avatar }.png?size=512`;

        var embed = new DiscordAPI.MessageEmbed ( );
        embed.setColor ( 0xFF0000 );
        embed.setThumbnail ( senderAvatar );
        embed.addField ( 'Nick:', mentionedMember.user.username );
        embed.addField ( 'Discriminador:', mentionedMember.user.discriminator );
        embed.setTitle ( `Usuário foi banido!` );
        embed.setAuthor( msg.author.username, msg.author.avatarURL ( ) );
        embed.setTimestamp ( );
        embed.setFooter ( `Discord Technology © 2020`, msg.guild.iconURL ( ) )
        
        msg.channel.send ( {embed} );

    }
};

export default command;