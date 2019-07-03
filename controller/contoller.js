const multer = require('multer');
const path = require('path');
const jimp = require('jimp');

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

        //On here we will process the image resizing
        jimp.read('public/uploads/avatars/' + fileName, (err, file) => {
            if(err) throw err;
            file
                .resize(250,250) //resize
                .quality(60) // set the quality of image
                .write('public/uploads/avatars/' + fileName); //save
        });
        res.redirect('/');
    });

}

 //This function gets the ID and delete contact from contactList array
exports.deleteContact = (req,res) => {
    const {index} = req.params;
    console.log(index);

    contactList.splice(index,1);

    res.redirect('/');

}