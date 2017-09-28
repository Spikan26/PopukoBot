const Discord = require("discord.js"); //Bibliothèque Javascript de Discord

const TOKEN = "MzYwMzUxNjA1MTYzMjk0NzIx.DKUWfA.R4CeKMeGxrEQ5cJs4hH2GddhvmY"; //Token du Bot, ça sert à l'identifier
const PREFIX = "::";	//Ce qu'il y a au début de la commande, exemple ici : "-:ping"


var bot = new Discord.Client(); // C'est pour dire que le bot est comme un utilisateur au serveur (normalement c'est ça, je sais plus, mais c'est obligatoire en gros, cherche pas xD)


//ecrit dans la console quand le bot est pret
bot.on("ready", function () {
    console.log("Ready")
	bot.user.setGame(":: + emoji's name");
})


bot.on("message", function (message) {
    //ignore son propre message (i guess ? c'est dur d'expliquer)
    if (message.author.equals(bot.user)) return;

    //Si ne commence pas par le PREFIX, ignore
    if (!message.content.startsWith(PREFIX)) return;

    //sépare les mots de la phrase (ne compte pas le PREFIX)
    var args = message.content.substring(PREFIX.length).split(" ");

	const emoji = bot.emojis.find("name", args[0]);
	if (emoji != null){
		message.delete();
		message.reply(`${emoji}`);
	}
});

//connecte le bon bot
bot.login(process.env.BOT_TOKEN)

//const emojiList = bot.emojis.map(e=>e.toString()).join("#");			//message.guild.emojis.map(e=>e.toString()).join("#");
	//	var ListEmoji = emojiList.split("#");
	//	for(var i=0;i<ListEmoji.length; i++){
	//		message.channel.send(ListEmoji[i]);
	//	}