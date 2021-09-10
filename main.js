
/* 
	Xenial Bot  v1.0.0 - Experimental 
    Created by Lunar Lynix (https://github.com/lynixzenial)
															   */




const { Client, Collection, Intents, MessageActionRow, MessageButton, MessageSelectMenu  } = require('discord.js');
const { token, mongo_URI, client_id } = require('./config.json');
const fs = require('fs');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
});

/* Commands Management */
client.commands = new Collection();
const commands = [];

const commandFiles = fs
  .readdirSync('./commands')
  .map(folder =>
    fs
      .readdirSync(`./commands/${folder}`)
      .filter(file => file.endsWith('.js'))
      .map(file => `./commands/${folder}/${file}`)
  )
  .flat();

for (const file of commandFiles) {
  const command = require(`${file}`);
  if (Object.keys(command).length === 0) continue;
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(client_id), {
      body: commands
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();



client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('lynix', { type: 'WATCHING' });
});

/* Login to DiscordAPI v13 */
client.login(token);