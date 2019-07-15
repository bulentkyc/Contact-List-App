const express = require('express');
const router = express.Router();
const controller = require('./contoller');

router.get('/', controller.homeRoute);

router.post('/newContact', controller.newContact);

router.get('/deleteContact/:id', controller.deleteContact);

router.post('/sendMail', controller.sendMail);

router.post('/updateContact', controller.updateContact);

module.exports = router;