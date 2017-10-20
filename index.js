const Discord = require("discord.js"); //Bibliothèque Javascript de Discord

const PREFIX = "::";	//Ce qu'il y a au début de la commande, exemple ici : "-:ping"
const PREFIXCOMMAND = "//";

var bot = new Discord.Client(); // C'est pour dire que le bot est comme un utilisateur au serveur (normalement c'est ça, je sais plus, mais c'est obligatoire en gros, cherche pas xD)


//ecrit dans la console quand le bot est pret
bot.on("ready", function () {
    console.log("Ready")
	bot.user.setGame(":: + emoji's name");
	bot.user.setStatus("online");
})


bot.on("message", function (message) {
    
    if (message.author.equals(bot.user)) return;
	
	if (message.content.startsWith(PREFIXCOMMAND)){
		var args = message.content.substring(PREFIXCOMMAND.length).split(" ");
		
		const emojiList = bot.emojis.map(e=>e.toString()).join("#");
		var ListEmoji = emojiList.split("#");
		var pageTot = Math.floor(ListEmoji.length / 25);
		
		switch (args[0].toLowerCase()) {		//commands with // prefix	
			case "random":
				
				randemo = Math.floor((Math.random() * ListEmoji.length));
				message.delete();
				message.reply(ListEmoji[randemo]);
				break
			
			case "list":
				if (!args[1]) currentPage = 0;
				else currentPage = args[1] - 1; //check if int
				if (currentPage > pageTot){
					message.channel.send("Page not found");
					return;
				}
				message.delete();
				const embed = new Discord.RichEmbed()
				var limit = 24 + (24 * currentPage);
				if(ListEmoji.length - (25 * currentPage) < 25) limit = ListEmoji.length;
					for(var i=(24 * currentPage);i<limit; i++){
						var testemoji = ListEmoji[i];
						embed.addField(testemoji,
							ListEmoji[i+1], true)
						i++
					}
				message.channel.send({ embed});
				message.channel.send("Page " + (currentPage + 1) + " / " + (pageTot + 1));
				break
			}
	}
	

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