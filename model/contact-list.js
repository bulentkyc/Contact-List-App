const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact-list',
{ useNewUrlParser: true});

module.exports = mongoose;

