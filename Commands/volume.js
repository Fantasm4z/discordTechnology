
const command = {
    commandName: `volume`,
    description: `Set volume to voice channel`,
    disabled: false,
    type: 'music',
    isAdminLvl: 2,
    exec ( msg, client, suffix ) {

        const { channel } = msg.member.voice;
		if ( !channel ) return msg.channel.send ( 'Você precisa estar no canal de voz para utilizar.' );
		const serverQueue = msg.client.queue.get ( msg.guild.id );
		if ( !serverQueue ) return msg.channel.send ( 'Não estou tocando nada agora!' );
        if ( !suffix ) return msg.channel.send ( `Volume: **${serverQueue.volume}**` );
        if ( parseFloat ( suffix ) > 5.0 || parseFloat ( suffix ) <= 0 ) return msg.reply ( 'Valor de volume inválido. ( 0.0, 5.0' );
		serverQueue.volume = suffix;
		serverQueue.connection.dispatcher.setVolumeLogarithmic ( suffix / 5 );
        return msg.channel.send ( `Volume setado para **${suffix}**`);
        
    }
};

export default command;