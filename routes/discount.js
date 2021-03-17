var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js'); //含入資料庫連線


//折價券
router.get('/', function(req, res, next) {
    res.render("discount", { data: req.session.user });
});

// 折價券資料
router.get('/ticket', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM ticket where userEmail="' + req.session.user + '"', function(err, result) {

            if (err) {
                console.log(JSON.stringify(err));
                return;
            }

            res.send(JSON.stringify(result));

        });
    } else {
        res.redirect('/');
    }
});
// 折價券資料增加xbox
router.put('/ticketxbox', function(req, res, next) {

    if (req.session.user) {
        pool.query('UPDATE ticket SET  `xbox_discount`= xbox_discount+1 , `receive_date`= NOW() where userEmail="' + req.session.user + '"');
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
// 折價券資料增加ps4
router.put('/ticketps4', function(req, res, next) {

    if (req.session.user) {
        pool.query('UPDATE ticket SET   ps4_discount=  ps4_discount+1 , `receive_date`= NOW() where userEmail="' + req.session.user + '"');
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
// 折價券資料增加NS
router.put('/ticketNS', function(req, res, next) {

    if (req.session.user) {
        pool.query('UPDATE ticket SET  switch_discount= switch_discount+1 , `receive_date`= NOW() where userEmail="' + req.session.user + '"');
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
// 折扣碼資料
router.get('/dscode', function(req, res, next) {

    pool.query('SELECT * FROM discount_code ', function(err, result) {

        if (err) {
            console.log(JSON.stringify(err));
            return;
        }

        res.send(JSON.stringify(result));

    });

});


module.exports = router;