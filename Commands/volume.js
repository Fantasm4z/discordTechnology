
const command = {
    commandName: `volume`,
    description: `Set volume to voice channel`,
    disabled: false,
    isAdminLvl: 2,
    exec ( msg, client, suffix ) {

        const { channel } = msg.member.voice;
		if ( !channel ) return msg.channel.send ( 'Você precisa estar no canal de voz para utilizar.' );
		const serverQueue = msg.client.queue.get ( msg.guild.id );
		if ( !serverQueue ) return msg.channel.send ( 'Não estou tocando nada agora!' );
		if ( !suffix ) return msg.channel.send ( `Volume: **${serverQueue.volume}**` );
		serverQueue.volume = suffix;
		serverQueue.connection.dispatcher.setVolumeLogarithmic ( suffix / 5 );
        return msg.channel.send ( `Volume setado para **${suffix}**`);
        
    }
};

export default command;