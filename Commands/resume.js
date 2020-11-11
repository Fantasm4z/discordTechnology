
const command = {
    commandName: `resume`,
    description: `Resume music Playlist`,
    disabled: false,
    isAdminLvl: 1,
    exec ( msg, client, suffix ) {

        const serverQueue = msg.client.queue.get ( msg.guild.id );
		if ( serverQueue && !serverQueue.playing ) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume ( );
			return msg.channel.send('Resumi a Música!');
		}
		return message.channel.send('Não estou tocando nada agora!');
        
    }
};

export default command;