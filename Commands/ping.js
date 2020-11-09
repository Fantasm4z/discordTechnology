
const command = {
    commandName: `ping`,
    description: `Ping Pong Game`,
    isAdminLvl: 0,
    exec ( msg, client, suffix ) {
        return msg.reply ( 'Pong!' );
    }
};

export default command;