const client = require('./whatsapp.js');

const authCheck = (req, res) => {
    if (client.info) {
        res.status(200).json({
            status: true,
            url: req.url,
            message: `Client is authenticated with this number: ${client.info.wid.user}`
        })
    } else {
        res.status(200).json({
            status: false,
            url: req.url,
            message: "Client not authenticated with any numbers."
        })
    }
}

module.exports = authCheck;