const express = require('express');
const { body, validationRequest } = require('express-validator');
const path = require('path');
const authCheck = require('../apis/auth-check.js');
const sendMessage = require('../apis/send-message.js');
const sendMedia = require('../apis/send-media.js');
const sendButton = require('../apis/send-button.js');
const sendList = require('../apis/send-list.js');
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('./views/home.html'));
});

route.post('/send-message', [
    body('phoneNumber').notEmpty(),
    body('message').notEmpty()
], sendMessage);
route.get('/send-message', (req, res) => {
    res.status(500).json({
        success: false,
        url: req.url,
        message: "URL ini hanya dapat dipanggil menggunakan method POST"
    })
});

route.post('/send-media', [
    body('phoneNumber').notEmpty(),
    body('imageUrl').notEmpty()
], sendMedia);
route.get('/send-media', (req, res) => {
    res.status(500).json({
        success: false,
        url: req.url,
        message: "URL ini hanya dapat dipanggil menggunakan method POST"
    })
});

route.post('/send-button', [
    body('phoneNumber').notEmpty(),
    body('message').notEmpty(),
    body('buttons').notEmpty(),
    body('buttons.buttons').notEmpty()
], sendButton);
route.get('/send-button', (req, res) => {
    res.status(500).json({
        success: false,
        url: req.url,
        message: "URL ini hanya dapat dipanggil menggunakan method POST"
    })
});

route.post('/send-list', [
    body('phoneNumber').notEmpty(),
    body('message').notEmpty(),
    body('list').notEmpty(),
    body('list.sections').notEmpty()
], sendList);
route.get('/send-list', (req, res) => {
    res.status(500).json({
        success: false,
        url: req.url,
        message: "URL ini hanya dapat dipanggil menggunakan method POST"
    })
});

route.post('/auth-check', authCheck);

module.exports = route;