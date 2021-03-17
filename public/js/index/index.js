$(document).ready(function() {

    // 遊戲
    var $gameImgSelect, $gameClass;
    var $random = geRandomInt(0, 1);
    switch ($random) {
        case 0:
            $gameImgSelect = '<img id="playGame" src="./img/index/playGame/Mario.png">';
            $gameClass = "gameMario";
            break;

        case 1:
            $gameImgSelect = '<img id="playGame" src="./img/index/playGame/Minecraft.png">';
            $gameClass = "gameMinecraft";
            break;
    }
    $(".playGame").append($gameImgSelect);
    $("#gamePosition").addClass($gameClass);
    $("#gamePlayImg").click(function() {
        // 打開遊戲廣告暫停
        var item = $(".carousel-item.active");
        $(item).removeClass("carousel-item");
    });


    // P1左邊NEW商品
    var $newPd, $newPd2;
    var $random = geRandomInt(0, 3);
    switch (2) {
        case 0:
            $newPd = "商品.png";
            $newPd2 = "商品2.png";
            break;

        case 1:
            $newPd = "商品2.png";
            $newPd2 = "商品3.png";
            break;

        case 2:
            $newPd = "商品3.png";
            $newPd2 = "商品4.png";
            break;

        case 3:
            $newPd = "商品4.png";
            $newPd2 = "商品.png";
            break;
    }

    // 左邊NEW商品
    $(".setL1").append('<a href=""><img id="productNew" class="curHover" src="./img/index/product/P1/' + $newPd + '"></a>');
    $(".setL1-2").append('<a href=""><img id="productNew" class="curHover" src="./img/index/product/P1/' + $newPd2 + '"></a>');



    // P1右邊廣告
    $("#adRightImg").click(function() {
        $("#adRight").addClass("adRightClick");
    });
    $("#gamePlayImg").click(function() {
        // 打開遊戲也會關掉廣告
        $("#adRight").removeClass("adRightClick");
    });
    $("#adVideoIcon").click(function() {
        // 打開廣告影片也會關掉廣告
        $("#adRight").removeClass("adRightClick");
    });
    $("#adClose").click(function() {
        $("#adRight").removeClass("adRightClick");
    });


    // P1廣告影片
    $("#adVideoIcon").click(function() {
        $("#adVideoIcon").css("display", "none");
        $("#showVideo").css("display", "block");
        $("#videoClose").css("display", "block");
        var item2 = $(".carousel-item.active");
        $(item2).removeClass("carousel-item");
        $("#showVideo").animate({
            top: "50%"
        })
    });
    $("#adRightImg").click(function() {
        // 打開廣告關掉影片
        $("#videoClose").click();
    });

    $("#gamePlayImg").click(function() {
        // 打開廣告關掉影片
        $("#videoClose").click();
    });

    $("#videoClose").click(function() {
        var ifr = document.getElementsByTagName("iframe")[0],
            ifrLink = ifr.getAttribute("src");
        ifr.setAttribute("src", ifrLink);
        $("#videoClose").css("display", "none");
        $("#adVideoIcon").css("display", "");
        $("#showVideo").css({
            "display": "none",
            "top": "0%"
        });
        $(".AD>a").addClass("carousel-item");
    });



    // P3商品Hover
    $(".product").hover(function() {
        $(this).parents("div.pdThreeEqual").append('<img class="P3Hover" src="./img/index/set/P3/hover箭頭.png" alt="">');
    }, function() {
        $(".P3Hover").remove();
    });



    // P3商品左右移動 switch
    var tur = true;

    function open() {
        tur = true;
    }
    var $PdPositionSwitch = 0;
    $("#switchP3R").click(function() {
        if (tur) {
            if ($PdPositionSwitch > -66.6) {
                $PdPositionSwitch += -16.65;
                $(".pdSwitch").animate({
                    left: $PdPositionSwitch + "%"
                })
            }
            setTimeout(open, 500);
            tur = false;
        }
        reArrow()
    });

    $("#switchP3L").click(function() {
        if (tur) {
            if ($PdPositionSwitch < 0) {
                $PdPositionSwitch += 16.65;
                $(".pdSwitch").animate({
                    left: $PdPositionSwitch + "%"
                })
            }
            setTimeout(open, 500);
            tur = false;
        }
        reArrow()
    });
    // P3商品左右移動 ps4
    var $PdPositionPs4 = 0;
    $("#ps4P3R").click(function() {
        if (tur) {
            if ($PdPositionPs4 > -66.6) {
                $PdPositionPs4 += -16.65;
                $(".pdPs4").animate({
                    left: $PdPositionPs4 + "%"
                })
            }
            setTimeout(open, 500);
            tur = false;
        }
        reArrow()
    });

    $("#ps4P3L").click(function() {
        if (tur) {
            if ($PdPositionPs4 < 0) {
                $PdPositionPs4 += 16.65;
                $(".pdPs4").animate({
                    left: $PdPositionPs4 + "%"
                })
            }
            setTimeout(open, 500);
            tur = false;
        }
        reArrow()
    });
    // P3商品左右移動 xbox

    var $PdPositionXbox = 0;
    $("#xboxP3R").click(function() {
        if (tur) {
            if ($PdPositionXbox > -66.6) {
                $PdPositionXbox += -16.65;
                $(".pdXbox").animate({
                    left: $PdPositionXbox + "%"
                })
            }
            setTimeout(open, 500);
            tur = false;
        }
        reArrow()
    });

    $("#xboxP3L").click(function() {
        if (tur) {
            if ($PdPositionXbox < 0) {
                $PdPositionXbox += 16.65;
                $(".pdXbox").animate({
                    left: $PdPositionXbox + "%"
                })
            }
            setTimeout(open, 500);
            tur = false;
        }
        reArrow()
    });

    function reArrow() {
        // switch
        if ($PdPositionSwitch > -66.6) {
            $("#switchP3R").css("display", "block");
        } else $("#switchP3R").css("display", "none");

        if ($PdPositionSwitch < 0) {
            $("#switchP3L").css("display", "block");
        } else $("#switchP3L").css("display", "none");
        // ps4
        if ($PdPositionPs4 > -66.6) {
            $("#ps4P3R").css("display", "block");
        } else $("#ps4P3R").css("display", "none");

        if ($PdPositionPs4 < 0) {
            $("#ps4P3L").css("display", "block");
        } else $("#ps4P3L").css("display", "none");
        // xbox
        if ($PdPositionXbox > -66.6) {
            $("#xboxP3R").css("display", "block");
        } else $("#xboxP3R").css("display", "none");

        if ($PdPositionXbox < 0) {
            $("#xboxP3L").css("display", "block");
        } else $("#xboxP3L").css("display", "none");
    }



    // P3OutBox

    // 左邊商品介紹
    $("#P3OutIntroductionTitle>img").mousedown(function() {
        $(this).css("filter", "brightness(0.5)");
    });

    $("#P3OutIntroductionTitle>img").mouseleave(function() {
        $(this).css("filter", "brightness(1)");
    });
    $("#P3OutIntroductionTitle>img").mouseup(function() {
        $(this).css("filter", "brightness(1)");
    });

    $("#buyKnowImg").click(function() {
        $("#buyKnow").css({
            "opacity": "1",
            "right": "0"
        });
        $("#pdIntroduction").css({
            "opacity": "0",
            "right": "50vw"
        });
        $("#pdFormat").css({
            "opacity": "0",
            "right": "50vw"
        });
    });
    $("#pdIntroductionImg").click(function() {
        $("#buyKnow").css({
            "opacity": "0",
            "right": "50vw"
        });
        $("#pdIntroduction").css({
            "opacity": "1",
            "right": "0"
        });
        $("#pdFormat").css({
            "opacity": "0",
            "right": "50vw"
        });
    });
    $("#pdFormatImg").click(function() {
        $("#buyKnow").css({
            "opacity": "0",
            "right": "50vw"
        });
        $("#pdIntroduction").css({
            "opacity": "0",
            "right": "50vw"
        });
        $("#pdFormat").css({
            "opacity": "1",
            "right": "0"
        });
    });

    // 中間商品瀏覽
    $(".P3OutPdOtherImgBox>img").click(function() {
        $("#P3OutPd>img").remove();
        $("#P3OutPd").append($(this).clone().removeClass("curHover"));
    });


    // // 加入星星
    // $(document).on("click", ".P3OutPdLike", function() {
    //     $("#starBox").append('<img class="curHover P3OutPdLikeShow" src="./img/index/set/outBox/商品星星.png" alt="">');
    // });

    // $(document).on("click", ".P3OutPdLikeShow", function() {
    //     $(this).remove();
    // });

    // // 加購商品 
    // $(document).on('change', "input[name='PdOther']", function(event) {
    //     $(this).parents(".addBuyImgBox").addClass("addBuyBorder");
    //     $("input[name='PdOther']").not(this).parents(".addBuyImgBox").removeClass("addBuyBorder");
    // });


    // 歡迎回來

    $("#welcome").show(300).delay(4000).hide(300);
    // $("#welcome").css("display", "none");





});

// 今日小遊戲 字體顏色
var Arraycolor = new Array("#000000", "#ffffff", "#000000", "#ffffff");
var n = 0;

function turncolors() {
    n++;
    if (n == (Arraycolor.length - 1)) n = 0;
    $("#gameName").css("color", Arraycolor[n]);
    setTimeout("turncolors()", 1000);
}
turncolors();