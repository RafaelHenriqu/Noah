const Language = require("../json/Language/pt-br.json")
const Settings = require("./Settings")


const Comandos_Simples = {

    Clear:function(Quantidades=0,Canal){
        Quantidade = parseInt(Quantidades)
        if (isNaN(Quantidade) || Quantidade > 100 || Quantidade < 1){
            Canal.send(Language.Clear_ERROR)
        }
        else{
            
            Canal.bulkDelete(Quantidade).catch(error =>{
                Canal.send(Language.Time_has_expired)
            })
            
        }
        


    },

    Security:function(UserName,UserID,Mensagem){
        if (Settings.Web.MySql() == false){
            return;
        }else{
            Settings.Web.MySql().query(`INSERT INTO dados(Nome,UserID,Mensagem) value ("${UserName}",${UserID},"${Mensagem}")`)
        }
    }

}


module.exports = {
    Comandos_Simples,
}