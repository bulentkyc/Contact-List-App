const express = require('express');
const router = express.Router();
const controller = require('./contoller');

router.get('/', controller.homeRoute);

module.exports = router;