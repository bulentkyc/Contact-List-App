const db = require('./contact-list');

let contactSchema = new db.Schema({
    name: {type: String, trim: true, minlength:1},
    mail: {type: String, required: 'Without e-mail this app does not work!'},
    avatar: String
});

let contacts = db.model('contacts', contactSchema);

module.exports = contacts;