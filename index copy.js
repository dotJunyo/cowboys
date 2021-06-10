//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs
var mysql = require('mysql');
const sequelize = require('sequelize');

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// if(connection.state === 'connected'){
// console.log("Conectado");
// }else{
//   console.log("Desconectado");
// }

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//login into the bot
client.login(require("./botconfig/config.json").token);

//Verificar bau

client.on('message', message => {

    const mbau = message.content

    const arr = mbau.split('[')

    var id, obj, data, hora, sym

    if (message.channel.id === '848758373125980180' /*&& message.webhookID*/ ) {
        id = parseInt(arr[1].slice(5, 10));
        if (arr[2].includes("GUARDOU")) {
            obj = arr[2].slice(10).replace(' ', '&').split('&');
            num = "+" + obj[0];
        } else {
            obj = arr[2].slice(10).replace(' ', '&').split('&');
            num = "-" + obj[0];
        }
        data = arr[4].slice(7, 17);
        hora = arr[5].slice(7, 15);
    }

    console.log(id + " " + obj[0] + " / " + obj[1] + " / " + data + " " + hora);
    console.log(num);

    var connection = mysql.createConnection({
        host: '45.93.101.103',
        user: 'u474749469_jk',
        password: 'Jk07jk07',
        database: 'u474749469_cowboys'
    });

    connection.connect();

    let sql = `
                IF EXISTS( SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
                  WHERE TABLE_NAME = 'membro_cowboys' 
                  AND  COLUMN_NAME = ${obj[1]})
                UPDATE membro_cowboys SET ${obj[1]}=${obj[1]}${num} WHERE ID=${id}
                ELSE
                ALTER TABLE membro_cowboys
                ADD COLUMN ${obj[1]} INT
                UPDATE membro_cowboys SET ${obj[1]}=${obj[1]}${num} WHERE ID=${id}
              `

    connection.query(sql);

    connection.end();

})