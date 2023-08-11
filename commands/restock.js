const discord = require('discord.js')
const {prefix,fourni_ROLE,token,emote,ping_role,channel_ping , webhook,avatar,name} = require('../config.json')
const fs = require('fs')
const r = require("sync-request")
module.exports = {
    name:"restock",
    run(client , message){
        let zizi = 0
        let restocked = 0
	
        if(!message.member.roles.cache.some(role => role.id === fourni_ROLE[0]) && !message.member.roles.cache.some(role => role.id === fourni_ROLE[1])) return message.channel.send("Vous n'avez pas la permissions de faire cela")
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const file = message.attachments.first()?.url
        if(!args[1]) return message.channel.send("Veuillez donner un service à restock")
        if(!fs.existsSync(`./stocks/${args[1]}.txt`)) return message.channel.send("Service introuvable dans le stock")
        if(!file){
            return message.channel.send("ce bot ne prend que les fichier txt")
            
        }
    
            const b = r("GET",file).getBody('utf8')
            const sp = b.split("\n")
            fs.readFile(`./stocks/${args[1]}.txt`,'utf8',(err,data)=>{
                const truced = data.split('\n')
                truced.forEach(()=>{
                    zizi += 1
                })
            sp.forEach(acc => {
                    if(zizi < 1 ){
                        fs.writeFileSync(`./stocks/${args[1]}.txt`,`${acc}\n`)
                    }
                const splitmdp = acc.split(":")
                if(splitmdp[1] !== undefined){
                    restocked += 1
                fs.appendFileSync(`./stocks/${args[1]}.txt`,`${acc}\n`)
            }
                
            })
            message.channel.send(new discord.MessageEmbed().setTitle(`Restock Effectuer`).setDescription(`J'ai bien restock ${restocked} comptes pour le service ${args[1]} !`).setColor(0x303135))
            const notifier =   r('POST',webhook,{json:{
                "avatar_url":avatar,
                "content":`<@&${ping_role}>`,
                "embeds":[{
                    "author": {
                        "name": `${name}`,
                        "url": "",
                        "icon_url": "https://cdn.discordapp.com/attachments/980422839092019230/983359572662186014/standard_8.gif"
                      },
                      "title": `Nouveau restock effectué par ${message.author.username}`,
                      "color":0x303135,
                      "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=128`
                      },
                      "image": {
                        "url": "https://media.discordapp.net/attachments/957605881359515719/959757202430758963/350kb.gif"
                      },
                      "fields":[{
                          "name":"```Service Restock :```",
                          "value":`**${args[1]}**`
                      },
                       {
                        "name":"```Nombre de comptes restock :```",
                        "value":`**${restocked}**`
                       }
                    ]
                      }]
                    
            }})
        })
  }
}