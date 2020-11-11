
const command = {
    commandName: `stop`,
    description: `Stop music Playlist`,
    disabled: false,
    isAdminLvl: 2,
    exec ( msg, client, suffix ) {

        const { channel } = msg.member.voice;
		if ( !channel ) return msg.channel.send( 'Você precisa estar no canal de voz para utilizar.' );
		const serverQueue = msg.client.queue.get ( msg.guild.id );
		if ( !serverQueue ) return msg.channel.send ( 'Não estou tocando nada agora!' );
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end ( 'Já parei a música!' );
        
    }
};

export default command;