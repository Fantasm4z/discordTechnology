import Canvas from 'canvas';
import DiscordAPI from 'discord.js';

const command = {
    commandName: `fake`,
    description: `Create a fake message by canvas`,
    disabled: false,
    isAdminLvl: 1,
    async exec ( msg, client, suffix ) {

        const userMention = msg.mentions.users.first ( );
        const memberMention = msg.mentions.members.first ( );

        if ( typeof ( userMention ) == 'undefined' )
            return msg.reply ( 'Usuário mencionado não encontrado.' );
        
        let senderUsername = memberMention.nickname || userMention.username;
        let senderAvatar;
        let contentArr = suffix.split ( '> ' );
        let messageContent = contentArr [ 1 ];

        if ( userMention.avatar == null ) senderAvatar = userMention.displayAvatarURL ( );
        if ( userMention.avatar != null ) senderAvatar = `https://cdn.discordapp.com/avatars/${ userMention.id }/${userMention.avatar}.png?size=512`;

        if ( typeof ( contentArr ) == 'undefined' || contentArr.length < 2 )
            return msg.reply ( 'Argumentos inválidos.' );

        await msg.delete ( );

        if ( userMention.id == '469245017530302494' )
            return msg.reply ( 'User full machined, da n famia' );

        const canvas = Canvas.createCanvas ( 1500, 250 );
        const ctx = canvas.getContext ( '2d' );
        ctx.fillStyle = '#36393f';
        ctx.fillRect( 0, 0, canvas.width, canvas.height );

        ctx.font = '75px Whitney';
        ctx.fillStyle = memberMention.displayHexColor;
        ctx.textBaseline = 'top';

        ctx.fillText ( senderUsername, 300, 20 );

        ctx.font = '70px Whitney';
        ctx.fillStyle = '#dcddde';
        ctx.textBaseline = 'top';

        ctx.fillText ( messageContent, 300, 120 );

        ctx.beginPath ( );
        ctx.arc ( 125, 125, 100, 0, Math.PI * 2, true );
        ctx.closePath ( );
        ctx.clip ( );

        const avatar = await Canvas.loadImage ( senderAvatar );
        ctx.drawImage ( avatar, 25, 25, 200, 200 );

        const attachment = new DiscordAPI.MessageAttachment (
        canvas.toBuffer ( ),
        'fakemessage.png'
        );
        
        msg.channel.send ( attachment );

    }
};

export default command;