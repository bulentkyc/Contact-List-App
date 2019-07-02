const multer = require('multer');
const path = require('path');

let contactList = [];
let fileName = '';
//set storage engine
const storager = multer.diskStorage({
    destination: 'public/uploads/avatars',
    filename: (req, file, cb) => {
        fileName = 'av.' + 
                    Date.now() + 
                    path.extname(file.originalname);
                    cb(null, fileName);
    }
});

//init upload
const upload = multer({
    storage: storager
}).single('avatar');

exports.homeRoute = (req,res) => {
    res.render('index',{contactData: contactList});
}

exports.newContact = (req,res) => {
    upload(req, res, () => {
        let newContact = {
            name: req.body.name,
            email: req.body.email,
            avatar: fileName
        }
        contactList.push(newContact);
        console.log(contactList);

        //On here we will process the image for resizing

        res.redirect('/');
    });

}