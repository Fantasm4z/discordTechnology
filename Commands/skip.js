
const command = {
    commandName: `skip`,
    description: `Skip Music`,
    disabled: false,
    isAdminLvl: 1,
    exec ( msg, client, suffix ) {

        const { channel } = msg.member.voice;
		if ( !channel ) return msg.channel.send ( 'Você precisa estar no canal de voz para utilizar.' );
		const serverQueue = msg.client.queue.get ( msg.guild.id );
		if (!serverQueue) return msg.channel.send ( 'Não estou tocando nada agora!' );
        serverQueue.connection.dispatcher.end ( 'Pulei a música!' );
        
    }
};

export default command;