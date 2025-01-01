
const Language = require("../json/Language/pt-br.json")
const Config = require("../json/config.json")


const Comandos_Simples = {
    Start:async function(Comando,Mensagem){
        switch(Comando){
            case 'clear':
                Quantidade = parseInt(Mensagem.content.split(" ")[1])
                if (isNaN(Quantidade) || Quantidade < 1){Mensagem.channel.send(Language.Clear_ERROR)
                    break
                }
                if (Quantidade >= 100){
                    QuantidadeMaxima = await Mensagem.channel.messages.fetch({limit:100})
                    QuantidadeMaxima = parseInt(QuantidadeMaxima.size)
                    Mensagem.channel.bulkDelete(QuantidadeMaxima + 1).catch(error =>{
                        Mensagem.channel.send(Language.Clear_Time_has_expired)
                    })
                }else{
                    Mensagem.channel.bulkDelete(Quantidade + 1).catch(error =>{
                        Mensagem.channel.send(Language.Clear_Time_has_expired)
                    })
                }
                break

            case 'None':

                break
            default:
                break
        }
    },
}

const Comandos_Privados = {
    Start:function(Comandos,Mensagem,Client){
        switch(Comandos){
            case 'aviso':
                 var Aviso = Mensagem.content.replace(/\/aviso/i,'').trim()
                 Client.channels.cache.get(Config.Warning_Chat).send(Aviso);
                break
            default:
                break
        }     

    }
}


module.exports = {
    Comandos_Simples,
    Comandos_Privados,
}