require('dotenv').config();
var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact', { data: req.session.user });
});



router.post('/', function(req, res, next) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.ACCOUNT,
            pass: process.env.PASSWORD,
        }
    });
    var mailOption = {
        form: '"管理員"<guanliyuan87@gmail.com>',
        to: req.body.email,
        cc: 'guanliyuan87@gmail.com',
        subject: req.body.username + '填寫了意見回饋給您',
        text: req.body.content
    }
    transporter.sendMail(mailOption, function(error, info) {
        if (error) {
            console.log('錯誤訊息:' + error);
            res.redirect('/contact');
            return
        }
        console.log('發送成功');
        res.redirect('/contact');
    })
});



module.exports = router;