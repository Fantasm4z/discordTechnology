
const checkUserPrivilegies = ( client, msg, level = 0 ) => {
    switch ( level ) {
        case 0: // User
            return true;
            break;
        case 1: // Administrador
            const role = msg.guild.roles.cache.find ( role => role.name === 'Administrador' );
            return msg.member.roles.cache.has ( role.id );
        case 2: // Bot Developer
            return msg.author.id === process.env.DEV_ID;
        default:
            return false;
    }
}

export default checkUserPrivilegies;