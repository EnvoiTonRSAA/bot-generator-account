const discord = require('discord.js')
const {prefix,fourni_ROLE,token} = require('../config.json')
const fs = require('fs')
const r = require("sync-request")

module.exports = {
    name:"create",
run(client,message){
    let gay = 0
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
if(!args[1]) return message.channel.send('Veuillez donner un service à créer')
if(fs.existsSync(`./stocks/${args[1]}.txt`)) return message.channel.send('Le service donner est déjà existant !');
if(!message.member.roles.cache.some(role => role.id === fourni_ROLE[0]) && !message.member.roles.cache.some(role => role.id === fourni_ROLE[1])) return message.channel.send("Vous n'avez pas assez de permission pour faire cette commande")
fs.appendFile(`./stocks/${args[1]}.txt`,'',(err)=>{if(!err){message.channel.send(new discord.MessageEmbed().setDescription(`Le service **${args[1]}** créer avec succès`).setColor(0x303135))}else{message.channel.send(new discord.MessageEmbed().setTitle('Erreur Réssaye plus tard').setColor(0x303135))}})}}