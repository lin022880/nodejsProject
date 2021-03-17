var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js'); //含入資料庫連線
const e = require('express');

//購物清單


router.get('/', function(req, res, next) {

    res.render("shopping", { data: req.session.user });
})
router.get('/product', function(req, res, next) {

    pool.query('SELECT * FROM product ,product_type,product_style WHERE product.styleID=product_style.styleID AND product.typeID =product_type.typeID ORDER BY `product`.`add_date` DESC',

        function(err, rows) {
            if (err) {
                console.log(JSON.stringify(err));
                return;
            }

            res.send(JSON.stringify(rows));


        }
    );

})

// 收藏 Json
router.get('/collect', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM `favorite`', function(err, result) {

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
        pool.query('INSERT INTO `favorite` SET userEmail=' + req.session.user + ' , productID=' + req.body.productID + '');
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
// 收藏刪除
router.delete('/collect', function(req, res, next) {

    if (req.session.user) {
        pool.query('DELETE FROM `favorite` WHERE `userEmail` = ? AND `productID` = ?', [req.session.user, req.body.productID]);
        res.send("row deleted.");
    } else {
        res.redirect('/');
    }
});


module.exports = router;