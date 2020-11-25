require("express")().listen(1343);

const db = require("quick.db"); 
const moment = require("moment");
require("moment-duration-format");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("token");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return 
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`u!yardım | u!add`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  if (db.fetch(`cokaradalistere_${message.author.id}`)) return message.channel.send("Olamaz sen botun karalistesinde bulunuyorsun botu kullanamazsın.")
  var spl = message.content.split(" ");
  if(spl[0] == "u!add") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("**<a:nlem:779748075580686356> Zaten Eklenmiş !!!**")
    
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("**<a:bklnyr:779750703635103776> Başarılı Bir Şekilde 7/24 Yapıldı !!!**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
     message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("<a:nlem:779748075580686356> **Error Yalnızca Mutlak URL'ler Desteklenir.**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
   return message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
  })
  }
})


client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!say") {
    var link = spl[1];
    message.channel.send(
      `**İşte Bot Sayısı <a:yaniaret:779750992051961876>  ${
        db.get("linkler").length
      }**`
    );
  }
});




const Discord = require('discord.js');

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!yardım") {
    let embed = new Discord.RichEmbed()
      .setColor("#e900ea")
      .addField("<a:tik2:779749762294349834> **u!yardım**","Uptime Botunun Yardım Sistemini Gösterir (Burası)")
      .addField("<a:yaniaret:779750992051961876> **u!add**","Botunuzu 7/24 Aktif Tutmak İçin Kullanılan Komut")
      .addField("<:dc:779749363361513513> **u!say**","Sistemde Kaç Bot Olduğuna Bakar")
      .addField("<a:tac:779748076894158868> **u!developer**","Botun Hawli Geliştiricilerini Gösterir")
      .addField("<a:an:779748070669025330> **u!ping**","Botun Pingini Gösterir.")
      .addField("<a:dc_bkm:779748075165057025> **u!davet**","Botun Destek Sunucusunu Ve Ekleme Linkini Atar.")
      .addField("<a:dn_dc:779748598468182066> **u!istatistik**","Botun İstatistiklerini Gösterir.")    
      .setImage("https://media.discordapp.net/attachments/762747543540465714/779101304232345640/350kb_4.gif?width=400&height=51")
      .setAuthor(`Uptime`, client.user.avatarURL);
    return message.channel.send(embed);
  }
});

  const log = message => {
  console.log(`${message}`);
}
  
  client.on("message", msg => {
  if (msg.content === "u!ping") {
    msg.channel.send(`Pingim **${client.ping}** !`);
  }
  });
  
  client.on("message", msg => {
  if (msg.content === "u!istatistik") {
   const seksizaman = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('ORANGE')
  .setFooter('Uptime', client.user.avatarURL)
  .addField('<a:an:779748070669025330> Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2)) 
  .addField("» Çalışma süresi", seksizaman)
  .addField("» Discord.JS sürüm", "v"+Discord.version, true)
  .addField(`» Node.JS sürüm`, `${process.version}`, true)
  .addField("» Ping",`${client.ping} MS`)
  .addField(':book: Kütüphanesi;', `Discord.js`)
  .addField("**❯ Bot Davet**", " [Davet Et](https://discord.com/oauth2/authorize?client_id=779099158211985418&scope=bot&permissions=805314622)", )
  .addField("**❯ Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/ytKWsMn)", )

  return msg.channel.send(istatistikler);
  }
  });

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!developer") {
    let embed = new Discord.RichEmbed()
      .setColor("#070706")
      .setAuthor("Developers", client.user.avatarURL)
      .addField(
        " <a:byz_ony:779751444906639400> **>> İşte Hawli Sahibim**",
        "<@!748497573316264027>"
      )
    return message.channel.send(embed);
  }
});

  client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "u!davet") {
    let embed = new Discord.RichEmbed()
      .setColor("#070706")
      .setAuthor("Uptime Bot", client.user.avatarURL)
      .setDescription(
        `**Botun Davet Linki : [Tıkla](https://discord.com/oauth2/authorize?client_id=779099158211985418&scope=bot&permissions=805314622)** 
         **Botun Destek Sunucusu : [Tıkla](https://discord.gg/ytKWsMn)**`)
    return message.channel.send(embed);
  }
});
  
