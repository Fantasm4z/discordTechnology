
const command = {
    commandName: `ping`,
    description: `Ping Pong Game`,
    disabled: false,
    isAdminLvl: 0,
    exec ( msg, client, suffix ) {

        // Custom CodeHub Emoji
        //
        const vinDiesel = client.emojis.cache.get ( '704808448155451434' );
        
        msg.channel.send( `Pingando... ${ vinDiesel }` ).then ( async ( message ) => {
            //message.delete ( )
            message.edit ( `Ping: **${ message.createdTimestamp - msg.createdTimestamp }ms**.\nPing REST-API: **${ Math.round ( client.ws.ping ) }ms**` );
        });

    }
};

export default command;