const { Client, Intents } = require('discord.js');
const Discord = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { token, prefix , log_channel} = require('./config.json');

const { readdirSync } = require('fs');

const { join } = require('path');

const config = require('./config.json');
client.config = config;


client.commands= new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    client.user.setActivity(config.activity)
    console.clear();
    console.log(`Bot Online`);
    console.log("Bot Prefix is:", config.prefix)
    console.log("Logged in as:", client.user.tag)
    console.log("discord : envoitonrsa")
    console.log("https://discord.gg/2a5qyc3nZN")
});


client.on("message", async message => {
    if(message.channel.id === config.channel_ping){
      //  message.react(config.emote)
        message.react("✔️")
    }
    if(message.author.bot) return;
    if(message.content.startsWith(prefix)) {
        const command = message.content
        .toLowerCase()
        .slice(prefix.length)
        .split(" ")[0];
        if(log_channel !== null){
        client.channels.get(log_channel).send(message.content)
        }
        if(!client.commands.has(command)) return;
        try {
            client.commands.get(command).run(client, message );

        } catch (error){
            console.error(error);
        }
    }
})

client.login(token);
