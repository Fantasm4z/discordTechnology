import DiscordAPI from 'discord.js';

let commandUsed = false;

const command = {
    commandName: `skip`,
    description: `Skip Music`,
    disabled: false,
    isAdminLvl: 1,
    async exec ( msg, client, suffix ) {

        const { channel } = msg.member.voice;
		if ( !channel ) return msg.channel.send ( 'Você precisa estar no canal de voz para utilizar.' );
		const serverQueue = msg.client.queue.get ( msg.guild.id );
		if (!serverQueue) return msg.channel.send ( 'Não estou tocando nada agora!' );
        //serverQueue.connection.dispatcher.end ( 'Pulei a música!' );

        const members = channel.members.filter ( m => !m.user.bot );
        if ( members.size === 1 ) {
            serverQueue.connection.dispatcher.end ( 'Pulei a música!' );
        } else {
            
            if ( !commandUsed ) {

                commandUsed = true;

                const votesRequired = Math.ceil ( members.size * .6 );
                const embed = new DiscordAPI.MessageEmbed ( )
                    .setDescription ( `Precisamos de ${votesRequired} votos para continuar...` );
                const awMsg = await msg.channel.send ( embed );
                await awMsg.react ( '👍' );
                await awMsg.react ( '👎' );

                const filter = ( reaction, user ) => {
                    if ( user.bot ) return false;
                    const { channel } = msg.guild.members.cache.get ( user.id ).voice;
                    if ( channel ) {
                        if ( channel.id === serverQueue.voiceChannel.id ) {
                            return ['👍'].includes(reaction.emoji.name);
                        }
                        return false;
                    } else {
                        return false;
                    }
                }

                try {
                    const reactions = await awMsg.awaitReactions(filter, { max: votesRequired, time: 10000, errors: ['time'] });
                    const totalVotes = reactions.get('👍').users.cache.filter(u => !u.bot);
                    console.log ( totalVotes );
                    if (totalVotes.size >= votesRequired) {
                        
                        serverQueue.connection.dispatcher.end ( 'Pulei a música!' );
                        commandUsed = false;
                    }
                } catch (err) {
                    //console.log(err);
                    commandUsed = false;
                }

            } else {
                msg.channel.send ( 'Já estou aguardando as reações.' );
            }

        }
        
    }
};

export default command;