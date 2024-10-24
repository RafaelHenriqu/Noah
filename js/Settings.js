const Web = {

    Api:function(Infos){
        const App = require("express")()
        
        App.get("/Infos",(req,res)=>{
            res.send(Infos)
        })




        App.listen(5000,()=>{
            console.log(`Api Inicializada..`)
        })
    },

    MySql:function(){
        const Mysql_Connection = require("mysql2").createConnection({
            host:"localhost",
            port: 3306,
            user:"root",
            password: "123123",
            database: "discord"
        })
        Mysql_Connection.connect(err=>{
            if (err){return false;}
        })
        return Mysql_Connection;

    }
    
}

module.exports={
    Web


}