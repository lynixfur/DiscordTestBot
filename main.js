
const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu  } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('I am alive, pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('Nothing here yet.');
	} else if (commandName === 'sergal') {
		const row = new MessageActionRow()
		.addComponents(
			new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.addOptions([
					{
						label: 'Select me',
						description: 'This is a description',
						value: 'first_option',
					},
					{
						label: 'You can select me too',
						description: 'This is also a description',
						value: 'second_option',
					},
				]),
		);

		await interaction.reply({ content: 'Sergals are fun! https://discord.gg/ArS5C9qn, Ooooo Sergal Button!', components: [row] });
	}
});

client.login(token);