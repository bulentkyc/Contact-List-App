const express = require('express');
const router = express.Router();
const controller = require('./contoller');

router.get('/', controller.homeRoute);

router.post('/newContact', controller.newContact);

module.exports = router;