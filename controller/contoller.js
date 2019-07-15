const multer = require('multer');
const path = require('path');
const jimp = require('jimp');
const nodemailer = require('nodemailer');
const contacts = require('../model/contacts');


let contactList = [];
let fileName = '';
//set storage engine for avatar
const storager = multer.diskStorage({
    destination: 'public/uploads/avatars',
    filename: (req, file, cb) => {
        fileName = 'av.' + 
                    Date.now() + 
                    path.extname(file.originalname);
                    cb(null, fileName);
    }
});

//init upload for avatar
const upload = multer({
    storage: storager
}).single('avatar');

//set storage engine for email
const attachStorager = multer.diskStorage({
    destination: 'public/uploads/attachments',
    filename: (req, file, cb) => {
        fileName = 'at.' + 
                    Date.now() + 
                    path.extname(file.originalname);
                    cb(null, fileName);
    }
});

//init upload for email
const attachUpload = multer({
    storage: attachStorager
}).single('attach');

exports.homeRoute = (req,res) => {
    contacts.find({},(err, result)=>{
        if (err) {
            console.log(err);       
        } else {
            res.render('index',{contactData: result});
        }
    });
    
}

exports.newContact = (req,res) => {
    upload(req, res, () => {
        //check if there is a photo
        if (fileName == null || fileName == undefined || fileName == '') {
            fileName = 'av.default.png';
        } else {
            //On here we will process the image resizing
            jimp.read('public/uploads/avatars/' + fileName, (err, file) => {
                if(err) throw err;
                file
                    .resize(250,250) //resize
                    .quality(60) // set the quality of image
                    .write('public/uploads/avatars/' + fileName); //save
            });
        }
        let newContact = {
            name: req.body.name,
            mail: req.body.email,
            avatar: fileName
        }
        //mongo goes here...
        contacts.create(newContact,(err,contacts)=>{
            if(err) concole.log(err);
            else console.log(`Congrads! Your new contact inserted:${JSON.stringify(newContact)}`);
        });

        contactList.push(newContact);
        console.log(contactList);

        res.redirect('/');
    });

}

 //This function gets the ID and delete contact from contactList array
exports.deleteContact = (req,res) => {
    //const {id} = req.params;
    //console.log(id);

    contacts.findOneAndRemove({_id:req.params.id},
    (err,result)=>{
        if(err) console.log(err);
        else console.log(result);
    });

    res.redirect('/');

}

exports.sendMail = (req, res) => {
    attachUpload(req, res, ()=>{
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: req.body.user, // generated ethereal user
            pass: req.body.pass // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info =  {
            from: '"FBW6 Contact List Project 👻" <fb6@dci.com>', // sender address
            to: req.body.to, // list of receivers
            cc: req.body.cc,
            subject: req.body.subject, // Subject line
            html: "<b>"+req.body.message+"</b>", // html body
            attachments: [{
                filename:fileName,
                path: 'public/uploads/attachments/' + fileName
            }]
        };

        transporter.sendMail(info, (err,info)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Message sent to : ' + info.messageId);
            }
        });

        
        res.redirect('/');

        
    });
}

exports.updateContact = (req,res) => {
    upload(req, res, () => {
        console.log(req.body)
        
        //mongo goes here...
        contacts.updateOne({_id:req.body.id},{
            name: req.body.name,
            mail: req.body.email,
            avatar: fileName
        },
        (err,result)=>{
            if(err) console.log(err);
            else console.log(result);
        });

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