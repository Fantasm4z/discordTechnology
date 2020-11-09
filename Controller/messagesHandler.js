
const messagesHandler = ( client, msg ) => {
    
    if ( msg.author.id != client.user.id && ( msg.content.startsWith ( `./` ) && msg.channel.type != 'dm' ) ){
        
        var command = msg.content.split ( ' ' ) [ 0 ].substring ( 2 );
        var suffix  = msg.content.substring ( command.length + 3 );

        if ( msg.mentions.has ( client.user.id ) )
			return msg.reply ( 'n entendi paiero ?' );
        
        const collectCommand = client.commands.get( command );

        if ( typeof ( collectCommand ) != 'undefined' ) {
            collectCommand.exec ( msg, client, suffix );
        } else {
            return msg.reply ( 'Comando não encontrado.' );
        }
        
    }

}

export default messagesHandler;