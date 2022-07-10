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


var reeboot = false;
var estado = true;


const {
   ipcMain
} = require("electron")

ipcMain.handle("reboot", (event, line) => {
   reeboot = line;
   console.log
   console.log(`Reboot: ${line}`)
   return `Backend confirms it received: ${line}`

})

ipcMain.handle("estado", (event, line) => {
   estado = line;
   console.log
   console.log(`Estado: ${line}`)
   return `Backend confirms it received: ${line}`

})


const notifier = require('node-notifier');
const path = require('path');
const {
   resolve
} = require('path');
const {
   Console
} = require('console');


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
      avatarURL: 'https://assets.dicebreaker.com/magic-the-gathering-arcane-secret-lair-art-hextech.png/BROK/thumbnail/1600x900/quality/100/magic-the-gathering-arcane-secret-lair-art-hextech.png',
      embeds: [embed],
   })

   console.log(' DISCORD ||  \033[34m Mensaje enviado \033[0m');
   console.log();
}

function alertPBE() {
   notifier.notify({
      title: 'PBE BOT Status',
      message: 'Nuevo PBE de League of Legends',
      icon: path.join(__dirname + "/assets", 'riotgames.jpg'),
      sound: true,
   });
}

function alertReboot() {
   notifier.notify({
      title: 'PBE BOT',
      message: 'El reboot ha sido ejecutado, abre de nuevo el ejecutable',
      icon: path.join(__dirname + "/assets", 'riotgames.jpg'),
      sound: true,
   });
}

function twitteo() {
   client.post('statuses/update', {
      status: '🤖 Tweet Automático | Rush Api\nNuevo PBE de League of Legends'
   }, function (error, tweet, response) {
      if (error) throw error;
      console.log(); // Tweet body.
      console.log(); // Raw response object.
   });
   console.log(' TWITTER ||  \033[36m Tweet enviado \033[0m');
   console.log();
}

let consm = 0;
let tiempos = 0;
let dcms = 0;

let pbestado;

console.log(`Estado: ${estado}`)
console.log(`Reboot: ${reeboot}`)

module.exports.pedirDatos = function pedirDatos() {
   axios.get('https://lol.secure.dyn.riotcdn.net/channels/public/x/status/pbe.json')
      .then(function (response) {
         // handle success
         if (estado == true) {
            if (consm == 0) {
               console.log("DATA || \033[33m Informacion recibida \033[0m");
               console.log();
            }
            if (consm == 1) {

            }
            if (!response.data.maintenances[0]) {
               pbestado = false;
               module.exports.pbestado = pbestado;


            } else {
               if (consm == 0) {
                  console.log();
                  consm = 1;
                  pbestado = true;
                  module.exports.pbestado = pbestado;
               }
               if (consm = 1) {

               }
               if (dcms == 0) {
                  discordWeb();
                  twitteo();
                  alertPBE();

                  dcms = 1;
               }

               if (dcms == 1) {
                  return;
               }

            }
         } else {
            if (tiempos == 0) {
               console.log('ESTADO ||  \033[31m Modo desactivado \033[0m');
               console.log();
               tiempos = 1;
            }
            if (tiempos == 1) {
               return;
            }
         }
      })
      .catch(function (error) {
         // handle error
         console.log(error);
      })
      .then(function () {
         // always executed
      });
}


let tmen = 0;

module.exports.rebootAc = function rebootAc() {
   if (reeboot == true) {
      console.log('REBOOT ||  \033[32m Activado \033[0m');
      alertReboot();
      setTimeout(() => {
         process.exit();
      }, 2000)
   } else {
      if (tmen == 0) {
         console.log('REBOOT ||  \033[31m Desactivado \033[0m');
         console.log();
         tmen = 1;
      }
      if (tmen == 1) {
         return;
      }
   }
}