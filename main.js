
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu  } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isButton()) {
		console.log(interaction);
		await interaction.reply('Hellooo!');
	}

	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('I am alive, pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('Nothing here yet.');
	} else if (commandName === 'sergal') {
		const button = new MessageButton()
		.setCustomId('primary')
		.setLabel('This is a sergal')
		.setStyle('PRIMARY')
		.setEmoji('885331362142371890');

		const row = new MessageActionRow()
		.addComponents(
			button
		);

		await interaction.reply({ content: 'I heard that you like sergals!', components: [row] });
	}
});

client.login(token);