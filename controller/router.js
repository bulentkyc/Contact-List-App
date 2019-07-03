const express = require('express');
const router = express.Router();
const controller = require('./contoller');

router.get('/', controller.homeRoute);

router.post('/newContact', controller.newContact);

router.post('/deleteContact', controller.deleteContact);

module.exports = router;