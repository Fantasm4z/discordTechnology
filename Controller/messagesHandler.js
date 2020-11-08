import commandsObject from '../Commands/commandsObject';

const messagesHandler = ( client, msg ) => {
    
    if ( msg.author.id != client.user.id && ( msg.content.startsWith ( `./` ) && msg.channel.type != 'dm' ) ){
        
        var command = msg.content.split ( ' ' ) [ 0 ].substring ( 2 );
        var suffix  = msg.content.substring ( command.length + 3 );

        if ( msg.mentions.has ( client.user.id ) )
			return msg.reply ( 'n entendi paiero ?' );
        
        
    }

}

export default messagesHandler;