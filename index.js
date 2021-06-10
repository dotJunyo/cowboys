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

    const arr = mbau.split(',')

    var acao, data, hora, qntobj, nome, sobrenome, idade, cpf, id, celular, item

    //Define se o player guardou ou retirou
    if (arr[0].includes("GUARDOU")) {
        acao = "GUARDOU"
    } else {
        acao = "RETIROU"
    }

    //Define a data e a hora
    ardh = arr[0].split("]")
    data = ardh[1].slice(2, 12);
    hora = ardh[2].slice(2, 10);

    //Define quantos objetos foram guardados
    qntobj = arr[1].slice(10);

    //Define o nome do player
    arnome = arr[6].split('"')
    nome = arnome[3]

    //Define o sobrenome do player
    arsnome = arr[2].split('"')
    sobrenome = arsnome[5]

    //Define a idade do player
    idade = arr[3].slice(6)

    //Define o CPF do player
    arcpf = arr[4].split('"')
    cpf = arcpf[3]

    //Define o ID do player
    arid = arr[5].split(':')
    id = arid[1]

    //Define o celular do player
    arcelular = arr[7].split('"')
    celular = arcelular[3]

    //Define o Item
    aritem = arr[8].split('"')
    item = aritem[3]

    if (message.channel.id === '848758373125980180' /*&& message.webhookID*/ ) {

        const channelID = message.guild.channels.cache.find(channel => channel.name === id);

        if (channelID) {
            editarMensagem();
        } else {
            message.guild.channels.create(id, { reason: 'Needed a cool new channel' })
                .then(editarMensagem())
                .catch(console.error);
        }

    }

    function editarMensagem() {
        console.log("Mensagem editada!");
    }

})