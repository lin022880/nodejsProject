var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //含入mysql套件
var pool = require('./lib/db.js'); //含入資料庫連線
const e = require('express');


//購物車
router.get('/', function(req, res, next) {
    if (req.session.user) {
        res.render("shoppingcar", { data: req.session.user });
    } else {
        res.redirect('/');
    }
});
//商品清單
router.get('/pdorder', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM product ,product_type,product_style,shoppingcar WHERE product.styleID=product_style.styleID AND product.typeID =product_type.typeID AND product.productID=shoppingcar.productID and shoppingcar.userEmail="' + req.session.user + '"',
            function(err, rows) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return;
                }
                res.send(JSON.stringify(rows));
            }
        );
    } else {
        res.redirect('/');
    }
});
//商品增減儲存
router.put('/pdorder', function(req, res, next) {
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
// 商品刪除
router.delete('/pdorder', function(req, res, next) {
    var productID = req.body.productID;
    var userEmail = req.session.user;

    if (req.session.user) {
        pool.query('DELETE FROM shoppingcar WHERE `userEmail` ="' + userEmail + '"  AND `productID` =  ' + productID);
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
//優惠券資料
router.get('/ticket', function(req, res, next) {
    var userEmail = req.session.user;
    if (req.session.user) {
        pool.query('SELECT * FROM ticket WHERE userEmail="' + userEmail + '"',
            function(err, rows) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return;
                }
                res.send(JSON.stringify(rows));
            }
        );
    } else {
        res.redirect('/');
    }
});
//優惠券扣除
router.put('/ticket', function(req, res, next) {
    var xbox_discount = req.body.xbox_discount;
    var ps4_discount = req.body.ps4_discount;
    var switch_discount = req.body.switch_discount;
    var use_xbox = req.body.use_xbox;
    var use_ps4 = req.body.use_ps4;
    var use_switch = req.body.use_switch;
    if (req.session.user) {
        pool.query('UPDATE ticket SET `use_ps4`='+use_ps4+',`use_switch`='+use_switch+', `use_xbox`='+use_xbox+',`xbox_discount`= ' + xbox_discount + ', `ps4_discount`= ' + ps4_discount + ', `switch_discount`= ' + switch_discount + ' where userEmail="' + req.session.user + '"');
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
//折扣碼資料
router.get('/discount', function(req, res, next) {
    var userEmail = req.session.user;
    if (req.session.user) {
        pool.query('SELECT * FROM `discount_code`',
            function(err, rows) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return;
                }
                res.send(JSON.stringify(rows));
            }
        );
    } else {
        res.redirect('/');
    }
});
// 個人資料
router.get('/user', function(req, res, next) {
    var userEmail = req.session.user;
    if (req.session.user) {
        pool.query('SELECT * FROM user WHERE userEmail="' + userEmail + '"',
            function(err, rows) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return;
                }
                res.send(JSON.stringify(rows));
            }
        );
    } else {
        res.redirect('/');
    }
});
// 訂單資料
router.get('/order', function(req, res, next) {
    var userEmail = req.session.user;
    if (req.session.user) {
        pool.query('SELECT * FROM order_buy ',
            function(err, rows) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return;
                }
                res.send(JSON.stringify(rows));
            }
        );
    } else {
        res.redirect('/');
    }
});
// 訂單資料更新
router.post('/order', function(req, res, next) {
    var userEmail = req.session.user;
    var order_name = req.body.order_name;
    var order_phone = req.body.order_phone;
    var order_address = req.body.order_address;
    var order_method = req.body.order_method;
    var order_remark = req.body.order_remark;
    var order_transport = req.body.transport;
    var runwater = req.body.runwater;
    var discount = req.body.discount;
    var totalprice = req.body.total;
    var count_pd = req.body.count_pd;
    var ticket = req.body.ticket;
    if (req.session.user) {
        pool.query('INSERT INTO  order_buy SET ticket="' + ticket + '",count_pd=' + count_pd + ' ,discount=' + discount + ', totalprice=' + totalprice + ' ,transport="' + order_transport + '" ,runwater="' + runwater + '", order_name="' + order_name + '", order_phone="' + order_phone + '" , order_address="' + order_address + '", method="' + order_method + '", remark="' + order_remark + '" , userEmail="' + userEmail + '"' + ";" + 'INSERT order_car SELECT order_buy.orderID, order_buy.userEmail, shoppingcar.productID,shoppingcar.quantity,order_buy.runwater FROM `order_buy`, shoppingcar WHERE order_buy.userEmail = shoppingcar.userEmail AND order_buy.userEmail = "' + req.session.user + '" and  runwater="' + runwater + '"');
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});
// 刪除購物車物品
router.delete('/order', function(req, res, next) {
    var userEmail = req.session.user;
    if (req.session.user) {
        pool.query('DELETE FROM shoppingcar WHERE `userEmail` ="' + userEmail + '"');
        res.send("row insert.");
    } else {
        res.redirect('/');
    }
});




module.exports = router;