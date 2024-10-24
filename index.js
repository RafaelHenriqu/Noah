const Discord = require("discord.js")
const Client = new Discord.Client({intents:["MessageContent","GuildMessages","Guilds","GuildMembers","AutoModerationConfiguration","AutoModerationExecution","GuildVoiceStates","GuildIntegrations","DirectMessagePolls"]})
const Config = require("./json/config.json")
const ComandosJs = require("./js/Comandos")
const Settings = require("./js/Settings")


Client.once("ready",(bot)=>{
    console.log(`${bot.user.tag} | Version: ${Config.Version}`)
    const Infos = {
        "Name":bot.user.tag,
        "Avatar":bot.user.avatar,
        "Server Quantity":bot.guilds.cache.size,
        "User Quantity":bot.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0),
        "Id":bot.user.id,
        "Version":Config.Version
    }
    Settings.Web.Api(Infos)
})

Client.on("messageCreate",(Mensagem)=>{
    const Comando = Mensagem.content.slice(Config.Prefix.length).trim().split(/ +/g).shift().toLowerCase() 
    if (Mensagem.author.bot || Mensagem.channel.type==="dm" || Mensagem.content[0] != Config.Prefix) return;
    
    switch(Comando){
        case 'clear':
            ComandosJs.Comandos_Simples.Clear(Mensagem.content.split(" ")[1],Mensagem.channel)
            return;
        default:
            // ComandosJs.Comandos_Simples.Security(Mensagem.author.username,Mensagem.author.id,Mensagem.content.substring(1)) | Sistema de salvamentos de dados Desativado |
            return;
    }


})



Client.login(Config.Token)