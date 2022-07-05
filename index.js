const axios = require('axios').default;
const {
    MessageEmbed,
    WebhookClient
} = require('discord.js');
require('dotenv').config()
const id = process.env.ID;
const token = process.env.TOKEN;
const webhookClient = new WebhookClient({
    'id': id,
    'token': token
});
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.CONSUMERKEY,
    consumer_secret: process.env.CONSUMERSECRET,
    access_token_key: process.env.ACCESSTOKENKEY,
    access_token_secret: process.env.ACCESSTOKENSECRET
  });
/*
async function versionLol() {
    await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(function(response) {
                // handle succes
            return new Promise(resolve => {
                ver = response.data[1];
                resolve(ver);
            })
        })  
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });
        
}
*/
//config
var reeboot = true;

function estadoFuncion(reb) {
    if (reb == true) {
        reb = "✅";
        return reb;
    } else {
        reb = "🛑";
        return reb;
    }
}

//https://sieve.services.riotcdn.net/api/v1/products/lol/version-sets/PBE1?q[artifact_type_id]=lol-game-client&q[platform]=windows

console.log("***************************")
console.log("| Discord and PBE Bot     |")
console.log("***************************")
console.log()
let now = new Date();
console.log("---------------------------")
console.log("|⚙️ Configuración del bot |")
console.log("---------------------------")
console.log('| 💻 ESTADO || ✅         |')
console.log("|                         |")
console.log("| 🕛 HORA || " + now.toLocaleDateString() + "     |");
console.log("|                         |")
console.log("| ⏱️ INTERVAL || 5 min    |")
console.log("|                         |")
console.log("| 🔃 REBOOT || " + estadoFuncion(reeboot) + "         |") 
console.log("---------------------------")
console.log()
//console.log("VERSIÓN || " +  versionLol())




const notifier = require('node-notifier');
const path = require('path');


function discordWeb() {
    const embed = new MessageEmbed()
        .setTitle('PBE Status')
        .setDescription("Una nueva versión ha llegado al PBE.")
        .setColor("#d13739")
        .addField("💻 **Estado:**", "✅ Activo", false)
        .setThumbnail("https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=640&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=672")
        .setImage("https://thumbs.gfycat.com/SadPracticalAmericantoad-size_restricted.gif");

    webhookClient.send({
        content: 'Mensaje Automático para <@566648602429227028>',
        username: 'Máquina Hextech',
        avatarURL: 'https://videos.cults3d.com/EfoIBY1hde5wSFQNhA2vh5g7VsM=/https://files.cults3d.com/uploaders/19404313/illustration-file/405a741e-90b3-4316-a96a-364bdc11dba1/0001-0100-5.gif',
        embeds: [embed],
    })

    console.log('📨 DISCORD || ✅ \033[34m Mensaje enviado \033[0m')
    console.log()
}

function AlertPBE() {
    notifier.notify({
        title: 'PBE BOT Status',
        message: 'Nuevo PBE de League of Legends',
        icon: path.join(__dirname, 'riotgames.jpg'),
        sound: true,
      });
}

function AlertReboot() {
    notifier.notify({
        title: 'PBE BOT',
        message: 'El reboot ha sido ejecutado, abre de nuevo el ejecutable',
        icon: path.join(__dirname, 'riotgames.jpg'),
        sound: true,
      });
}

function twitteo() {
    client.post('statuses/update', {status: '🤖 Tweet Automático | Rush Api\nNuevo PBE de League of Legends'},  function(error, tweet, response) {
        if(error) throw error;
        console.log();  // Tweet body.
        console.log();  // Raw response object.
      });
      console.log('🐦 TWITTER || ✅ \033[36m Tweet enviado \033[0m')
      console.log()
}



let dcms = 0;
function pedirDatos() {
    axios.get('https://lol.secure.dyn.riotcdn.net/channels/public/x/status/pbe.json')
        .then(function(response) {
                // handle success

                console.log("📥 DATA || \033[33m Informacion recibida \033[0m")
                console.log()
                if (response.data.maintenances = []) {
                    console.log('💻 ESTADO || 🛑 \033[31m No hay nuevo PBE \033[0m')
                    console.log()
                    console.log("------------------------------------------")
                    console.log()
                    
                
                    
                } else {
                  console.log('💻 ESTADO || ✅ \033[32m Si hay nuevo PBE \033[0m')
                  console.log()
                  console.log("------------------------------------------")
                  console.log()
                  if (dcms == 0) {
                    discordWeb()
                    twitteo()
                    AlertPBE()

                    dcms = 1;
                }

                if (dcms == 1) {
                    return;
                }
                    
                }
        })
.catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });
}

function rebootAc() {
    if (reeboot == true) {
        console.log('🔃 REBOOT || ✅ \033[32m Activado \033[0m')
        AlertReboot();
        setTimeout(() => {
            process.exit();
        }, 2000)
    } else {
        console.log('🔃 REBOOT || 🛑 \033[31m Desactivado \033[0m')
        console.log()
    }
}



setInterval(pedirDatos, 300000)
setInterval(rebootAc, 10800000)
