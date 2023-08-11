const discord = require('discord.js')
const {prefix, avatar} = require('../config.json')
const pagination = require('discord.js-pagination');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
module.exports = {
    name:"help",
    run(client, message){


        var embed0 = new MessageEmbed()
        .setColor(0x303135)
        .setTitle('help for generator user')
        .addField(`\`\`${prefix}gen\`\``,`générer un compte`,true)
        .addField(`\`\`${prefix}stock\`\``,`Vérifier les stocks`,false)
        .setURL('https://discord.gg/2a5qyc3nZN')
        .setTimestamp()
        .setImage(avatar)

        var embed1 = new MessageEmbed()
        .setColor(0x303135)
        .setTitle('help for generator admin')
        .addField(`\`\`${prefix}create\`\``,`Créer un nouveau service`,true)
        .addField(`\`\`${prefix}restock\`\``,`Restock des comptes`,true)
        .addField(`\`\`${prefix}unstock\`\``,`Retiré l'entière des stocks d'un service`,true)
        .addField(`\`\`${prefix}remove\`\``,`Retiré le service des stocks`,false)
        .setURL('https://discord.gg/2a5qyc3nZN')
        .setTimestamp()
        .setImage(avatar)

        var embed2 = new MessageEmbed()
        .setColor(0x303135)
        .setTitle('other commands')
        .addField(`\`\`${prefix}ping\`\``,`permet de voir la latence du bot`,false)
        .setURL('https://discord.gg/2a5qyc3nZN')
        .setTimestamp()
        .setImage(avatar)


              const pages = [
                    embed0,
                    embed1,
                    embed2
                    ]
                    const timeout = '100000000';
                    const emojiList = ["◀", "▶"];
            pagination(message, pages, emojiList, timeout)
                //message.channel.send({embeds:[embed0]})
            
        
    
}}