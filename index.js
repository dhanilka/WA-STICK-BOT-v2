const { Client , NoAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
    puppeteer: {
		args: ['--no-sandbox','--disable-setuid-sandbox'],
	}
    );

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log(qr);
  });


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
