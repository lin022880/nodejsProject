var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');
const e = require('express');


/* GET users listing. */
router.get('/', function(req, res, next) {
    var selectUserFavorNs = "SELECT * FROM favorite, product, product_type, product_style WHERE favorite.productID = product.productID AND favorite.userEmail = ? AND product.typeID=product_type.typeID AND product.styleID=product_style.styleID AND ( product.typeID = 1 OR product.typeID = 6 )";
    var selectUserFavorPs4 = "SELECT * FROM favorite, product, product_type, product_style WHERE favorite.productID = product.productID AND favorite.userEmail = ? AND product.typeID=product_type.typeID AND product.styleID=product_style.styleID AND ( product.typeID = 2 OR product.typeID = 4 )";
    var selectUserFavorXbox = "SELECT * FROM favorite, product, product_type, product_style WHERE favorite.productID = product.productID AND favorite.userEmail = ? AND product.typeID=product_type.typeID AND product.styleID=product_style.styleID AND ( product.typeID = 3 OR product.typeID = 5 )";
    var selectUserTicket = "SELECT * FROM `ticket` WHERE userEmail = ?";
    var select_order = "SELECT * FROM `order_buy` WHERE userEmail = ?";

    if (req.session.user) {
        pool.query(selectUserFavorNs + ";" + selectUserFavorPs4 + ";" + selectUserFavorXbox + ";" + selectUserTicket + ";" + select_order, [req.session.user, req.session.user, req.session.user, req.session.user, req.session.user], function(err, userResult) {

            if (err) throw err;
            res.render('member', { data: req.session.user, userFavor: userResult, userTicket: userResult[3], userOrder: userResult[4] });
        });
    } else {
        res.render('member', { data: req.session.user });
    }
});
// 訂單詳細 Json
router.get('/order', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM `order_buy`, order_car, product, product_type, product_style WHERE order_buy.userEmail = ? AND order_buy.runwater = order_car.runwater AND order_car.productID = product.productID AND product.styleID = product_style.styleID AND product.typeID = product_type.typeID ORDER BY `product`.`price` DESC', [req.session.user], function(err, result) {

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
// 訂單修改
router.put('/order', function(req, res, next) {

    if (req.session.user) {
        pool.query('UPDATE `order_buy` SET ? WHERE runwater = ?', [{
            order_address: req.body.order_address,
            order_name: req.body.order_name,
            order_phone: req.body.order_phone,
            remark: req.body.remark
        }, req.body.runwater]);
        res.send("row update.");
    } else {
        res.redirect('/');
    }
});
// 訂單刪除
router.delete('/order', function(req, res, next) {

    if (req.session.user) {
        pool.query('DELETE FROM `order_buy` WHERE runwater = ?', [req.body.runwater]);
        res.send("row deleted.");
    } else {
        res.redirect('/');
    }
});


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
// 收藏刪除
router.delete('/collect', function(req, res, next) {

    if (req.session.user) {
        pool.query('DELETE FROM `favorite` WHERE `userEmail` = ? AND `productID` = ?', [req.session.user, req.body.productID]);
        res.send("row deleted.");
    } else {
        res.redirect('/');
    }
});
// localFavor Json
router.get('/localFavor', function(req, res, next) {

    var local_favor_ps4 = "SELECT * FROM product, product_type, product_style WHERE product.typeID=product_type.typeID AND product.styleID=product_style.styleID AND ( product.typeID = 2 OR product.typeID = 4 )";
    var local_favor_switch = "SELECT * FROM product, product_type, product_style WHERE product.typeID=product_type.typeID AND product.styleID=product_style.styleID AND ( product.typeID = 1 OR product.typeID = 6 )";
    var local_favor_xbox = "SELECT * FROM product, product_type, product_style WHERE product.typeID=product_type.typeID AND product.styleID=product_style.styleID AND ( product.typeID = 3 OR product.typeID = 5 )";

    pool.query(local_favor_ps4 + ";" + local_favor_switch + ";" + local_favor_xbox, function(err, result) {

        if (err) {
            console.log(JSON.stringify(err));
            return;
        }

        res.send(JSON.stringify(result));

    });

});

// edit Json
router.get('/edit', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM `user` WHERE `userEmail` = ?', [req.session.user], function(err, result) {

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

// 會員修改
router.put('/edit', function(req, res, next) {

    if (req.session.user) {
        pool.query('UPDATE `user` SET ? WHERE userEmail = ?', [{
            // password: pswInput,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            birthday: req.body.birthday,
            address: req.body.address,
            picture: req.body.picture
        }, req.session.user]);
        res.send("row update.");
    } else {
        res.redirect('/');
    }
});

module.exports = router;