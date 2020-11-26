import pagination from 'discord.js-pagination';
import DiscordAPI from 'discord.js';

const command = {
    commandName: `help`,
    description: `Get all commands`,
    disabled: false,
    isAdminLvl: 0,
    async exec ( msg, client, suffix ) {

        const musicCommands = new DiscordAPI.MessageEmbed ( );
        musicCommands.setTitle ( `Music's` );
        musicCommands.setTimestamp ( )

        const memesCommands = new DiscordAPI.MessageEmbed ( );
        memesCommands.setTitle ( `Meme's` );
        memesCommands.setTimestamp ( );

        const moderationCmd = new DiscordAPI.MessageEmbed ( );
        moderationCmd.setTitle ( `Moderation's` );
        moderationCmd.setTimestamp ( );

        for ( const cmd of client.commands ) {

            console.log ( cmd [ 1 ].commandName );
            
            switch ( cmd [ 1 ].type ) {
                case 'music':
                    musicCommands.addField ( `./${ cmd [ 1 ].commandName }` );
                    break;

                case 'fun':
                    memesCommands.addField ( `./${ cmd [ 1 ].commandName }` );
                    break;

                case 'moderation':
                    moderationCmd.addField ( `./${ cmd [ 1 ].commandName }` );
                    break;
            }
            
        }

        pagination ( msg, [ musicCommands, memesCommands, moderationCmd ], [ "⏪", "⏩" ], 120000 );
    }
};

export default command;