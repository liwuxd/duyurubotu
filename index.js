const { Client, GatewayIntentBits, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

// Bot istemcisini oluştur
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Bot hazır olduğunda
client.once('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);

  // Slash komutlarını tanımla
  const duyuru = new SlashCommandBuilder()
    .setName('duyuru')
    .setDescription('Duyuru yapar')
    .addStringOption(option =>
      option.setName('mesaj')
        .setDescription('Duyuru mesajı')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator); // Sadece adminler kullanabilir

  // Komutları kaydet
  client.application.commands.create(duyuru);
});

// Slash komutlarını işle
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'duyuru') {
    // Kullanıcının yetkisini kontrol et
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      await interaction.reply({ content: 'Bu komutu kullanmak için yönetici yetkisine sahip olmalısın!', ephemeral: true });
      return;
    }

    // Mesajı al
    const mesaj = interaction.options.getString('mesaj');
    
    // Hedef kanalı bul
    const kanal = client.channels.cache.get('1369305429842202634');
    if (!kanal) {
      await interaction.reply({ content: 'Belirtilen kanal bulunamadı!', ephemeral: true });
      return;
    }

    // Mesajı italik olarak gönder
    await kanal.send(`*${mesaj}*`);
    await interaction.reply({ content: `Duyuru <#1369305429842202634> kanalına gönderildi!`, ephemeral: true });
  }
});

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.`);
});

// Botu başlat
client.login('process.env.token'); // Buraya bot token'ınızı ekleyin
