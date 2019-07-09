const db = require('./contact-list');

let contactSchema = new db.Schema({
    name: String,
    mail: String,
    avatar: String
});

let contacts = db.model('contacts', contactSchema);

module.exports = contacts;