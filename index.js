const { Client , LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: {
		args: ['--no-sandbox','--disable-setuid-sandbox'],
	}
})
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log(qr);
  });


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    if (msg.body === 'ping') {
        msg.reply('pong');
    }else if(msg.type === 'image'){
        const media = await msg.downloadMedia();
        client.sendMessage(msg.from, media, {sendMediaAsSticker:true})
    }else{
        msg.reply(`I'm a Sticker Bot🤖 \n\nSend me a photo to convert into a Sticker 🖼️ \n \nProgrammed by Dhanilka Demonio </> `)
    }
});

client.initialize();
