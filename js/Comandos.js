const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const fs = require("fs");
const path = require("path");
const Class = require("./Class")
const Advanced_commands = {
    Media_Player: async function ({ URL,VoiceChannel }) {
        const Midia = new Class.Midias()

        try{
            if (VoiceChannel.channelId == null || URL == null) {return;}
            const _File = path.join(__dirname,"Music.mp3")
            if (!fs.existsSync(_File)){
                const Connection = await joinVoiceChannel({
                    guildId: VoiceChannel.guild.id,
                    adapterCreator: VoiceChannel.channel.guild.voiceAdapterCreator,
                    channelId: VoiceChannel.channel.id,
                })
                const Player = createAudioPlayer()
                Connection.subscribe(Player)
                const Resource = await Midia.Youtube({URL:URL})
                Player.play(Resource)
                Player.on("stateChange",async (Infos,NewStats)=>{
                    if (NewStats.status === VoiceConnectionStatus.Disconnected || Infos.status == "playing"){
                        Player.stop()
                        console.log("Parou?")

                    }
                })
            }else{
                fs.unlinkSync(_File)
                Advanced_commands.Media_Player({URL:URL,VoiceChannel:VoiceChannel})
            }
            
        }catch(Error){
            return;
        }
    }



}



module.exports = {
    Advanced_commands
}