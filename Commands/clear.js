import Canvas from 'canvas';
import DiscordAPI from 'discord.js';

const command = {
    commandName: `clear`,
    description: `clear channel messages by args`,
    disabled: false,
    isAdminLvl: 1,
    async exec ( msg, client, suffix ) {

        if ( isNaN ( suffix ) ) return msg.reply ( 'Insira um número válido.' );
        if ( parseInt ( suffix ).length <= 0 ) return msg.reply ( 'Insira uma quantidade a ser deletada.' );
        if ( parseInt ( suffix ) > 125 ) return msg.reply ( 'Quantidade muito grande de mensagens.' );
        if ( !msg.guild.me.hasPermission ( `MANAGE_MESSAGES` ) ) return msg.reply ( 'Não tenho permissão para isso.' );

        msg.channel.bulkDelete ( suffix ).then ( deleted => {
            var embed = new DiscordAPI.MessageEmbed ( );
			embed.setColor ( 0x00ff70 );
			embed.setTitle( 'Limpeza Solicitada!' );
            embed.setAuthor ( msg.author.username, msg.author.avatarURL ( ) );
            embed.setThumbnail ( msg.author.avatarURL ( ) );
			embed.setTimestamp ( );
			embed.setDescription ( `Limpeza concluída com êxito!` );
			embed.setFooter ( `Discord Technology © 2020`, msg.guild.iconURL ( ) );
			msg.channel.send ( {embed} )
        } );
    }
};

export default command;