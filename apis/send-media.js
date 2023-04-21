const { body, validationResult } = require('express-validator');
const { phoneNumberFormatter, userCheck } = require('./helper.js');
const fs = require('fs');
const client = require('./whatsapp.js');
const { MessageMedia } = require('whatsapp-web.js');

const sendMedia = async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => {
        return msg
    });

    if (!error.isEmpty()) {
        return res.status(422).json({
            status: false,
            url: req.url,
            message: error.mapped()
        })
    }
    let phoneNumber = phoneNumberFormatter(req.body.phoneNumber);
    let message = req.body.message || '';
    let media = await MessageMedia.fromUrl(req.body.imageUrl);

    const isRegistered = await userCheck(phoneNumber);

    if (!isRegistered) {
        return res.status(422).json({
            status: false,
            url: req.url,
            message: `The number is not registered`
        })
    }

    client.sendMessage(phoneNumber, media, { caption: message }).then(response => {
        res.status(200).json({
            status: true,
            url: req.url,
            response: {
                data: `message sent.`,
                message: message,
                reciepent: phoneNumber.replace('@c.us', ''),
                timestamp: response.timestamp
            }
        })
    }).catch(err => {
        res.status(500).json({
            status: false,
            url: req.url,
            response: `Error. The client is not ready.`
        })
    });
}

module.exports = sendMedia;