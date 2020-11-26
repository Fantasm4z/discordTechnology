
const command = {
    commandName: `queue`,
    description: `List Music's Queue`,
    disabled: false,
    type: 'music',
    isAdminLvl: 0,
    exec ( msg, client, suffix ) {

        const serverQueue = msg.client.queue.get ( msg.guild.id );
		if ( !serverQueue ) return msg.channel.send('Não estou tocando nada agora!');
		return msg.channel.send(`__**Song queue:**__\n${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}\n**Tocando Agora:** ${serverQueue.songs[0].title}`);
        
    }
};

export default command;