var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js'); //含入資料庫連線
const e = require('express');


/* GET users listing. */
router.get('/', function(req, res, next) {
    var id = req.query.id;

    pool.query('SELECT * FROM product ,product_type,product_style WHERE product.styleID=product_style.styleID AND product.typeID =product_type.typeID AND product.productID =?', [id],
        function(err, rows) {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }

            res.render('pdMsg', { data: req.session.user, rows: rows });


        }
    );

});

// 收藏 Json
router.get('/collect', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM `favorite` , product where favorite.productID=product.productID and userEmail =?', [req.session.user], function(err, result) {

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
// 加入收藏
router.post('/collect', function(req, res, next) {

    if (req.session.user) {
        pool.query('INSERT INTO `favorite` SET ?', [{
            userEmail: req.session.user,
            productID: req.query.id
        }]);
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
// 收藏刪除
router.delete('/collect', function(req, res, next) {

    if (req.session.user) {
        pool.query('DELETE FROM `favorite` WHERE `userEmail` = ? AND `productID` = ?', [req.session.user, req.query.id]);
        res.send("row deleted.");
    } else {
        res.redirect('/');
    }
});

// 購物車 Json

router.get('/joincar', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM `shoppingcar`', function(err, result) {

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

// 加入購物車(新增)
router.post('/joincar', function(req, res, next) {
    var productID = req.body.productID;
    var quantity = req.body.quantity;
    var userEmail = req.session.user;

    if (req.session.user) {
        pool.query('INSERT INTO shoppingcar set ?', [{
            userEmail: userEmail,
            productID: productID,
            quantity: quantity
        }]);
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
// 加入購物車(更新)
router.put('/joincar', function(req, res, next) {
    var productID = req.body.productID;
    var quantity = req.body.quantity;
    var userEmail = req.session.user;

    if (req.session.user) {
        pool.query('UPDATE `shoppingcar` SET quantity=' + quantity + '  where userEmail="' + userEmail + '" and productID= ' + productID);
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});



module.exports = router;