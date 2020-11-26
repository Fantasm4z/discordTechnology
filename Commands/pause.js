
const command = {
    commandName: `pause`,
    description: `Pause Music`,
    disabled: false,
    type: 'music',
    isAdminLvl: 2,
    exec ( msg, client, suffix ) {

        const serverQueue = msg.client.queue.get ( msg.guild.id );
		if ( serverQueue && serverQueue.playing ) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause ( );
			return msg.channel.send ('Pausei a música!');
		}
		return msg.channel.send ( 'Não estou tocando nada agora!' );
        
    }
};

export default command;