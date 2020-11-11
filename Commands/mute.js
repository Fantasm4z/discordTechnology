
const command = {
    commandName: `mute`,
    description: `Mute members`,
    disabled: false,
    isAdminLvl: 1,
    exec ( msg, client, suffix ) {

        const usuario = msg.guild.member ( msg.mentions.users.first ( ) );

        if( !usuario ) return msg.reply( 'Mencione um usuário à ser silenciado.' );
        
        let mutedId = msg.guild.roles.cache.find ( role => role.name === 'Silenciado' );
        let memberId = msg.guild.roles.cache.find ( role => role.name === 'Membro' );
        let ifHasMuted = usuario.roles.cache.get( mutedId.id );
        let ifHasMember = usuario.roles.cache.get( memberId.id );
                
        if( !ifHasMuted && ifHasMember ){
			usuario.roles.remove ( memberId.id );
			usuario.roles.add ( mutedId.id );
			msg.reply( 'Mutado!' );
		}else if( !ifHasMuted && !ifHasMember ){
			usuario.roles.add( mutedId.id );
			msg.reply( 'Mutado!' );
		}else if( ifHasMuted ) {
			usuario.roles.add( memberId.id );
			usuario.roles.remove( mutedId.id );
			msg.reply( 'Removido!' );
		}

    }
};

export default command;