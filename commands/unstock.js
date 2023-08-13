const discord = require(`discord.js`)
const {token ,prefix,owner_ROLE} = require('../config.json')
const r = require('sync-request')
const fs = require('fs')
module.exports = {
    name:"unstock",
    run(client,message){
        const letructounstock = message.content.split(" ")
        if(!letructounstock[1]) return message.channel.send('Veuillez donner un service à unstock ')
        if(!message.member.roles.cache.some(role => role.id === owner_ROLE[0]) && !message.member.roles.cache.some(role => role.id === owner_ROLE[1])) return message.channel.send(new discord.RichEmbed().setColor(0x303135).setTitle(`Manque de permission ❌`).setDescription(`Vous n'est pas autorisé à faire cela !`))
        if(!fs.existsSync(`./stocks/${letructounstock[1]}.txt`)) return message.channel.send('*Je ne peut pas unstock ce qui n\'existe pas !*')
            fs.writeFileSync(`./stocks/${letructounstock[1]}.txt`,'',(e)=>{})
            message.channel.send('Unstock du service effectué')
        
    }
}