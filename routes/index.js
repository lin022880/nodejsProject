var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = require('./lib/db.js');
const e = require('express');


/* GET home page. */
router.get('/', function(req, res, next) {
    var allPdTop5 = "SELECT * FROM `product`,product_type,product_style WHERE product.typeID=product_type.typeID and product.styleID=product_style.styleID  \
                    ORDER BY `product`.`popularity`  DESC LIMIT 5";
    var switchTop10 = "SELECT * FROM `product`,product_type,product_style WHERE product.typeID=product_type.typeID and product.styleID=product_style.styleID AND product.typeID = 1  \
                    ORDER BY `product`.`popularity`  DESC LIMIT 10";
    var ps4Top10 = "SELECT * FROM `product`,product_type,product_style WHERE product.typeID=product_type.typeID and product.styleID=product_style.styleID AND product.typeID = 2  \
                    ORDER BY `product`.`popularity`  DESC LIMIT 10";
    var xboxTop10 = "SELECT * FROM `product`,product_type,product_style WHERE product.typeID=product_type.typeID and product.styleID=product_style.styleID AND product.typeID = 3  \
                    ORDER BY `product`.`popularity`  DESC LIMIT 10";
    var hotNewTop8 = "SELECT * FROM `product`,product_type,product_style WHERE product.typeID=product_type.typeID and product.styleID=product_style.styleID  \
                    ORDER BY `product`.`up_date` DESC LIMIT 8";
    var clearDiscount = 'UPDATE ticket SET exp_ps4 = exp_ps4 + ps4_discount, exp_switch = exp_switch + switch_discount, exp_xbox = exp_xbox + xbox_discount, ps4_discount = "", switch_discount = "", xbox_discount = "" WHERE receive_date < DATE_FORMAT(now(),"%Y%m%d")';


    pool.query(allPdTop5 + ";" + switchTop10 + ";" + ps4Top10 + ";" + xboxTop10 + ";" + hotNewTop8 + ";" + clearDiscount, function(err, selectPd) {
        // 是否登入
        if (req.cookies.user != null) {
            req.session.user = req.cookies.user;
        }
        if (req.session.user) {
            pool.query('SELECT * FROM `user` WHERE `userEmail` = ?', [req.session.user], function(err, result) {

                if (err) throw err;
                // data: req.session.user  為session紀錄帳號
                res.render('index', { data: req.session.user, userName: result, selectPd: selectPd });
            });
        } else {
            res.render('index', { data: req.session.user, selectPd: selectPd });
        }
        if (err) throw err;

    });
});

// 登出
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        res.clearCookie('user');
        res.redirect("/");
    })
});

// 創帳號
router.post('/create', function(req, res, next) {
    var input_userEmail = req.body['userId'];
    var input_password = req.body['userPsw'];
    var input_email = req.body['userEml'];
    pool.query('INSERT INTO `user` set ? ; INSERT INTO ticket (userEmail) VALUES (?)', [{
        userEmail: input_userEmail,
        password: input_password,
        email: input_email

    }, input_userEmail], function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});
// 登入
router.post('/login', function(req, res, next) {
    var loginUser = req.body['memberUser'];
    var loginPsw = req.body['memberPw'];
    var keepUser = req.body['keepUser'];

    if (loginUser && loginPsw) {
        pool.query('SELECT * FROM `user` WHERE `userEmail` = ?', [loginUser], function(err, result) {
            if (result[0] != undefined) {
                if (result[0].password == loginPsw) {
                    req.session.user = loginUser;
                    if (keepUser == "on") {
                        res.cookie("user", req.session.user, { maxAge: 600000, httpOnly: true });
                    }
                    // res.send('歡迎' + req.session.user + '來到這裡');
                    res.redirect("/");
                } else {
                    res.send("帳號密碼有誤");
                }
            } else {
                res.send("帳號密碼有誤.......");
            }

            if (err) throw err;
        });
    } else {
        res.send("帳號或密碼不能空白");
    }
});
// 顯示收藏 Json
router.get('/show_collect', function(req, res, next) {
    if (req.session.user) {
        pool.query('SELECT * FROM `favorite` WHERE `userEmail` = ?', [req.session.user], function(err, result) {

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
        pool.query('INSERT INTO `favorite` SET ?', [{
            userEmail: req.session.user,
            productID: req.body.productID
        }]);
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