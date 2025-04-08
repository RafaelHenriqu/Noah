const fs = require('fs');
const ini = require('ini');
const Youtube = require("@distube/ytdl-core")
const {exec} = require("child_process");
const path = require('path');
const { createAudioResource } = require('@discordjs/voice');
// Classes //

class Settings{

    constructor({Warning_Chat = null,Language="en-us"}){
        const Config = ini.parse(fs.readFileSync("./Config.ini","utf-8"))
        this.Warning_Chat = Warning_Chat
        this.Language = Language
        Language = `${Language}.json`
        if (fs.readdirSync('./json/Language').includes(Language)){
            Config.Language = Language
        }else{
            Config.Language = "en-us"
        }
        
        Config.Warning_Chat = Warning_Chat

    }

    Api = function(Infos){
        const App = require("express")()
        App.get("/Infos",(req,res)=>{
            res.send(Infos)
        })

        App.listen(5000,()=>{
            console.log("Api Inicializada.")
        })

    }


    MySql = function(){
        const Mysql_Connection = require("mysql2").createConnection({
            host:"localhost",
            port: 3306,
            user:"root",
            password: "123123",
            database: "noah_bot"
        })
        Mysql_Connection.connect(err=>{
            if (err){return false;}
        })
        return Mysql_Connection;

    }


}

class Midias{

    Youtube = async function({URL}){
        try{
            const Infos = await Youtube.getBasicInfo(URL)

                  
            const webm = path.join(__dirname,"Music.webm")
            const Mp3 = path.join(__dirname,"Music.mp3")
            
            const Stream = Youtube(URL,{filter:'audio',quality:'highestaudio'})
            const WriteStram = fs.createWriteStream(webm)
            Stream.pipe(WriteStram)
            
            return await new Promise((resolve,reject)=>{
                WriteStram.on("finish",()=>{
                    const cmd = `ffmpeg -i "${webm}" -codec:a libmp3lame -qscale:a 2 "${Mp3}"`;
                    exec(cmd,()=>{
                        fs.unlinkSync(webm)
                        const Resource = createAudioResource(Mp3)
                        resolve(Resource)
                    })
                })            

            })
            
        }catch(Error){

            console.log("Algo deu errado")


        }
    }
}
 



module.exports = {
    Settings,
    Midias

}