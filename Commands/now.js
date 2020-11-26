
const command = {
    commandName: `now`,
    description: `Now Playing`,
    disabled: false,
    type: 'music',
    isAdminLvl: 0,
    exec ( msg, client, suffix ) {

        const serverQueue = msg.client.queue.get ( msg.guild.id );
		if ( !serverQueue ) return msg.channel.send ( 'Não estou tocando nada agora!' );
        return msg.channel.send (`🎶 Agora estou tocando **${ serverQueue.songs[0].title }**`);
        
    }
};

export default command;