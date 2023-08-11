const discord = require('discord.js');
const fs = require('fs');
const {token , prefix , gen_channels , VIP_NB , VIP_role} = require('../config.json')
const r = require('sync-request')
module.exports = {
    name:"gen",

    run(client,message){
        if(message.channel.id !== gen_channels[0] && message.channel.id !== gen_channels[1]) return message.channel.send(new discord.MessageEmbed().setColor(0x303135).setURL('https://discord.gg/2a5qyc3nZN').setTitle(`Mauvais salons textuel`).setDescription(`Les salons sont : <#${gen_channels[0]}> ou <#${gen_channels[1]}>`))
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const embednost = new discord.MessageEmbed().setTitle("Plus aucun stocks pour le service **"+args[1]+"**").setColor(0x303135)
            if(!fs.existsSync(`./stocks/${args[1]}.txt`)) return message.channel.send("Service introuvable dans le stocks ou n'existe pas")
        fs.readFile(`./stocks/${args[1]}.txt`,'utf-8',(err,data)=>{
            const acc_nb = data.split("\n")
                let verif = acc_nb.length-1
            if(verif < 1)return message.channel.send(embednost)
            if(verif < VIP_NB ){
                if(!message.member.roles.cache.some(role => role.id === VIP_role[0]) && !message.member.roles.cache.some(role => role.id === VIP_role[1]))
                    return message.channel.send(new discord.MessageEmbed().setColor(0x303135).setTitle(`Les stocks pour le service **${args[1]}** sont faible veuillez devenir VIP ou attendre un restock !`))
            }
            const spliteduserandpass = acc_nb[0].split(":")
            const newy = data.replace(`${acc_nb[0]}\n`,``)
            const embedprctagenfdp = new discord.MessageEmbed().setColor(0x303135).setTitle('Compte '+args[1]+' généré :').addField('**Email** :',` ${spliteduserandpass[0]}`).setURL('https://discord.gg/2a5qyc3nZN').addField('**Mot de passe** :',` ${spliteduserandpass[1]}`).setImage('https://cdn.discordapp.com/attachments/957605881359515719/959757202430758963/350kb.gif')
            fs.writeFile(`./stocks/${args[1]}.txt`,newy,(err)=>{if(err){console.log(err);message.channel.send('une erreur est survenue <@693431437474660402>')}})
            message.channel.send(new discord.MessageEmbed().setColor(0x303135).setTitle("Votre compte a été générer").setURL('https://discord.gg/2a5qyc3nZN').setDescription("J'ai envoyer votre compte **"+args[1]+" **en mp / *si vous n'avez rien reçu ouvrez juste vos dm*").setImage('https://cdn.discordapp.com/attachments/957605881359515719/959757202430758963/350kb.gif')).then(()=>{message.author.send(embedprctagenfdp).then(()=>{message.author.send(`\`\`${acc_nb[0]}\`\``)})})
        })
    }
}