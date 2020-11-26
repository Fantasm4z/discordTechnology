import { Util } from 'discord.js';
//import ytdl from 'ytdl-core'; issue on play random-ly music...
import ytdl from 'ytdl-core-discord';
import yts from 'yt-search';
import serverLog from '../Utils/serverLog.js';

const command = {
    commandName: `play`,
    description: `Play music on voice channel`,
	disabled: false,
	type: 'music',
    isAdminLvl: 0,
    async exec ( msg, client, suffix ) {

        var linkRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g.test ( suffix );

        if ( !linkRegex ) {

            var searched = await yts.search ( suffix );

            if(searched.videos.length === 0) return msg.reply ( `Link/Música não encontrada.` );
            suffix = searched.videos [ 0 ].url;

        }

        const { channel } = msg.member.voice;
		if ( !channel ) return msg.channel.send ( 'I\'m sorry but you need to be in a voice channel to play music!' );
		const permissions = channel.permissionsFor ( msg.client.user );
		if (!permissions.has('CONNECT')) return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');

		const serverQueue = msg.client.queue.get ( msg.guild.id );
        
		const songInfo = await ytdl.getInfo ( suffix.replace ( /<(.+)>/g, '$1' ) );
        
        const song = {
			id: songInfo.videoDetails.videoId,
			title: Util.escapeMarkdown ( songInfo.videoDetails.title ),
			url: songInfo.videoDetails.video_url
		};
		
		serverLog ( `Song Queue -> ${ song.title }`, 'magenta', true );

        if ( serverQueue ) {
			serverQueue.songs.push ( song );
			//console.log ( `Adicionado na queue: ${song.title}` );
			return msg.channel.send(`✅ **${song.title}** foi adicionado na playlist!`);
		}

		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: channel,
			connection: null,
			songs: [ ],
			volume: 0.25,
			playing: true
		};
		msg.client.queue.set ( msg.guild.id, queueConstruct );
		queueConstruct.songs.push ( song );
        
        const play = async ( song ) => {
			const queue = msg.client.queue.get ( msg.guild.id );

			if ( !song ) {
				msg.reply ( 'I Cannot play this sound.' );
				queue.voiceChannel.leave ( );
				msg.client.queue.delete ( msg.guild.id );
				return;
			}

			let streamer = await ytdl ( song.url, { highWaterMark: 1 << 25 } );

			const dispatcher = queue.connection.play ( streamer, { type: 'opus' } )
				.on( 'finish', ( ) => {
					queue.songs.shift ( );
					play ( queue.songs [ 0 ] );
				})
				.on( 'error', error => console.error ( error ) );
			dispatcher.setVolumeLogarithmic ( queue.volume / 5 );
			queue.textChannel.send ( `🎶 Agora estou tocando **${song.title}**` );
		};
		
        try {
			const connection = await channel.join ( );
			queueConstruct.connection = connection;
			play ( queueConstruct.songs [ 0 ] );
		} catch ( error ) {
			console.error ( `Erro ao tocar: ${error}` );
			msg.client.queue.delete ( msg.guild.id );
			await channel.leave ( );
			return msg.channel.send ( `Falha ao tocar a música.` );
		}
        
    }
};

export default command;