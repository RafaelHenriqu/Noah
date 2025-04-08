require('dotenv').config()

// Constantes //

const Class = require("./js/Class")
const Discord = require("discord.js")
const Client = new Discord.Client({intents:["MessageContent","GuildMessages","Guilds","GuildMembers","AutoModerationConfiguration","AutoModerationExecution","GuildVoiceStates","GuildIntegrations","DirectMessagePolls","DirectMessageTyping"]})
const ComandosJs = require("./js/Comandos")
const Env = process.env
const Settings = new Class.Settings({Language:'pt-br'})

// Variaveis //

var Mensagem_Number = 0









Client.once("ready",(bot)=>{
    console.log(`${bot.user.tag} | Version: ${Env.VERSION}`)
    
    const Infos = {
        "Name":bot.user.tag,
        "Avatar":bot.user.avatar,
        "Server Quantity":bot.guilds.cache.size,
        "User Quantity":bot.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0),
        "Id":bot.user.id,
        "Version":Env.VERSION
    }

    Settings.Api(Infos)    

})




Client.on("messageCreate",async (Mensagem)=>{
    Mensagem_Number++
    const Comando = Mensagem.content.slice(Env.PREFIX.length).trim().split(/ +/g).shift().toLowerCase() 
    if (Mensagem.author.bot || Mensagem.content[0] != Env.PREFIX) return;
    if (Mensagem_Number >= 500){
        Mensagem_Number = 0
        
        Client.user.setStatus("idle")
        let MySQL = Settings.MySql()
        if (MySQL){
            
            MySQL.query("SELECT * FROM infos",async (Error,Value,Fields)=>{
            
                var Names = []
                var Games = []
                var Avatares = []
                var Banners = []
                var Icons = []
                Value.map(e=>{
                    if (e.Names){   
                        Names.push(e.Names)
                    }
                    if (e.Games){
                        Games.push(e.Games)
                    }
                    if (e.Photos){
                        Avatares.push(e.Photos)
                    }
                    if (e.Banner){
                        Banners.push(e.Banner)
                    }
                    if (e.Group_Photos){
                        Icons.push(e.Group_Photos)
                    }
                })
    
    
                var Name = Names[Math.floor(Math.random() * Names.length)]
                var Avatar = Avatares[Math.floor(Math.random() * Avatares.length)]
                var Game = Games[Math.floor(Math.random() * Games.length)]
                var Banner = Banners[Math.floor(Math.random() * Banners.length)]
                var Icon = Icons[Math.floor(Math.random() * Icons.length)]
    
                try{
                    await Client.user.setUsername(Name)
                    await Client.user.setActivity(Game)
                    await Client.user.setAvatar(`${Avatar}`).then(()=>{}).catch(()=>{})
                    await Client.user.setBanner(`${Banner}`).then(()=>{}).catch(()=>{})
                    // await Mensagem.guild.setIcon(`${Icon}`)
                }catch(Error){
                    return;
                }
    
            })
        }

 
    }
 
    // Advanced commands //
    switch(Comando){
        case "play":
            var URL = String(Mensagem.content.split(" ")[1])
            ComandosJs.Advanced_commands.Media_Player({
                URL:URL,
                VoiceChannel: Mensagem.member.voice,
            })
            break
        default:
            break
        }



    



})



Client.login(Env.TOKEN)