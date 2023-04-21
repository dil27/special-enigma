const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const client = new Client ({
    authStrategy: new LocalAuth({
        clientId: "client-one"
    })
});

client.initialize();

module.exports = client;