const discord = require('discord.js')
const fs = require('fs')
const {owner_ROLE,token} = require('../config.json')
const r = require('sync-request')
module.exports = {
    name:'remove',
    run(client,message){
        const args = message.content.split(' ')
        
        if(!message.member.roles.cache.some(role => role.id === owner_ROLE[0]) && !message.member.roles.cache.some(role => role.id === owner_ROLE[1]))  return message.channel.send(new discord.MessageEmbed().setColor(0x303135).setTitle(`**Vous n'est pas autorisé à faire cela !**`))
            if(!fs.existsSync(`./stocks/${args[1]}.txt`)) return message.channel.send("**Le service n'existe pas !**")
            try{
                message.channel.send(`Suppression du service ${args[1]} éffectué avec succès !`)
        fs.unlinkSync(`./stocks/${args[1]}.txt`)
            }
            catch(err){
                if(err){
       return  message.channel.send(`Une erreur est survenue !`)
                }
                
}

 }
}