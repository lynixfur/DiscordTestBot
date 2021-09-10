
/* 
	Xenial Bot  v1.0.0 - Experimental 
    Created by Lunar Lynix (https://github.com/lynixzenial)
															   */




const { Client, Collection, Intents, MessageActionRow, MessageButton, MessageSelectMenu  } = require('discord.js');
const { token, mongo_URI, client_id } = require('./config.json');

const rest = new REST({ version: '9' }).setToken(token);

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
});


Bot.once('ready', () => {
	console.log('Ready!');

	Bot.user.setPresence({
        status: "dnd",
        activity: {
            name: 'Sergals!',
            type: "WATCHING"
        }
    });
});

Bot.on('interactionCreate', async interaction => {
	const Command = Commands.get(interaction.data.name) || Commands.find(e => e.usages.some(a => a === interaction.data.name));
	if(!Command || (!Command.enabled || Command.enabled != true)) return;
	if(Command.required_perm != 0 && Command.required_perm.length && !Bot.hasPermission(interaction.member, Command.required_perm)) return await Bot.say(interaction, `You must have a \`${Command.required_perm.toUpperCase()}\` permission to use this command!`)
	const Guild = Bot.guilds.cache.get(interaction.guild_id);
	const Member = Guild.member(interaction.member.user.id);
	return Command.run(interaction, Guild, Member, interaction.data.options);
});

Bot.login(token);