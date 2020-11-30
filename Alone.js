const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://.glitch.me/`);
}, 280000);
// كل البكجات الي ممكن تحتجها في اي بوت 
const { Client, MessageEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config.js')
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
client.on('ready', () => { 
  console.log(`Logged in as ${client.user.tag}!`);
});

client.setMaxListeners(999)


//كود البان

client.on("message", message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تبند شخص رتبته اعلى منك!");
    if (!message.guild.member(user).bannable)
      return message.reply(
        "**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**"
      );

    message.guild.member(user).ban(7, user);

    message.channel.send(
      `**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `
    );
  }
});

//فك البان


client.on('message' , message => {
    ;
    let user = message.mentions.users.first()|| client.users.get(message.content.split(' ')[1])
    if(message.content.startsWith(prefix + 'unban')) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('❌|**\`BAN_MEMBERS\`لا توجد لديك رتبة`**');
        if(!user) return  message.channel.send(`Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`);
        message.guild.unban(user);
        message.guild.owner.send(`لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`)
        var embed = new Discord.RichEmbed()
        .setThumbnail(message.author.avatarURl)
        .setColor("RANDOM")
        .setTitle('**●Unban** !')
        .addField('**●User Unban :** ', `${user}` , true)
        .addField('**●By :**' ,       ` <@${message.author.id}> ` , true)
        .setAuthor(message.guild.name)
        message.channel.sendEmbed(embed)
    }
});


//معلومات السيرفر

client.on("message", message => {
  if (message.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#00000")
      .addField(
        "✽ **Bot Ping** : ",
        `» ${Date.now() - client.createdTimestamp}` + " ms",
        true
      )
      .addField("**Servers** :  ", `» ${client.guilds.size}`, true)
      .addField("**Channels** : ", `» ${client.channels.size} `, true)
      .addField("**Users** : ", `» ${client.users.size} `, true)
     . addField("**Bot Name** :  ", `» ${client.user.tag} `, true)
      .addField("**Bot Owner** :  ", `» <@607334459158822928>`, true) // تعديل اساسي غير الايدي لايدي حسابك
      .setImage("")
      .setFooter(message.author.username, message.client.avatarURL);
    message.channel.send(bot);
  }
});


//// كود معلومات الشخص او اليوزر
client.on("message", pixelbot => {
  // itzZa1D - Codes Team.
  if (pixelbot.content.startsWith(prefix + "user")) {
    // itzZa1D - Codes Team.
    if (pixelbot.author.bot) return;
    if (!pixelbot.guild)
      return pixelbot.reply("**:x: - This Command is only done on Servers**");
    pixelbot.guild.fetchInvites().then(invites => {
      // itzZa1D - Codes Team.
      let personalInvites = invites.filter(
        i => i.inviter.id === pixelbot.author.id
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var roles = pixelbot.member.roles
        .map(roles => `**__${roles.name}__ |**`)
        .join(` `);
      let pixeluser = new Discord.RichEmbed() // itzZa1D - Codes Team.
        .setColor("#00000")
        .setTitle(" :beginner: :heartpulse:   | Use  r Info") // itzZa1D - Codes Team.
        .setAuthor(pixelbot.author.username, pixelbot.author.avatarURL)
        .addField("**✽ Name :**   ", pixelbot.author.username, true)
        .addField("**✽ Tag :**   ", pixelbot.author.discriminator, true)
        .addField("**✽ ID :** ", pixelbot.author.id, true) // itzZa1D - Codes Team.
        .addField(
          "**✽ Joined At :**   ",
          moment(pixelbot.joinedAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField(
          "**✽ Created At :**    ",
          moment(pixelbot.author.createdAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField("**✽ Total invites :**    ", inviteCount, true)
        .setTimestamp(); // itzZa1D - Codes Team.

      pixelbot.channel.sendEmbed(pixeluser).then(c => {}); // itzZa1D - Codes Team.
    });
  }
});


//كود الكيك
client.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (!reason) return message.reply("**اكتب سبب الطرد**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تطرد شخص رتبته اعلى منك!");

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});

//كود افتار

client.on("message", message => {
  if (message.content.split(" ")[0] === prefix + "avt") {
    if (message.author.bot || message.channel.type == "dm") return;
    var args = message.content.split(" ")[1];
    var avt = args || message.author.id;
    client
      .fetchUser(avt)
      .then(user => {
        avt = user;
        let avtEmbed = new Discord.RichEmbed()
          .setColor("#36393e")
          .setAuthor(`${avt.username}'s Avatar`, message.author.avatarURL)
          .setImage(avt.avatarURL)
          .setFooter(`Avatar`, message.client.user.avatarURL);
        message.channel.send(avtEmbed);
      })
      .catch(() => message.channel.send(`يجب عليك وضع ايدي الشخص`));
  } 
}); 

////كود معلومات السيرفر
client.on("message", message => {
  if (message.content.startsWith(prefix + "server")) {
    if (!message.channel.guild)
      return message.channel.send(` | This Command is used only in servers!`);
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField(":id:✽** Server ID:**", `» ${message.guild.id} `, true)
      .addField(
        ":calendar:✽** Created On**",
        `» ${message.guild.createdAt.toLocaleString()}`,
        true
      )
      .addField(":crown: ✽**Server Owner**", `**${message.guild.owner}**`, true)
      .addField(
        `✽** Members ** [${message.guild.members.size}]`,
        `**${
          message.guild.members.filter(c => c.presence.status !== "offline")
            .size
        }** **Online**`,
        true
      )
      .addField(
        ":speech_balloon:✽** Channels **",
        `» **${message.guild.channels.filter(m => m.type === "text").size}**` +
          " TexT | VoicE  " +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField(":earth_africa:✽** Region **", ` ${message.guild.region}`, true)
      .setImage("")

      .setColor("#000000");
    message.channel.sendEmbed(embed);
  }
});

//كود فك الميوت

client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unmute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد لديك رتبه الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);
    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم فك الميوت عن:",
`${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).removeRole(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .removeRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")
            .catch(console.error);
        });
    }
  }
});



////كود ميوت او اسكات
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "mute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد رتبة الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);

    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم ميوت:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. تم اعطاء العضو ميوت**")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .addRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. تم اعطاء العضو ميوت كتابي**")
            .catch(console.error);
        });
    }
  }
});


//// كود فتح واغلاق الروم
client.on("message", message => {
  if (message.content === prefix + "close") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**تم قفل الشات :no_entry: **");
      });
  }
  if (message.content === prefix + "open") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**تم فتح الشات :white_check_mark:**");
      });
  }
});
    
//// كود سحب شخص
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "move")) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``Use : " + prefix + "move @User``");
      }
      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;
          var usermentioned = message.mentions.members.first().id;
          var embed = new Discord.RichEmbed()
            .setTitle("Succes!")
            .setColor("#000000")
            .setDescription(
              `✅ You Have Moved <@${usermentioned}> To Your Channel `
            );
          var embed = new Discord.RichEmbed()
            .setTitle(`You are Moved in ${message.guild.name} `)
            .setColor("RANDOM")
            .setTitle(`✽ **Premium**`)

            .setDescription(
              `**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`
            );
          message.guild.members
            .get(usermentioned)
            .setVoiceChannel(authorchannel)
            .then(m => message.channel.send(embed));
          message.guild.members.get(usermentioned).send(embed);
        } else {
          message.channel.send(
            "`You Cant Move" +
              message.mentions.members.first() +
              " `The User Should Be In channel To Move It`"
          );
        }
      } else {
        message.channel.send(
          "**``You Should Be In Room Voice To Move SomeOne``**"
        );
      }
    } else {
      message.react("❌");
    }
  }
});

//كود مسح الرسائل


client.on("message", function(message) {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLocaleLowerCase()) {
    case "clear":
      message.delete();
      if (!message.channel.guild) return;
      if (message.member.hasPermission(0x2000)) {
        if (!args[1]) {
          message.channel.fetchMessages().then(messages => {
            message.channel.bulkDelete(messages);
            var messagesDeleted = messages.array().length;
            message.channel
              .send(
                " " +
                  "**```fix\n" +
                  messagesDeleted +
                  " " +
                  ": عدد الرسائل التي تم مسحها" +
                  "```**"
              )
              .then(m => m.delete(5000));
          });
        } else {
          let messagecount = parseInt(args[1]);
          message.channel
            .fetchMessages({ limit: messagecount })
            .then(messages => message.channel.bulkDelete(messages));
          message.channel
            .send(
              " " +
                "**```fix\n" +
                args[1] +
                " " +
                ": عدد الرسائل التي تم مسحها" +
                "```**"
            )
            .then(m => m.delete(5000));
          message.delete(60000);
        }
      } else {
        var manage = new Discord.RichEmbed()
          .setDescription("You Do Not Have Permission MANAGE_MESSAGES :(")
          .setColor("RANDOM");
        message.channel.sendEmbed(manage);
        return;
      }
  }
});
/*
///تعديل غير اساسي
////كود هيلب
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "help")) {
    if (message.author.id == message.guild.ownerID) {
      message.author
        .send(
          `   
\`الاوامر العامة\` :postbox:
\`${prefix}bot\` : لعرض معلومات عن البوت 
\`${prefix}user\` : لعرض معلومات عنك 
\`${prefix}avt\` :يعرض لك صورت  اي شخص عن طريق الايدي 
\`${prefix}avatar\` : لعرض صورتك أو صورة الي تمنشنه 
\`${prefix}color\` : لأختيار لونك في السيرفر 
\`${prefix}colors\` : غير لونك 
\`${prefix}inf\` : عدد الدعوات للسيرفر
\`${prefix}رابط\` : اكتب رابط بالشات يجيك رابط السيرفر خاص

\`الاوامر الإدارية\` :stars:
\`${prefix}clear\` : لمسح الشات 
\`${prefix}ban\` : لحظر شخص من السيرفر
\`${prefix}kick\` : لطرد شخص من السيرفر
\`${prefix}open\` : لفتح الشات
\`${prefix}close\` : لقفل الشات 
\`${prefix}mute\` : لإسكات شخص
\`${prefix}unmute\` : لـ فك إسكات شخص
\`${prefix}new\` : فتح التكت
\`${prefix}closet\` : لحذف روم التكت
\`${prefix}say\` : البوت يكرر كلامك
\`${prefix}move\` : لسحب الشخص الى روومك
\`${prefix}reply\` : لصنع رد تلقائي
\`${prefix}setLog\` : لتحديد روم السجلات 
\`${prefix}setby\` : تحديد روم المغادرة
\`${prefix}setWelcomer <channel name>\` : لتحديد روم الولكم 
\`${prefix}setMessage\` : لتحديد رسالة الترحيب 
\`${prefix}setVc\` <channel name> : لتحديد روم الفويس اونلاين 
\`${prefix}vc off\` : لإغلاق روم الفويس اونلاين
\`${prefix}ls\` : لإظهار جميع بوتات السيرفر
\`${prefix}role\` : لاعطاء شخص رتبة
\`${prefix}role all\` : لـ إعطاء الجميع رتبة معينة

\`\`اوامر التقديم\`\` :pencil: 
\`${prefix}room1\` : لعمل روم التقديمات
\`${prefix}room2\` : لعمل روم القبول والرفض
\`لقبول تقديم عضو : \`${prefix}قبول
مثال: \`\`${prefix}قبول @منشن عضو \`\`
لرفض عضو : ${prefix}رفض
مثال: \`\`${prefix}رفض @منشن عضو لست متفاعل بشكل كافِ\`\`

  `
        )
        .then(() => {
          message.author.send(`

\`أوامر الكريدت قريبا\` :credit_card: 
\`${prefix}credits\` : لمعرفة رصيدك  
\`${prefix}daily\` : لأخذ جائزة يومية
\`يمكن التحويل من شخص لشخص + يزيد الكريدت فقط من امر دايلي\`

\`أوامر الموسيقى  متوقفه\` :notes:
\`${prefix}Play\` : تشغيل الاغنية او اضافتها للقائمة او اكمال الاغنية 
\`${prefix}Pause\` : ايقاف مؤقت الاغنية
\`${prefix}Resume\` : اكمال الاغنية 
\`${prefix}stop\` : لأيقاف الأغنية وخروج البوت من الروم
\`${prefix}forceskip\` : لتخطي الأغنية بشكل مباشر
\`${prefix}Queue\` : عرض القائمة 
\`${prefix}skipto\` : لتخطي الأغنية الى الأغنية القادمة في طابور الموسيقى القادمة
\`${prefix}Skip\` : تخطي للاغنية التالية 
\`${prefix}Volume\` : تغيير الصوت [vol] 
\`${prefix}np\` : عرض مايتم تشغيله الان [np] 
\`${prefix}repeat\` : تكرار الاغنية 

\`أوامر الحماية\` :closed_lock_with_key:
\`${prefix}settings limitsban\` : تحدد العدد الي تبيه لو حد بند  البوت يبنده 
\`${prefix}settings limitskick\` : تحدد العدد الي تبيه لو حد طرد 3 او 4 البوت يبنده 
\`${prefix}settings limitsroleD\` : تحدد العدد الي تبيه لو حد مسح رول 3 او 4 البوت يبنده 
\`${prefix}settings limitsroleC\` : تحدد العدد الي تبيه لو حد صنع روم 3 او 4 البوت يبنده 
\`${prefix}settings limitschannelD\` : تحدد العدد الي تبيه لو حد مسح روم 3 او 4 البوت يبنده 
\`${prefix}settings limitstime\` : تحديد الوقت الذي من خلالة يتم التبنيد كـ مثال اذا شخص بند 5 في دقيقة البوت يبنده
\`${prefix}antibots on\` : منع دخول بوتات
\`${prefix}antibots off\` : السماح للبوتات بالدخول
\`شرح البوت \` : <https://youtu.be/6B9nrQp02Rk>
`);
        })
        .then(e => {
          message.react("✅");

        })
        .catch(() => {
          return message.channel
            .send(
              "**يجب السماح بأستقبال الرسائل في الخاص ، لأتمكن من ارسال الاوامر لك **"
            )
            .then(() => {
              return message.react("❌");
            });
        });
    } else {
      message.author
        .send(
          `   
\`الاوامر العامة\` :postbox:
\`${prefix}bot\` : لعرض معلومات عن البوت 
\`${prefix}user\` : لعرض معلومات عنك 
\`${prefix}avt\` :يعرض لك صورت  اي شخص عن طريق الايدي
\`${prefix}avatar\` : لعرض صورتك أو صورة الي تمنشنه 
\`${prefix}color\` : لأختيار لونك في السيرفر 
\`${prefix}colors\` : غير لونك 
\`${prefix}inf\` : عدد الدعوات للسيرفر
\`${prefix}رابط\` : اكتب رابط بالشات يجيك رابط السيرفر خاص
\`الاوامر الإدارية\` :stars:
\`${prefix}clear\` : لمسح الشات 
\`${prefix}ban\` : لحظر شخص من السيرفر
\`${prefix}kick\` : لطرد شخص من السيرفر
\`${prefix}open\` : لفتح الشات
\`${prefix}close\` : لقفل الشات 
\`${prefix}mute\` : لإسكات شخص
\`${prefix}unmute\` : لـ فك إسكات شخص
\`${prefix}new\` : فتح التكت
\`${prefix}closet\` : لحذف روم التكت
\`${prefix}say\` : البوت يكرر كلامك
\`${prefix}move\` : لسحب الشخص الى روومك
\`${prefix}reply\` : لصنع رد تلقائي
\`${prefix}setLog\` : لتحديد روم السجلات 
\`${prefix}setby\` : تحديد روم المغادرة
\`${prefix}setWelcomer <channel name>\` : لتحديد روم الولكم 
\`${prefix}setMessage\` : لتحديد رسالة الترحيب 
\`${prefix}setVc\` <channel name> : لتحديد روم الفويس اونلاين 
\`${prefix}vc off\` : لإغلاق روم الفويس اونلاين
\`${prefix}ls\` : لإظهار جميع بوتات السيرفر
\`${prefix}role\` : لاعطاء شخص رتبة
\`${prefix}role all\` : لـ إعطاء الجميع رتبة معينة

\`\`اوامر التقديم\`\` :pencil: 
\`${prefix}room1\` : لعمل روم التقديمات
\`${prefix}room2\` : لعمل روم القبول والرفض
\`${prefix}لقبول تقديم عضو : \`قبول
مثال: \`\`${prefix}قبول @منشن عضو \`\`
 ${prefix}لرفض عضو : رفض
مثال: \`\`${prefix}رفض @منشن عضو لست متفاعل بشكل كافِ\`\`



  `
        )
        .then(() => {
          message.author.send(`

\`أوامر الكريدت قريبا\` :credit_card: 
\`${prefix}credits\` : لمعرفة رصيدك  
\`${prefix}daily\` : لأخذ جائزة يومية
\`يمكن التحويل من شخص لشخص + يزيد الكريدت فقط من امر دايلي\`

\`أوامر الموسيقى متوقفه \` :notes:
\`${prefix}Play\` : تشغيل الاغنية او اضافتها للقائمة او اكمال الاغنية [p]
\`${prefix}Pause\` : ايقاف مؤقت الاغنية
\`${prefix}Resume\` : اكمال الاغنية 
\`${prefix}stop\` : لأيقاف الأغنية وخروج البوت من الروم
\`${prefix}forceskip\` : لتخطي الأغنية بشكل مباشر
\`${prefix}Queue\` : عرض القائمة 
\`${prefix}skipto\` : لتخطي الأغنية الى الأغنية القادمة في طابور الموسيقى القادمة
\`${prefix}Skip\` : تخطي للاغنية التالية 
\`${prefix}Volume\` : تغيير الصوت [vol] 
\`${prefix}np\` : عرض مايتم تشغيله الان [np] 
\`${prefix}repeat\` : تكرار الاغنية 
\`شرح البوت \` : <https://youtu.be/6B9nrQp02Rk>

`);
        })
        .then(e => {
          message.react("✅");
        })
        .catch(() => {
          return message.channel
            .send(
              "**يجب السماح بأستقبال الرسائل في الخاص ، لأتمكن من ارسال الاوامر لك **"
            )
            .then(() => {
              return message.react("❌");
            });
        });
    }
  }
});

*/
///تعديل غير اساسي
///تقدر الصورة الخلفية ، شوف الشرح الرابط فوق اول الكود
/// كود الوان
client.on("message", message => {
  if (!message.guild || message.author.bot) return;
  if (message.content == prefix + "colors") {
    var fsn = require("fs-nextra");
    fs.readdir("./colors", async (err, files) => {
      var f = files[Math.floor(Math.random() * files.length)];
      var { Canvas } = require("canvas-constructor");
      var x = 0;
      var y = 0;
      if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0)
        return;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(() => {
          x += 100;
          if (x > 100 * 12) {
            x = 100;
            y += 80;
          }
        });
      var image = await fsn.readFile(`./colors/${f}`);
      var xd = new Canvas(100 * 11, y + 350)
        .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100)
        .setTextBaseline("middle")
        .setColor("white")
        .setTextSize(60)
        .addText(`قائمة الألوان`, 375, 40);
      x = 0;
      y = 150;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(role => {
            x += 75;
          if (x > 100 * 10) {
            x = 75;
            y += 80;
          }
          xd.setTextBaseline("middle")
            .setTextAlign("center")
            .setColor(role.hexColor)
            .addBeveledRect(x, y, 60, 60, 15)
            .setColor("white");
          if (`${role.name}`.length > 2) {
            xd.setTextSize(30);
          } else if (`${role.name}`.length > 1) {
            xd.setTextSize(40);
          } else {
            xd.setTextSize(50);
          }
          xd.addText(role.name, x + 30, y + 30);
        });
      message.channel.sendFile(xd.toBuffer());
    });
  }
});
                                 
/// كود تعين اللوق
const log = JSON.parse(fs.readFileSync("./log.json", "utf8"));

client.on("message", message => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find(r => r.name == room);
  if (message.content.startsWith(prefix + "setLog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send("Please Type The Log Channel Name");
    let embed = new Discord.RichEmbed()
      .setTitle("**Done The Log Code Has Been Setup**")
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On"
    };
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err) console.error(err);
    });
  }
});
                                    
client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleLog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!log[message.guild.id])
      log[message.guild.id] = {
        onoff: "Off"
      };
    if (log[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`**The log Is __𝐎𝐍__ !**`),
        (log[message.guild.id].onoff = "On")
      ];
    if (log[message.guild.id].onoff === "On")
      return [
        message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`),
        (log[message.guild.id].onoff = "Off")
      ];
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[message.guild.id])
    log[message.guild.id] = {
      onoff: "Off"
    };
  if (log[message.guild.id].onoff === "Off") return;
  var logChannel = message.guild.channels.find(
    c => c.name === `${log[message.guild.id].channel}`
  );
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});


client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});


client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});




   
client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let banInfo = new Discord.RichEmbed()
      .setTitle("**[BANNED]**")
      .setThumbnail(userAvatar)
      .setColor("DARK_RED")
      .setDescription(
        `**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(banInfo);
  });
});


client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  var logChannel = oldMember.guild.channels.find(
    c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`اسمه الاصلي`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`اسمه الاصلي`";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[oldMember.guild.id].onoff === "Off") return;
      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("GREEN")
        .setDescription(
`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("RED")
        .setDescription(
`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    if (!log[oldMember.guild.id])
      log[oldMember.guild.id] = {
        onoff: "Off"
      };
    if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});

///تعديل اساسي
/// كود الرد التلقائي
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", message => {
  if (message.content === "السلام عليكم") {
    message.channel.send("**:heart:وعليكم السلام ورحمة الله وبركاته:heart:**");
    message.channel.sendFile("");
  }
});


////تعديل غير اساسي
/// كود اختيار لون

client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (message.content.split(" ")[0] == prefix + "color") {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**There's No Color With This Number ** :x: `)
      .setColor(`ff0000`);
    if (!args[0]) return message.channel.sendEmbed(embedd);
    if (isNaN(args[0]))
      return message.channel.sendEmbed(
        embedd.setDescription("Please select a number :x:")
      );
    if (!message.guild.roles.find("name", `${args[0]}`))
      return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args[0]}`);
    if (!a) return;
    if (a.hasPermission(8))
      return message.channel.send(
        embedd.setDescription("This color has administrator!")
      );
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
message.author.avatarURL
      )
      .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args[0]) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args[0]}`));
  }
});


///// كود خروج الاعضاء

client.on("message", message => {
  if (message.content.startsWith(prefix + "setby")) {
    let args = message.mentions.channels.first();
    if (!args)
      message.channel.send("** منشن روم . ❌**").then(m => {
        m.delete(1500);
      });
    if (
      !message.guild.member(message.author.id).hasPermission("MANAGE_CHANNELS")
    )
      return message.channel.send("**ليس لديك صلاحيات . ❌**");
    message.channel.send(
      `**${args}.  | :ballot_box_with_check: |لقد تم شغيل المغادرة هنا**`
    ); 
    client.on("guildMemberAdd", member => {
      if (member.user.bot) return;
      var embed = new Discord.RichEmbed()
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTitle(`**الله معاك ✋ **`)
        .addField("**__شكرا لوقتك__**  ", `${member}`)
        .setDescription(`**مع السلامه تشرفنا بك ✋** `)
        .addField("👤   تبقي", `**[ ${member.guild.memberCount} ]**`, true)
        .setColor("RANDOM")
        .setFooter(`نتمنى لكم الاستمتاع`);

      var channel = member.guild.channels.find(gg => gg.name === "log"); //// تعديل اساسي
      if (!channel) return;
      channel.send({ embed: embed });
    });
  }
});

/////كود سرعة البوت او البينق
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "ping")) {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    var Bping = `${Math.round(client.ping)}`;

    const E1ping = new Discord.RichEmbed()
      .setTitle("ــــــــــــــــــــــــــــــ")
      .addField(
        `**BOT Ping Is** :__${Bping}📶__`,
        "ــــــــــــــــــــــــــــــ"
      )
      .setFooter(`Requested by | ${message.author.tag}`)
      .setColor("RANDOM");
    message.channel.send(E1ping);
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});


client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;
if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});

client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  if (!log[oldChannel.guild.id])
    log[oldChannel.guild.id] = {
      onoff: "Off"
    };
  if (log[oldChannel.guild.id].onoff === "Off") return;
  var logChannel = oldChannel.guild.channels.find(
    c => c.name === `${log[oldChannel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      if (log[oldChannel.guild.id].onoff === "Off") return;
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});
    
const replyMSG = JSON.parse(fs.readFileSync("./replyMSG.json", "utf8"));

function saveReplay() {
  fs.writeFile("./replyMSG.json", JSON.stringify(replyMSG), function(err) {
    if (err) throw err;
  });
}

/////كود صنع رد تلقائي
client.on("message", async message => {
  if (message.content.startsWith(prefix + "reply")) {
    if (message.author.bot || message.channel.type == "dm") return undefined;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!replyMSG[message.author.id])
      replyMSG[message.author.id] = {
        contentmessage: "none",
        replayMessage: "none"
      };
    saveReplay();
    let contmessage;

    let filter = m => m.author.id === message.author.id;
    message.channel.send(" |** من فضلك اكتب الرساله الان...** ").then(msg => {
      message.channel
        .awaitMessages(filter, {
          //R.I.P Royal Bot!
          maxMatches: 1,
          time: 12000,
          errors: ["time"]
        })

        .then(collected => {
          contmessage = collected.first().content;
          msg.edit(":scroll: | من فضلك اكتب الرد الان... :pencil2: ");

          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 12000,
              errors: ["time"]
            })//hna

            .then(async collectedd => {
              replyMSG[message.author.id] = {
                contentmessage: contmessage,
                replayMessage: collectedd.first().content
              };
              saveReplay();
              var embed1 = new Discord.RichEmbed()
                .setTitle(`Done The Autoreply Setup`)
                .setThumbnail(message.author.avatarURL)
                .setColor("GRAY")
                .setDescription(
                  `
                    Message:
                    ${contmessage}
                    Reply:
                    ${collectedd.first().content}`
                );
              let steve = await client.fetchUser("359541019836022784");
              embed1.setFooter(
                `رد تلقائي`,
                steve ? steve.displayAvatarURL : message.author.displayAvatarURL
              );
              msg.edit("  |** تم الاعداد بنجاح...**");

              message.channel.send(embed1);
            });
        });
    });
  }
});
              

client.on("message", message => {
  if (
    !replyMSG[message.author.id] ||
    !replyMSG[message.author.id].contentmessage ||
    !replyMSG[message.author.id].replayMessage
  )
    return;
  let messagecontent = replyMSG[message.author.id].contentmessage;
  let reply = replyMSG[message.author.id].replayMessage;
  if (message.content == messagecontent) {
    if (messagecontent == "none" || reply == "none") return undefined;
    message.channel.send(`\`#\` ${reply}`);
  }
});
                                              
        
///كود منشن بوتات

client.on("message", message => {
  if (message.content === prefix + "ls") {
    var list_all = [];
    message.guild.members.forEach(bb => {
      if (!bb.user.bot) return;
      list_all.push(`<@${bb.user.id}>`);
    });
    message.channel.send(list_all.join(", "));
  }
});
        


client.on("message", message => {
  if (message.content.split(" ")[0] === prefix + "رابط") {
    message.channel
      .createInvite({
        thing: true,
        maxUses: 5,
        maxAge: 86400
      })
      .then(invite => message.author.send(invite.url));
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        "** تم ارسال الرابط على الخاص ، اذا لم يصلك افتح الخاص  **"
      )
      .setAuthor(client.user.username, client.user.avatarURL)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setFooter("طلب بواسطة: " + message.author.tag);

    message.channel.sendEmbed(embed).then(message => {
      message.delete(10000);
    });
    const Embed11 = new Discord.RichEmbed().setColor("RANDOM")
      .setDescription(`** مدة الرابط : يوم 
 عدد استخدامات الرابط : 5 **`);

    message.author.sendEmbed(Embed11);
  }
});


client.on("message", message => {
  var args = message.content.split(" ").slice(1);
  var msg = message.content.toLowerCase();
  if (!message.guild) return;
  if (!msg.startsWith(prefix + "role")) return;
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(" **ليس لديك صلاحيات :rolling_eyes:**");
  if (msg.toLowerCase().startsWith(prefix + "rerole")) {
    if (!args[0])
      return message.reply("**:x: يرجى وضع الشخص المراد سحب منه الرتبة**");
    if (!args[1])
      return message.reply("**:x: يرجى وضع الرتبة المراد سحبها من الشخص**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد سحبها من الشخص**");
    if (message.mentions.members.first()) {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          " اانت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.mentions.members.first().removeRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم سحب من **"
      );
    }
    if (args[0].toLowerCase() == "all") {
if (role1.position >= message.member.highestRole.position)//هنا
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members.forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم سحب من الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم سحب من البوتات رتبة**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(

          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم سحب من البشريين رتبة**"//هنا
      );
    }
  } else {
    if (!args[0])
      return message.reply("**:x: يرجى وضع الشخص المراد اعطائها الرتبة**");
    if (!args[1])
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    if (message.mentions.members.first()) {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.mentions.members.first().addRole(role1);
          
      message.mentions.members.first().addRole(role1);
      return message.reply(//هنا
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم اعطاء **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );
      message.guild.members.forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البوتات رتبة**"
      );//هنا
   } else if (args[0].toLowerCase() == "humans") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البشريين رتبة**"
      );
    }
  }
});




        
 
      

 client.on("message", function(message) {
    var prefix = "-";
   if(message.content.startsWith(prefix + "help")) {
    let messageArgs = message.content.split(" ").slice(1).join(" ");
    let messageRPS = message.content.split(" ").slice(2).join(" ");
    let arrayRPS = ['**# - Rock**','**# - Paper**','**# - Scissors**'];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setThumbnail(message.author.avatarURL)
    .addField("Puplic | عامه","👥",true)
    .addField("Admin | ادمنيه","👑",true)
    .addField("Games | العاب","🎮",true)
        .addField("BotRooms | رومات البوت","🤖",true)
    message.channel.send(RpsEmbed).then(msg => {
        msg.react('👥')
        msg.react("👑")
        msg.react("🎮")
                msg.react("🤖")
.then(() => msg.react('👥'))
.then(() =>msg.react('👑'))
.then(() => msg.react('🎮'))
.then(() => msg.react('🤖'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '👥' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '👑' && user.id === message.author.id;
let reaction3Filter = (reaction, user) => reaction.emoji.name === '🎮' && user.id === message.author.id;
let reaction4Filter = (reaction, user) => reaction.emoji.name === '🤖' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 20000 });
       
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 19000 });
let reaction3 = msg.createReactionCollector(reaction3Filter, { time: 18000 });
let reaction4 = msg.createReactionCollector(reaction4Filter, { time: 18000 });
reaction1.on("collect", r => {
  const embed = new Discord.RichEmbed()
      .setThumbnail('https://images-ext-2.discordapp.net/external/JD7xvknBVacXHoC2re78AtJN4PUY5IjUZy1uWIqzObI/https/s3.amazonaws.com/eclincher.wp.upload/wp-content/uploads/2015/08/25155834/people-icon.png')
      .setColor("#000000")
      .setDescription(`
      :busts_in_silhouette:***__اوامر عامة__***:loudspeaker: 
**
『${prefix}tax
『${prefix}user
『${prefix}server
『${prefix}credits
『${prefix}daily
『${prefix}animal
『 ${prefix}server
『${prefix}avt
『${prefix}invites
『${prefix}new
『${prefix}report
**
`)
   message.author.sendEmbed(embed)
      message.reply('تم ارسالك بلخاص')
})
reaction2.on("collect", r => {
      const embed = new Discord.RichEmbed()
  .setThumbnail('https://cdn.discordapp.com/attachments/553862087382925313/556036868492230667/logo-admin-png-4.png')
      .setColor("#000000")
      .setDescription(`
      :key:***__اوامر ادارية__***:crown: 
**
『${prefix}ban
『${prefix}unban
『${prefix}kick
『${prefix}mute
『${prefix}unmute
『${prefix}move
『
『${prefix}clear
『${prefix}role
『${prefix}bans  عشان تشوف كم باند في السيرفر
『${prefix}setIcon
『${prefix}setName
『${prefix}open
『${prefix}close
『${prefix}short
**
`)
   message.author.sendEmbed(embed)
      message.reply('تم ارسالك بلخاص')
})
reaction3.on("collect", r => {
  const embed = new Discord.RichEmbed()
  .setThumbnail('https://images-ext-1.discordapp.net/external/4IGqoA1bqVqu_o2I-jY51fqJFy2S8f8NrzcnzxhFtVU/http/reli.sh/wp-content/themes/relish/assets/img/services/icon-games.png')
      .setColor("#000000")//لاضافه المزيد من الاوامر تعرف السالفه
      .setDescription(`
       :video_game: ***__اوامر العاب__***:game_die:
 **       

『${prefix}صراحة
『${prefix}puz
『${prefix}sr3a
『${prefix}fkk
『${prefix}cuttweets
『 ${prefix}roll
`)
   message.author.sendEmbed(embed)
   message.reply('تم ارسالك بلخاص')
})
reaction3.on("collect", r => {
  const embed = new Discord.RichEmbed()
      .setColor("#000000")
      .setDescription(`
            -=- الرومات اللازمة للبوت -=-
『=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.』
       2-رتبه Support Team   1-الدعوات
『=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.=.』
`)
   message.author.sendEmbed(embed)
})
    })
}
});



//لا تنشر الكود بحقوقك 
//جميع الحقوق محفوظة لدى OT|| The Wolf Is Back
client.on('message', message => {
    if (message.content == prefix + "sr3a") { 
        var x = ["LioN_Dz",
"Death Matches",
"اوتاوا بترولي",
"أرض المعجزات",
"The Wolf",
"العراق",
"ألمملكة ألعربية ألسعودية",
"القسطنطينية",
"النهاية بل البدابة",
"امازون",
"جافاسكربت",
"سهله مو صعبه",
"طبق رطب مرق بقر",
"متجر بلاي",
"شجرة الصنوبر",
"عش العصفور",
"هلا بلخميس هلا هلا",
"الحوت الأزرق",
"حبيبي ولله",
"كنتاكي",
"توكا",
"عادل امام",
"راغب علامة",
"عمان",
"مسقط",
"احبك موت",
"Playing Minecraft",
"Music",
"FaceBooK",
"YouTube",
"Infinity",
"Discor.js",
"My Brother",
"Space",
"Instgram",
"Google",
"Viber",
"WhatsApp",
"People",
"Public",
"Pubg Mobile",
"Free Fire",
"Fortnite",
"ماين كرافت فل داتا",
"ماين كرافت فل اكسس",
"اموت بيك",
"طبق لحم مرقة الدجاج",

];
              var x2 = ["LioN_Dz",
"Death Matches",
"اوتاوا بترولي",
"أرض المعجزات",
"The Wolf",
"العراق",
"ألمملكة ألعربية ألسعودية",
"القسطنطينية",
"النهاية بل البدابة",
"امازون",
"جافاسكربت",
"سهله مو صعبه",
"طبق رطب مرق بقر",
"متجر بلاي",
"شجرة الصنوبر",
"عش العصفور",
"هلا بلخميس هلا هلا",
"الحوت الأزرق",
"حبيبي ولله",
"كنتاكي",
"توكا",
"عادل امام",
"راغب علامة",
"عمان",
"مسقط",
"احبك موت",
"Playing Minecraft",
"Music",
"FaceBooK",
"YouTube",
"Infinity",
"Discor.js",
"My Brother",
"Space",
"Instgram",
"Google",
"Viber",
"WhatsApp",
"People",
"Public",
"Pubg Mobile",
"Free Fire",
"Fortnite",
"ماين كرافت فل داتا",
"ماين كرافت فل اكسس",
"اموت بيك",
"طبق لحم مرقة الدجاج",
        
        
        
        
        ];
        
        var x3 = Math.floor(Math.random()*x.length)
        message.channel.send(` الكملة هي :  __**${x[x3]}**__
لديك 15 ثانية لكتابة الكلمة بسرعة`).then(msg1=> {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 15000,
                errors : ['time']
            })
        r.catch(() => {
            return message.channel.send(`✖لقد انتهى الوقت ولم تكتب الكلمة في الوقت المناشب 
            الإجآبة الصحيحة هي __**${x2[x3]}**__`)
        })
        
        r.then((collected)=> {
            message.channel.send(`${collected.first().author} احسنت عملا لقد كتبت الكلمة قبل انتهاء الوقت✔`);
        })
        }) //OT|| The Wolf Is Back
    }
})

client.on('message', puz => {
    if (puz.content == prefix + "puz") {
        var x = ["ما هي حاسة الشم عند الثعبان🤔 ؟",
"ما هو الشي الذي يكسو الناس و هو عار بدون ملابس🤔 ؟",
"ما هو الشي الذي لا يجري و لا يمشي 🤔؟",
"ما هو إسم الشهر الميلادي الذي إذا حذفت أوله , تحول إلى إسم فاكهه🤔 ؟",
"ما هو الشي الذي لا يدخل الإ إذا ضرب على رأسه 🤔؟",
"ما هو الشيء الذي اسمه على لونه🤔 ؟",
"ما هو الشيء الذي يأكل ولا يشبع🤔؟",
"ما هو الشي الذي كلما زاد نقص 🤔؟",
"ما هي التي تحرق نفسها لتفيد غيرها🤔 ؟",
"كله ثقوب و مع ذلك يحفظ الماء🤔 ؟",
"ما هو الذي لحمه من الداخل و عظمه من الخارج🤔 ؟",
"يستطيع ان يخترق الزجاج من دون كسره فمن هو🤔؟",
];
        var x2 = ['اللسان',
		"الابره",
        "الماء",
		"تموز",
		"المسمار",
		"البيضة",
   "النار", //OT|| The Wolf Is Back
		"العمر",
		"الشمعة",
		"الاسفنج",
		"السلحفاة",
		"الضوء",
        
        
        
        
        ];
        
        var x3 = Math.floor(Math.random()*x.length)
        puz.channel.send(`السؤال هو:  __**${x[x3]}**__
لديك 15 ثانية لحل اللغز`).then(msg1=> {
            var r = puz.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 15000,
                errors : ['time']
            })
        r.catch(() => {
            return puz.channel.send(` ✖لقد انتهى الوقت ولم تحل اللغز
       
           
           `)
           //OT|| The Wolf Is Back
        })
        
        r.then((collected)=> {
            puz.channel.send(`${collected.first().author} احسنت عملا لقد حللت اللغز في قبل انهاء الوقت✔ `);
        })
        })
    }
}) //OT|| The Wolf Is Back

client.on('message', fkk => {
    if (fkk.content == prefix + "fkk") {
        var x = ["المتاح للجميع لا يتاح لي",
"اكرهك بس احبك",
"Minecraft", //OT|| The Wolf Is Back
"بريء بس مذنب",
"بسم الله الرحمن الرحيم",
"الضرورة وقت الحصورة",
"دنيا",
"صارم",
"مات بس عاش", //OT|| The Wolf Is Back
"شعبان بس جوعان",
"ألعراق",
"المملكة العربية السعودية",
"العراق العظيم",
"علي",
];
        var x2 = ['ا ل م ت ا ح ل ل ج م ي ع ل ا ي ت ا ح ل ى',
		"ا ك ر ه ك ب س ا ح ب ك",
        "ف ي ل ا",
		"ب ر ي ء ب س م ذ ن ب",
		"ب س م ا ل ل ه ا ل ر ح م ن ا ل ر ح ي م",
		"ا ل ض ر و ر ة و ق ت ا ل ح ص و ر ة",
		"د ن ي ا",
		"ص ا ر م",
		"م ا ت ب س ع ا ش",
		"ش ع ب ا ن ب س ج و ع ا ن",
		"أ ل ع ر ا ق",
"ا ل م م ل ك ة ا ل ع ر ب ي ة ا ل س و ع و د ي ة",
"ا ل ع ر ا ق ا ل ع ظ ي م",
"ع ل ي",
 
       //OT|| The Wolf Is Back
        
        
        //OT|| The Wolf Is Back
          
      
        
        ];
        
        var x3 = Math.floor(Math.random()*x.length)
        fkk.channel.send(`الكلمة هي :  __**${x[x3]}**__
لديك 15 ثانية لتفكيك الكلمة`).then(msg1=> {
            var r = fkk.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 15000,
                errors : ['time']
            })
        r.catch(() => {
            return fkk.channel.send(`✖ لقد انتهى الوقت ولم تفكك الكلمة في الوقت المناسب
            كان عليك ان تجيب هكذا __**${x2[x3]}**__`)
        }) //OT|| The Wolf Is Back
        
        r.then((collected)=> {
            fkk.channel.send(`${collected.first().author} احسنت عملا لقد فككت الكلمة قبل انتهاء الوقت ✔`);
        })
        }) //OT|| The Wolf Is Back
    }
}); //OT|| The Wolf Is Back

client.on('message', luxy => { 
if (luxy.author.bot) return;
if (luxy.content === prefix+"hhhhhhfgghfghfghyhtytyhfgh ") {
let embed = new Discord.RichEmbed()

.setColor("GREEN")
.setDescription(`**~~=~~ أوامر الالعاب
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
${prefix}fkk

${prefix}sr3a

${prefix}puz

${prefix}كت تويت 

${prefix}صراحة

${prefix}roll

/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ **`)
.setFooter('By The Wolf Is Back')
luxy.channel.send({embed:embed});

}
}); 





client.on('message', async message => {
            if(message.content.includes('https://','discord.gg/')){
                if(message.member.hasPermission("MANAGE_GUILD")) return;
        if(!message.channel.guild) return;
        message.delete()
          var command = message.content.split(" ")[0];
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
           if(!message.channel.guild) return message.reply('');
     message.member.addRole(muterole);
    const embed500 = new Discord.RichEmbed()
      .setTitle("Muted Ads")
            .addField(`**  You Have Been Muted **` , `**Reason : Sharing Another Discord Link**`)
            .setColor("c91616")
            .setThumbnail(`${message.author.avatarURL}`)
            .setAuthor(message.author.username, message.author.avatarURL)
        .setFooter(`${message.guild.name} `)
     message.channel.send(embed500)
     message.channel.send('**تم معاقبتك بميوت ساعه بسبب نشر الروابط اذا كان عن طريق الخطا تكلم مع الاداره**');
   
       
    }
})



client.on('message', message => {
  if(!message.channel.guild) return;
    if (message.content.startsWith(prefix + 'roles')) {
      if (!message.channel.guild) return;
 
        const Rank = message.guild.roles.map(e => e.toString()).join(" ");
 
        const RankList = new Discord.RichEmbed()
            .setTitle('➠ Roles.')
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setColor('RANDOM')
            .setDescription(Rank)
            .setFooter(message.guild.name)
        message.channel.send(RankList)
    }
});




client.on('message', message => {
    if (message.content.startsWith(prefix + "bans")) {
      if (!message.channel.guild) return;
    message.channel
        message.guild.fetchBans()
        .then(bans => message.channel.send(`:small_orange_diamond: **Server Ban List :** ${bans.size} `))
  .catch(console.error);
}
});



var cats = ["https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg","http://www.dogbazar.org/wp-content/uploads/2014/09/british-bull-dog-puppies.jpg","http://cdn2-www.dogtime.com/assets/uploads/gallery/german-shepherd-dog-breed-pictures/standing-7.jpg","http://cdn.akc.org/Marketplace/Breeds/German_Shepherd_Dog_SERP.jpg","https://animalso.com/wp-content/uploads/2016/12/black-german-shepherd_2.jpg","https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpg","https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg","http://www.i-love-cats.com/images/2015/04/12/cat-wallpaper-38.jpg","https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg","https://s-media-cache-ak0.pinimg.com/originals/f0/3b/76/f03b7614dfadbbe4c2e8f88b69d12e04.jpg","http://www.rd.com/wp-content/uploads/sites/2/2016/04/15-cat-wants-to-tell-you-attention.jpg","https://www.thelocal.de/userdata/images/article/fa6fd5014ccbd8f4392f716473ab6ff354f871505d9128820bbb0461cce1d645.jpg","https://www.adelaidezoo.com.au/wp-content/uploads/sites/2/animals/GiantPanda3Slider.jpg","http://imagem.band.com.br/f_230168.jpg"]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'animal')) {
         var cat = new Discord.RichEmbed()
.setImage(cats[Math.floor(Math.random() * cats.length)])
message.channel.sendEmbed(cat);
    }
});



client.on("message" , message => {
    var args = message.content.split(" ");
    var command = args[0];
    var anum = args[1];
    var tax = 5.3; // قيمة الضريبة , بالمئة
    if(command == prefix+"tax"){
        if(!anum){
            return message.reply("`"+command+" <number>`");
        }
        var fnum = Math.floor(anum);
        if(fnum < 0 || fnum == NaN || !fnum){
            return message.reply("**يجب ان تكون القيمة صحيحة.**");
        }
        var taxval = Math.floor(fnum*(tax/100));
        var total = Math.floor(fnum+taxval);
        message.channel.send(`
**
المبلغ الأساسي : ${fnum}
الضريبة : ${tax}%
قيمة الضريبة : ${taxval}
المبلغ مع الضريبة : ${total}
**    
        `);
    }
});




client.on("message", msg =>{
var args = msg.content.split(" ").slice(1).join(" ")
if(!args) return;
if(msg.content.startsWith(prefix+"setIcon")) {
msg.guild.setIcon(args)
 .then(msg.reply("**تمت العمليه ✅ **"))
 .catch(console.error);
}else if(msg.content.startsWith(prefix+"setName")) {
    msg.guild.setName(args)
 .then(g => msg.reply(`**تم تغير اسم السيرفر ${g} :white_check_mark:**`))
 .catch(console.error);
}
});


 






const invites = {};
const wait = require('util').promisify(setTimeout);
client.on('ready', () => {
  wait(1000);
  client.guilds.forEach(king => {
    king.fetchInvites().then(guildInvites => {
      invites[king.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const gamer = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => gamer.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const welcome = member.guild.channels.find(channel => channel.name === "الدعوات");
    welcome.send(` join   ${member} invited by ${inviter}   (  ${invite.uses} invites )  `)
  });
});


//////////////////////////////////////////////////////
  client.on('message',message =>{
 if(message.content.split(' ')[0].toLowerCase() == prefix + 'invites') {
let guild = message.guild
var codes = [""]
 var nul = 0
      
guild.fetchInvites()
.then(invites => {
invites.forEach(invite => {
if (invite.inviter === message.author) {
    nul+=invite.uses
codes.push(`discord.gg/${invite.code}`)
}
 
})
  if (nul > 0) {
      const e = new Discord.RichEmbed()
      .addField(`${message.author.username}`, `لقد قمت بدعوة **${nul}** شخص`)
      .setColor('#36393e')
      message.channel.send(e)
  }else {
                       var embed = new Discord.RichEmbed()
                        .setColor("#000000")
                        .addField(`${message.author.username}`, `لم تقم بدعوة أي شخص لهذة السيرفر`)

                       message.channel.send({ embed: embed });
                        return;
                    }
}).then(m => {
if (codes.length < 0) {
    var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invite codes in ${message.guild.name}`, `You currently don't have any active invites! Please create an invite and start inviting, then you will be able to see your codes here!`)
message.channel.send({ embed: embed });
return;
} else {
    var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invite codes in ${message.guild.name}`, `Invite Codes :\n${codes.join("\n")}`)
.setColor('#36393e')
message.channel.send({ embed: embed });
return;
}
})
}

});


const cuttweets = [
  'كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟',
  'كت تويت | أكثر شيء يُسكِت الطفل برأيك؟',
  'كت تويت | الحرية لـ ... ؟',
  'كت تويت | قناة الكرتون المفضلة في طفولتك؟',
  'كت تويت ‏| كلمة للصُداع؟',
  'كت تويت ‏| ما الشيء الذي يُفارقك؟',
  'كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟',
  'كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟',
  'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
  'كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟',
  '‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟',
  'كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟',
  '‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟',
  '‏كت تويت | وش يفسد الصداقة؟',
  '‏كت تويت | شخص لاترفض له طلبا ؟',
  '‏كت تويت | كم مره خسرت شخص تحبه؟.',
  '‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟',
  '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
  '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
  '‏كت تويت |أقوى كذبة مشت عليك ؟',
  '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
  'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
  '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟',
  '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟',
  '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
  '‏كت تويت | مطلبك الوحيد الحين ؟',
  '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
  'تحب توكسك كودز؟'
]
 
client.on ('message', async (toxicc) => {
  if (!toxicc.guild || toxicc.author.bot) return false;
  var prefix = "-";
  switch (toxicc.content.split(' ') [0]){
    case prefix + 'cuttweets':
      var embed = new Discord.RichEmbed().setTitle("cut tweets")
      .setDescription(cuttweets [Math.floor (Math.random () * cuttweets.length)])
      .setFooter(toxicc.author.tag, toxicc.author.displayAvatarURL)
      toxicc.channel.send (embed);
      break;
  }
})
//By 3Mo_Steve || Toxic Codes


const sarahas = [
  'صراحه  |  صوتك حلوة؟',
  'صراحه  |  التقيت الناس مع وجوهين؟',
  'صراحه  |  شيء وكنت تحقق اللسان؟',
  'صراحه  |  أنا شخص ضعيف عندما؟',
  'صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟',
  'صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟',
  'صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟',
  'صراحه  |  كيفية الكشف عن من يكمن عليك؟',
  'صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟',
  'صراحه  |  أشجع شيء حلو في حياتك؟',
  'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
  'صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟',
  'صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟',
  'صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟',
  'صراحه  |  نظرة و يفسد الصداقة؟',
  'صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟',
  'صراحه  |  شخص معك بالحلوه والمُره؟',
  'صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟',
  'صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟',
  'صراحه  |  وش تتمنى الناس تعرف عليك؟',
  'صراحه  |  ابيع المجرة عشان؟',
  'صراحه  |  أحيانا احس ان الناس ، كمل؟',
  'صراحه  |  مع مين ودك تنام اليوم؟',
  'صراحه  |  صدفة العمر الحلوة هي اني؟',
  'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
  'صراحه  |  صفة تحبها في نفسك؟',
  'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
  'صراحه  |  تصلي صلواتك الخمس كلها؟',
  'صراحه  |  ‏تجامل أحد على راحتك؟',
  'صراحه  |  اشجع شيء سويتة بحياتك؟',
  'صراحه  |  وش ناوي تسوي اليوم؟',
  'صراحه  |  وش شعورك لما تشوف المطر؟',
  'صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟',
  'صراحه  |  ما اكثر شي ندمن عليه؟',
  'صراحه  |  اي الدول تتمنى ان تزورها؟',
  'صراحه  |  متى اخر مره بكيت؟',
  'صراحه  |  تقيم حظك ؟ من عشره؟',
  'صراحه  |  هل تعتقد ان حظك سيئ؟',
  'صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟',
  'صراحه  |  كلمة تود سماعها كل يوم؟',
  'صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟',
  'صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟',
  'صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟',
  'صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟',
  '‏صراحه | هل جرحت شخص تحبه من قبل ؟',
  'صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟',
  '‏صراحه | هل تحب عائلتك ام تكرههم؟',
  '‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟',
  '‏صراحه  |  هل خجلت من نفسك من قبل؟',
  '‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟',
  '‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟',
  '‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟',
   '‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟',
  '‏صراحه  |  ماذا تختار حبيبك أم صديقك؟',
  '‏صراحه  | هل حياتك سعيدة أم حزينة؟',
  'صراحه  |  ما هي أجمل سنة عشتها بحياتك؟',
  '‏صراحه  |  ما هو عمرك الحقيقي؟',
  '‏صراحه  |  ما اكثر شي ندمن عليه؟',
  'صراحه  |  ما هي أمنياتك المُستقبلية؟‏',
]
client.on ('message', async (toxicc) => {
  if (!toxicc.guild || toxicc.author.bot) return false;
  var prefix = "-";
  switch (toxicc.content.split(' ') [0]){
    case prefix + 'صراحة':
      var embed = new Discord.RichEmbed().setTitle("صراحة")
      .setDescription(sarahas [Math.floor (Math.random () * sarahas.length)])
      .setFooter(toxicc.author.tag, toxicc.author.displayAvatarURL)
      toxicc.channel.send (embed);
      break;
  }
});
//By 3Mo_Steve || Toxic Codes


  client.on ('message', async (toxicc) => {
  if (!toxicc.guild || toxicc.author.bot) return false;
  var prefix = '-';
  if (toxicc.content.startsWith(prefix + 'roll')) {
    var args = toxicc.content.split(' ') [1];
    if (!args) return toxicc.channel.send('ارسل رقم');
    if (isNaN (args))return toxicc.channel.send('ارسل ارقام فقط');
    if (args < 1) return toxicc.channel.send('يجب اختيار رقم فوق 0');
    toxicc.channel.send (Math.floor (Math.random() * args));
  }
})
//By 3Mo_Steve || Toxic Codes
	

client.on ('message', async (toxicc) => {
  if (!toxicc.guild || toxicc.author.bot) return false;
  var prefix = "-";
  switch (toxicc.content.split(' ') [0]){
    case prefix + 'invite':
      client.generateInvite(["ADMINISTRATOR"]).then (url => {
        toxicc.channel.send("Invite Link:\n" + url)
      })
      break;
  }
});

//By 3Mo_Steve || Toxic Codes

/*
////كود تيكت
client.on("message", message => {
  if (message.content.startsWith(prefix + "new")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(`لازم تسوي رتبة اسمها \`Support Team\`.`);
    if (
      message.guild.channels.filter(
        Channel =>
          Channel.name == `ticket-${message.author.id}` &&
          Channel.type == "text"
      ).size > 0
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.numbers}`, "text")
      .then(c => {
        let role = message.guild.roles.find(gg => gg.name === "Support Team");
        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.guild.id, {
          READ_MESSAGES: false
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, ${c}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
`Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  } else if (message.content.startsWith(prefix + "closet")) {
    if (!message.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(` لازم تسوي رتبة اسمها \`Support Team\`.`);
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send("This isn't a ticket channel!");
    if (
      !message.member.roles.has(
        message.guild.roles.filter(r => r.name === "Support Team").first().id
      )
    )
      return message.channel.send("You don't have the `Support Team` role!");
message.channel
      .delete()
      .catch(e => message.channel.send("Check my permissions!"));
  }
});


*/



let vipKeys = JSON.parse(fs.readFileSync("./vipKeys.json", "utf8"));
client.on("message", msg=>{
let id = "607334459158822928"; // ايديك
let role = "VIP"; // اسم رتبة الفيب
let Price = 10000; // السعر
let Price2 = Math.floor(Price-(Price*(5/100)));
if(!Price || Price < 1) return;
let cmd = msg.content.split(' ')[0];
if(cmd === `${prefix}buy`){
if(msg.author.bot) return;
if(!msg.channel.guild) return;
let embedvip = new Discord.RichEmbed()
.setColor("#42f4f4")
.setAuthor(msg.author.username, msg.author.displayAvatarURL)
.setThumbnail(msg.author.avatarURL)
.setTitle("**اختر الطريقة المناسبة لك**")
.addField("ل شراء الفي اي بي لنفسك","🔱",true )
.addField("ل شراء الفي اي بي ك هدية","🎁",true)
.setTimestamp()
.setFooter(client.user.username,client.user.displayAvatarURL);
msg.channel.send(embedvip).then(msgs2 =>{
msgs2.react("🔱").then(()=>{
  msgs2.react("🎁").then(()=>{
    const me = (reaction, user) => reaction.emoji.name === '🔱' && user.id === msg.author.id;
    const gift = (reaction, user) => reaction.emoji.name === '🎁' && user.id === msg.author.id;
    const mec = msgs2.createReactionCollector(me, {time: 120000});
    const giftc = msgs2.createReactionCollector(gift, {time: 120000});
mec.on("collect", r=>{  
msgs2.delete()
if(msg.member.roles.find(r=>r.name == role)) return msg.reply("انت تمتلك الرتبة مسبقًا");
let roleW = msg.guild.roles.find(r=>r.name == role);
if(!roleW) return msg.reply(`البوت مقفل لعدم وجود رتبة ب أسم \`${role}\``)
msg.channel.send(`كردت بروبوت\`${Price}\` لديك 4 دقائق لتحويل
إلى ${msg.guild.members.get(id)}
`).then( msgs =>{
const filter = response => response.author.id == "282859044593598464" && response.mentions._content.includes(`:moneybag: | ${msg.author.username}, has transferred \`$${Price2}\` to ${msg.guild.members.get(id)}`);
msg.channel.awaitMessages(filter, { maxMatches: 1, time: 240000, errors: ['time'] })
.then( collected =>{
msgs.delete()
msg.reply(`تم اعطائك رتبة \`${role}\``);
msg.member.addRole(roleW);
}).catch(e => {});
})})
giftc.on("collect", r=>{
  msgs2.delete()
  let roleW = msg.guild.roles.find(r=>r.name == role);
  if(!roleW) return msg.reply(`البوت مقفل لعدم وجود رتبة ب أسم \`${role}\``)
msg.channel.send(`كردت بروبوت\`${Price}\` لديك 4 دقائق لتحويل
إلى ${msg.guild.members.get(id)}
`).then( msgs =>{
  const filter = response => response.author.id == "282859044593598464" && response.mentions._content.includes(`:moneybag: | ${msg.author.username}, has transferred \`$${Price2}\` to ${msg.guild.members.get(id)}`);
  msg.channel.awaitMessages(filter, { maxMatches: 1, time: 240000, errors: ['time'] })
  .then( collected =>{
  msgs.delete()
  genKey(msg,roleW);
  }).catch(e => {});
  })
})
})})})
///
}
if(cmd === `${prefix}used`){
  let args = msg.content.split(" ").slice(1)[0];
  if(!args) {   
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - **الرجاء ادخال كود الهدية** \`${prefix}used <Key>\``)
    msg.reply(embed).then( z => z.delete(3000));
    return
}
  let embed = new Discord.RichEmbed()
.setTitle(`**جاري التحقق من الكود**`)
.setColor("#42f4f4")
  msg.reply(embed).then( msgs =>{
  if(vipKeys[args]){
    let hav = msg.member.roles.find(`name`, vipKeys[args].name);
    if(hav){
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **انت تمتلك هذه الرتبة مسبقًا**  \`${vipKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    return
    }
    let embed = new Discord.RichEmbed()
    .setTitle(`:tada: - **مبروك تم اعطائك رتبة** \`${vipKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    msg.member.addRole(vipKeys[args]);
    delete vipKeys[args]
    save()
  }else{
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **الكود غير صيحيح أو انه مستعمل من قبل**`)
    .setColor("#42f4f4")
    msgs.edit(embed)
  }});
}
});

function genKey(msg,role){
  var randomkeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var gift = "";
  for (var y = 0; y < 16; y++) {   ///16
    gift +=  `${randomkeys.charAt(Math.floor(Math.random() * randomkeys.length))}`;
  }
  vipKeys[gift] = role;
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:ok_hand: - **تم ارسآل الكود على الخاص**`);
  msg.reply(embed);
  let embed2= new Discord.RichEmbed()
  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
  .setThumbnail(msg.author.avatarURL)
  .addField("**Key Of Gift**", gift,true)
  .addField("Role",vipKeys[gift].name,true)
  .addField("This Key Made by", msg.author, true)
  .addField("The Room", msg.channel , true)
  .setTimestamp()
  .setFooter(client.user.username,client.user.displayAvatarURL)  
  msg.author.send(embed2);
  save()
}

function save(){
  fs.writeFile("./vipKeys.json", JSON.stringify(vipKeys), (err) => {
    if (err) console.log(err)
  });

}


client.on('guildMemberAdd', mem => {
let gg = mem.guild.roles.find(hh => hh.name.includes('MEMBER'));
if(!gg) return
mem.addRole(gg).catch(gg => console.log(gg.message))
});




client.on('guildMemberUpdate', (ninja, ot,) => {
if(ninja.roles.size < ot.roles.size) {
 let role = ot.roles.filter(r => !ninja.roles.has(r.id)).first();
            let embed = new Discord.RichEmbed()
            .setThumbnail(ninja.guild.iconURL)
            .setColor('RANDOM')
            .setDescription(`
**New Role**
 
**✨ Role Name:** ( ${role.name} )
 
**🔗 Server:** ${ot.guild.name}`)
            .setTimestamp()
           .setFooter(`🔰 Guild ID : ${ninja.guild.id}`) 
            ot.user.send(embed); 
}
});




client.on('message', message => {

 if (message.content.startsWith(prefix + 'short')) {
   if (!message.channel.guild) return;
    message.channel
   if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send('**ليس لديك صلاحيات**');
    let args = message.content.split(" ").slice(1);
  if (!args[0]) return message.channel.send('**استعمل**: '+ prefix +'short <رابط>')
  if (!args[1]) {
    shorten.shorten(args[0], function(res) {
      if (res.startsWith('Error:')) return message.channel.send('**Usage**: '+ prefix +'short <link>');
      message.channel.send(`اختصار الرابط:**${res}**`);
    })
  } else {
    shorten.custom(args[0], args[1], function(res) {
      if (res.startsWith('Error:')) return message.channel.send(`اختصار الرابط:**${res}**`);
      message.channel.send(`اختصار الرابط:**${res}**`);
})
}}
});



client.on('message', wolf => {
    if (wolf.content === "-cr") {

wolf.guild.createRole({ name: "1", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "2", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "3", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "4", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "5", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "6", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "7", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "8", color: "RANDOM", permissions: [] })


wolf.guild.createRole({ name: "10", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "11", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "12", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "13", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "14", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "15", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "16", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "17", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "19", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "20", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "21", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "22", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "23", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "24", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "25", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "26", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "27", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "28", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "29", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "30", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "31", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "32", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "33", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "34", color: "RANDOM", permissions: [] })


wolf.guild.createRole({ name: "35", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "36", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "37", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "38", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "39", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "40", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "41", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "42", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "43", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "44", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "45", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "46", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "47", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "48", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "49", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "50", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "51", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "52", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "53", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "54", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "55", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "56", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "57", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "58", color: "RANDOM", permissions: [] })


wolf.guild.createRole({ name: "59", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "60", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "61", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "62", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "63", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "64", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "65", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "66", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "67", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "68", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "69", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "70", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "71", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "72", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "73", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "74", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "75", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "76", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "77", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "78", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "79", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "80", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "81", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "82", color: "RANDOM", permissions: [] })


wolf.guild.createRole({ name: "83", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "84", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "85", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "86", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "87", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "88", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "89", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "90", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "91", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "92", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "93", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "94", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "95", color: "RANDOM", permissions: [] })
                     wolf.guild.createRole({ name: "96", color: "RANDOM", permissions: [] })
                    
wolf.guild.createRole({ name: "97", color: "RANDOM", permissions: [] })
       
   wolf.guild.createRole({ name: "98", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "99", color: "RANDOM", permissions: [] })

wolf.guild.createRole({ name: "100", color: "RANDOM", permissions: [] })


wolf.channel.send(' ** تم صنع الرتب بنجاح✔** ')
}
});

  

//كود للتجربة
/*
const credits = JSON.parse(fs.readFileSync("./creditsCode.json", "utf8"));
const coolDown = new Set();

client.on("message", message => {
  const args = message.content.split(" ");
  const credits = require("./creditsCode.json");
  const path = "./creditsCode.json";
  const mention =
    message.mentions.users.first() ||
    client.users.get(args[1]) ||
    message.author;
  const mentionn = message.mentions.users.first() || client.users.get(args[1]);
  const author = message.author.id;
  const balance = args[2];
  const daily = Math.floor(Math.random() * 350) + 10;

  if (!credits[author]) credits[author] = { credits: 50 };
  if (!credits[mention.id]) credits[mention.id] = { credits: 50 };
  fs.writeFile(path, JSON.stringify(credits, null, 5), function(err) {
    if (err) console.log(err);
  });

  if (message.content.startsWith(prefix + "credit")) {
    if (args[0] !== `${prefix}credit` && args[0] !== `${prefix}credits`) return;

    if (args[2]) {
      if (isNaN(args[2]) || args[2] < 0)
        return message.channel.send(
          `:interrobang: **| ${message.author.username}, type the credit you need to transfer! **`
        );
      if (mention.bot)
        return message.channel.send(
          `**:heavy_multiplication_x:| ${
            message.content.split(" ")[1]
          } لم يتم العثور على**`
        );
      if (mention.id === message.author.id)
        return message.channel.send(
          "**:heavy_multiplication_x:| لا يمكنك تحويل كردت لنفسك**"
        );
      if (credits[author].credits < balance)
        return message.channel.send(
          `** :thinking: | ${message.author.username}, Your balance is not enough for that!**`
        );
      var one = Math.floor(Math.random() * 9) + 1;
      var two = Math.floor(Math.random() * 9) + 1;
      var three = Math.floor(Math.random() * 9) + 1;
      var four = Math.floor(Math.random() * 9) + 1;

      var number = `${one}${two}${three}${four}`;

      message.channel
        .send(`**:heavy_dollar_sign:| \`${number}\`, أكتب الرقم للأستمرار**`)
        .then(m => {
          message.channel
            .awaitMessages(m => m.author.id === message.author.id, {
              max: 1,
              time: 10000
            })
            .then(c => {
              if (c.first().content === number) {
                m.delete();
                message.channel.send(
                  `**:moneybag: | ${message.author.username}, has transferred \`${balance}\` to ${mention}**`
                );
                credits[author].credits += -balance;
                credits[mention.id].credits += +balance;
                fs.writeFile(path, JSON.stringify(credits, null, 100), function(
                  err
                ) {
                  if (err) console.log(err);
                });
              } else if (c.first().content !== number) {
                m.delete();
                message.channel.send(
                  `** :money_with_wings: | تم الغاء الإرسال**`
                );
              }
            });
        });
    }
    if (!args[2]) {
      if (mention.bot)
        return message.channel.send(
          `:interrobang:**| ${message.author.username}, I can't find** ${
            message.content.split(" ")[1]
          }**!**`
        );
      message.channel.send(
        `**${mention.username}, your :credit_card: balance is** \`$${credits[mention.id].credits}\`**.** `
      );
    }
  }
  if (args[0].toLowerCase() === `${prefix}daily`) {
    if (credits[message.author.id].daily != moment().format("L")) {
      credits[message.author.id].daily = moment().format("L");

      let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
      credits[author].credits += ammount;

      message.channel.send(
        `**:atm: | ${message.author.username}, you received your :yen: ${ammount} daily credits!**`
      );
      fs.writeFile("./creditsCode.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    } else {
      message.channel.send(
        `:stopwatch: : **Please cool down  ${moment()
          .endOf("day")
          .fromNow()}**`
      );
    }
  }
});

*/

client.on("message", async message => {
  if(message.content.startsWith(prefix + "feed")) { 
    let feednumber = message.content.split(" ").slice(1)
    let feedstr = message.content.split(" ").slice(2).join(" ");
    let feednumber1 = parseInt(feednumber)
    if (!feednumber1 || !feedstr || isNaN(parseInt(feednumber)) || parseInt(feednumber)<0 || parseInt(feednumber)>5) return message.channel.send(`:x:`)
    if(feednumber1>5) return message.channel.send(`:x:`)
    let stararray = []
    for(i=0; i<feednumber1; i++) {
      stararray.push("⭐")
    }
    let embed = new Discord.MessageEmbed()
    .setTitle(`New review`)
    .addField(`Stars:`, `${stararray.join("") || `No Stars`}`)
    .addField(`Comment:`, `${feedstr}`)
    .addField(`From:`, `${message.author}`)
    .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    .setFooter(`${message.guild.name}`);
    await message.channel.send(embed)
  }
})




client.on('message' , async (message) => {
var prefix = "-"
    if(message.content.startsWith(prefix + "top invite")) {
if(message.author.bot) return;
if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
  var invites = await message.guild.fetchInvites();
    invites = invites.array();
    let possibleInvites = ['User Invited |  Uses '];
    invites.forEach(i => {
        if (i.uses === 0) { 
            return;
        }
      possibleInvites.push(['\n\ ' +'<@'+ i.inviter.id +'>' + '  :  ' +   i.uses]);
      if (i.uses === 10) {
          message.member.addRole(message.member.guild.roles.find("name",""))//هنآ أسم ألرتبه اللي تجيهه
.catch(RebeL =>{
console.log('`Error`: ' + RebeL);
});
}
if (i.uses === 20) {
message.member.addRole(message.member.guild.roles.find("name",""))
.catch(RebeL =>{
console.log('`Error`: ' + RebeL);
});
}
if (i.uses === 30) {
message.member.addRole(message.member.guild.roles.find("name",""))
.catch(RebeL =>{
console.log('`Error`: ' + RebeL);
});
      }
    })
    const embed = new Discord.RichEmbed()
 .setColor('#36393e')
    .addField("Top Invites." ,`${(possibleInvites)}`)

    message.channel.send(embed)
    }
});


client.on("message", message => {
  if(message.content.startsWith(prefix + "ibot")) {
    var mbot = message.mentions.members.first()
    message.channel.send(`https://discordapp.com/api/oauth2/authorize?client_id=${mbot.id}&permissions=0&scope=bot`)
  }
});



client.on('message', async ninja => {
if(ninja.content.startsWith(prefix + "owner")) {
  if(!ninja.channel.guild) return;
  let i = client.users.size;
  if(ninja.author.id !== '607334459158822928') return ninja.channel.send('❎');
  ninja.channel.send("✅")
}
})












            





client.on("ready", function() {
  var ms = 10000;

  var setGame = [
    "-help لروئيه الاوامر",
    `${client.guilds.size} السيرفرات`,
    `${client.users.size} الاعضاء`,
    `-invite لدعوه البوت`,
    `من احسن البوتات العربية   `,
    `قريبا اوامر و اشياء جديده انتظرونا`,
    `سيتوفر مشروع البوت قريبا`,
    "انشر البوت حب"
     
  ];

  var i = -1;

  var j = 0;

  setInterval(function() {
    if (i == -1) {
      j = 1;
    }

    if (i == setGame.length - 1) {
      j = -1;
    }

    i = i + j;

    client.user.setGame(setGame[i], `http://twitch.tv/S-F`);
  }, ms);

  console.log(`Logged in as ${client.user.tag}!`);

  console.log("وتف");

  console.log("");

  console.log(
    "╔[═════════════════════════════════════════════════════════════════]╗"
  );

  console.log(`[Start] ${new Date()}`);

  console.log(
    "╚[═════════════════════════════════════════════════════════════════]╝"
  );

  console.log("");

  console.log("╔[════════════════════════════════════]╗");

  console.log(`Logged in as * [ " ${client.user.username} " ]`);

  console.log("");

  console.log("Informations :");

  console.log("");

  console.log(`servers! [ " ${client.guilds.size} " ]`);

  console.log(`Users! [ " ${client.users.size} " ]`);

  console.log(`channels! [ " ${client.channels.size} " ]`);

  console.log("╚[════════════════════════════════════]╝");

  console.log("");

  console.log("╔[════════════]╗");

  console.log(" Bot Is Online");

  console.log("╚[════════════]╝");

  console.log("");

  console.log("");
});
 



client.on('message', msg => {
if (msg.author.bot) return;
let args = msg.content.split(" ").slice(1).join(" ")
if (msg.content.startsWith(prefix+"say")) {
msg.delete(100);
const embed = new Discord.RichEmbed()
  .setColor(`RED`)
  .setDescription(args)
msg.channel.sendEmbed(embed)

}
});





client.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    var messages = message.content.split(" ").slice(1);

    let args = messages.slice(1); 

  
    if(message.content.startsWith(prefix + 'report')){
        let msg = message;


        if(message.guild.member(message.author).roles.get(msg.guild.roles.find(role => role.name === `banned_report`))) return message.reply('**لقد تم حظرك لا يمكنك ابلاغ احد**').then(m => {m.delete(3000)}); //لو حد عنده هل رتبة ما رح يقدر يسوي ريبورت 

        var reports_channel = message.guild.channels.find('name', '𝐀𝐥𝐥-𝐫𝐞𝐩𝐨𝐫𝐭') // اسم الروم الي تجيه الريبورتات

        if(!reports_channel) return message.reply('**I cant find reports room.**').then(m => {m.delete(3000)});
        
        var mention = message.mentions.users.first();
        
        if(!mention) return message.reply('**Please, mention a member.**').then(m => {m.delete(3000)});

        if(mention.id == message.author.id) return message.reply('**You cant report yourself**').then(m => {m.delete(3000)});
        
        if(message.guild.member(mention).hasPermission("MANAGE_MESSAGES")) return message.reply('**You cant report this user.**').then(m => {m.delete(3000)}) //لو شخص عنده هل برمشن ماحد رح يقدر يسويله ريبورت
        
        if(mention.id == message.guild.owner.id) return message.reply('**You cant report the owner.**').then(m => {m.delete(3000)});


        var reason = args.join(" ");

        if(!reason) return message.reply('**Please, specify a reason.**').then(m => {m.delete(3000)});
        var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`NEW REPORT`)
        .setThumbnail(message.author.avatarURL)
        .addField('**Reporter Name: **', `<@${message.author.id}> ID [ ${message.author.id} ]`, true)
        .addField('**ReportedUser Name: **', `${mention} ID [ ${mention.id} ]`, true)
        .addField('**Time** ', `[ ${moment(message.createdAt).format('D/MM/YYYY h:mm a')} ]`, true)
        .addField('**reason: **', `[ ${reason} ]`, true)
        .addField('**Channel: **', `${message.channel}`, true)
        reports_channel.send(embed)
        message.channel.send('**تم البلاغ, نشكرك على  مساعدتنا**').then(message => {message.delete(3000)});
    }
});
    

client.on('message', message => {
if (message.content === "t") {
let me = message.author
me.send("هاي");
  message.react("✅") 
}})


client.on('message', message => {
  if(message.content.startsWith("r"))  {
var aa = new Discord.MessageEmbed() 
.setColor('RANDOM')

.setTitle("تم البرمجه من alialmalk و طماطه")
// اتركني اصحح 

.setDescreiption("[سيرفر السبورت](https://discord.gg/qxraAyNT)")
        message.channel.send('** , نشكرك على  مساعدتنا**').then(message => {message.delete(3000)});

// معرف الايبمد aa مسوية انت
}}) 
// ثوزني




// خطئك عندك كثير كلينت ضيف هاذ

			
client.login("NzMxNzU1MDgwOTQzOTI3MzQ3.XwqqBg.JVKIEFKdW_Eurge2xgiKLYZhbCU");
. 