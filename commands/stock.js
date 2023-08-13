const discord = require('discord.js')
const {prefix , avatar} = require('../config.json')
const fs = require('fs')
const pagination = require('discord.js-pagination');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name:"stock",
    run(client, message){
        let stacked = ``
        let nbserv = 0
        let totalembed = 0
        let embednow = 0

        var embed0 = new MessageEmbed()
        .setColor(0x303135)
        .setTitle('Stocks Disponible :')
        .setURL('https://discord.gg/2a5qyc3nZN')
        .setTimestamp()
        .setImage(avatar)

        var embed1 = new MessageEmbed()
        .setColor(0x303135)
        .setTitle('Stocks Disponible :')
        .setURL('https://discord.gg/2a5qyc3nZN')
        .setTimestamp()
        .setImage(avatar)

        var embed2 = new MessageEmbed()
        .setColor(0x303135)
        .setTitle('Stocks Disponible :')
        .setURL('https://discord.gg/2a5qyc3nZN')
        .setTimestamp()
        .setImage(avatar)

        var embed3 = new MessageEmbed()
        .setColor(0x303135)
        .setTitle('Stocks Disponible :')
        .setURL('https://discord.gg/2a5qyc3nZN')
        .setTimestamp()
        .setImage(avatar)

       fs.readdir('./stocks/',(err,file)=>{
        
        let total = file.length
        if(total ===0 ) return message.channel.send("Aucun stock disponible")
       file.forEach( truc => {

        fs.readFile(`./stocks/${truc}`,'utf8',(err,data)=>{

            const info = data.split('\n').length -1
            nbserv += 1
            if(info > 0){
                if(embed0.fields.length < 25){
            embed0.addField(`\`\`${truc.split('.')[0]} :\`\``,`**${info}** comptes`,true)
        }else if(embed1.fields.length < 25){
            embed1.addField(`\`\`${truc.split('.')[0]} :\`\``,`**${info}** comptes`,true)
        }else if(embed2.fields.length < 25){
            embed2.addField(`\`\`${truc.split('.')[0]} :\`\``,`**${info}** comptes`,true)
        }
        else if(embed3.fields.length < 25){
            embed3.addField(`\`\`${truc.split('.')[0]} :\`\``,`**${info}** comptes`,true)
        }
}
            if(total === nbserv){
                console.log(embed0.fields)
                if(!embed0.fields[0]){
                 return message.channel.send("Aucun stocks disponible !")
                }
                const pages = [
                    embed0,
                    embed1,
                    embed2,
                    embed3
                    ]
                    const timeout = '100000000';
                    const emojiList = ["◀", "▶"];
            pagination(message, pages, emojiList, timeout)
                //message.channel.send({embeds:[embed0]})
            }
        })
        
    })
})






}}