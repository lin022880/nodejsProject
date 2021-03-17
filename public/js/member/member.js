// 大選單 會員 訂單 收藏 優惠券
var $bigPageClick = ["#mberPage", "#oderPage", "#favorPage", "#discPage"];
var $bigPageClickShow = ["#page1", "#page2", "#page3", "#page4"];
var goWhereData = ["會員資料", "我的訂單", "我的收藏", "我的優惠券"];
for (let index = 0; index < 4; index++) {
    $($bigPageClick[index]).click(function() {
        $(this).css("filter", "brightness(1)");
        $(".titleSet").not(this).css("filter", "brightness(0.7)");
        $($bigPageClickShow[index]).css("display", "block");
        $(".page").not($bigPageClickShow[index]).css("display", "none");
        localStorage.setItem("goWhere", goWhereData[index]);
    });
}

switch (localStorage.getItem("goWhere")) {
    case "會員資料":
        $("#mberPage").click();
        break;
    case "我的訂單":
        $("#oderPage").click();
        break;
    case "我的優惠券":
        $("#discPage").click();
        break;
    case "我的收藏":
        $("#favorPage").click();
        break;
}


// page4
// 選單畫面 可使用 已使用 過期
$("#clickUse").click(function() {
    $(this).css("color", "#4DD5FB");
    $("#page4BoxTitle li").not(this).css("color", "#707070");
    $("#use").css("display", "flex");
    $(".discountBox").not("#use").css("display", "none");
});
$("#clickNotUse").click(function() {
    $(this).css("color", "#4DD5FB");
    $("#page4BoxTitle li").not(this).css("color", "#707070");
    $("#notUse").css("display", "flex");
    $(".discountBox").not("#notUse").css("display", "none");
});
$("#clickExp").click(function() {
    $(this).css("color", "#4DD5FB");
    $("#page4BoxTitle li").not(this).css("color", "#707070");
    $("#exp").css("display", "flex");
    $(".discountBox").not("#exp").css("display", "none");
});

function repage2() {
    if ($("#page2BoxSet .rowBox").length == 0) {
        $("#page2BoxSet").append('<div class="not_order">還沒有訂單，趕快去逛逛商品!</div>');
    } else {
        $(".not_order").remove();
    }
}
repage2();
if ($("#notUse .disCBox").length == 0) {
    $("#notUse").append('<div class="dontForget">別忘了每天都可以領優惠券!</div>');
} else {
    $(".dontForget").remove();
}

function page3_1() {
    // page3
    // 先顯示收藏多的
    var ps4Count = $(".mberPage3pdPs4 .mberPage3pdThreeEqual").length;
    var switchCount = $(".mberPage3pdSwitch .mberPage3pdThreeEqual").length;
    var xboxCount = $(".mberPage3pdXbox .mberPage3pdThreeEqual").length;
    var pdCount = [ps4Count, switchCount, xboxCount];
    var pdCount2 = [ps4Count, switchCount, xboxCount];
    var x_pdCount = pdCount.sort();
    var bigCount = x_pdCount[x_pdCount.length - 1];
    var x_show = pdCount2.indexOf(bigCount);
    switch (x_show) {
        case 0:
            // console.log("ps4");
            $(".selectTypeP").removeClass("active");
            $("#selectTypePS4").addClass("active");
            selectTypeForPdShow(2);
            break;
        case 1:
            // console.log("switch");
            $(".selectTypeP").removeClass("active");
            $("#selectTypeSWITCH").addClass("active");
            selectTypeForPdShow(0);
            break;
        case 2:
            // console.log("xbox");
            $(".selectTypeP").removeClass("active");
            $("#selectTypeXBOX").addClass("active");
            selectTypeForPdShow(1);
            break;
    }

    function selectTypeForPdShow(e) {
        switch (e) {
            case 0:
                $("#mberPage3Switch").css("display", "block");
                $("#mberPage3Ps4").css("display", "none");
                $("#mberPage3Xbox").css("display", "none");
                break;
            case 1:
                $("#mberPage3Switch").css("display", "none");
                $("#mberPage3Ps4").css("display", "none");
                $("#mberPage3Xbox").css("display", "block");
                break;
            case 2:
                $("#mberPage3Switch").css("display", "none");
                $("#mberPage3Ps4").css("display", "block");
                $("#mberPage3Xbox").css("display", "none");
                break;
        }
    }
}

function page3() {


    // page3

    // 商品有多少 袋子就多寬
    var ps4Width = ($(".mberPage3pdPs4 .mberPage3pdThreeEqual").length) * 12;
    $(".mberPage3pdPs4").css("width", ps4Width + "vw");
    var switchWidth = ($(".mberPage3pdSwitch .mberPage3pdThreeEqual").length) * 12;
    $(".mberPage3pdSwitch").css("width", switchWidth + "vw");
    var xboxWidth = ($(".mberPage3pdXbox .mberPage3pdThreeEqual").length) * 12;
    $(".mberPage3pdXbox").css("width", xboxWidth + "vw");

    // 左右移動
    var $whichMove = ["Ps4", "Switch", "Xbox"];
    var pdWidth = [ps4Width, switchWidth, xboxWidth];
    var Ps4 = 0,
        Switch = 0,
        Xbox = 0;
    var $moveX = [Ps4, Switch, Xbox];
    var tur = true;

    function open() {
        tur = true;
    }
    for (let index = 0; index < $whichMove.length; index++) {
        if (pdWidth[index] > 60) {
            // 左
            $("#mberPage3" + $whichMove[index] + " #mberPage3" + $whichMove[index] + "P3L").click(function() {
                if (tur) {
                    if ($moveX[index] < 0) {
                        $moveX[index] += 12;
                        $(".mberPage3pd" + $whichMove[index]).animate({
                            left: $moveX[index] + "vw"
                        })
                    }
                    setTimeout(open, 500);
                    tur = false;
                }
                reArrowMberPg3()
            });
            // 右
            $("#mberPage3" + $whichMove[index] + " #mberPage3" + $whichMove[index] + "P3R").click(function() {
                if (tur) {
                    if ($moveX[index] > -pdWidth[index] + 60) {
                        $moveX[index] += -12;
                        $(".mberPage3pd" + $whichMove[index]).animate({
                            left: $moveX[index] + "vw"
                        })
                    }
                    setTimeout(open, 500);
                    tur = false;
                }
                reArrowMberPg3()
            });
        }
        if (pdWidth[index] > 72) {
            $("#mberPage3" + $whichMove[index] + " #mberPage3" + $whichMove[index] + "P3R").css("display", "block");
        }

        function reArrowMberPg3() {
            if ($moveX[index] > -pdWidth[index] + 60) {
                $("#mberPage3" + $whichMove[index] + " #mberPage3" + $whichMove[index] + "P3R").css("display", "block");
            } else $("#mberPage3" + $whichMove[index] + " #mberPage3" + $whichMove[index] + "P3R").css("display", "none");
            if ($moveX[index] < 0) {
                $("#mberPage3" + $whichMove[index] + " #mberPage3" + $whichMove[index] + "P3L").css("display", "block");
            } else $("#mberPage3" + $whichMove[index] + " #mberPage3" + $whichMove[index] + "P3L").css("display", "none");
        }
        reArrowMberPg3();

    }




    // 依照類型顯示內容
    $("#selectTypeR").click(function() {
        var $selectType = $(".selectTypeBox").find(".selectTypeP.active").index();
        selectTypeForPdShow($selectType);
    });

    function selectTypeForPdShow(e) {
        switch (e) {
            case 0:
                $("#mberPage3Switch").css("display", "block");
                $("#mberPage3Ps4").css("display", "none");
                $("#mberPage3Xbox").css("display", "none");
                break;
            case 1:
                $("#mberPage3Switch").css("display", "none");
                $("#mberPage3Ps4").css("display", "none");
                $("#mberPage3Xbox").css("display", "block");
                break;
            case 2:
                $("#mberPage3Switch").css("display", "none");
                $("#mberPage3Ps4").css("display", "block");
                $("#mberPage3Xbox").css("display", "none");
                break;
        }
    }
    $("#selectTypeL").click(function() {
        var $selectType = $(".selectTypeBox").find(".selectTypeP.active").index() + 1;
        if ($selectType > 2) $selectType = 0;
        selectTypeForPdShow($selectType);
    });




    // 商品介紹顯示
    var $selectTypeForPd = [".mberPage3pdPs4", ".mberPage3pdSwitch", ".mberPage3pdXbox"]
    var $bySelectP = ["ps4", "switch", "xbox"]
    for (let index = 0; index < $selectTypeForPd.length; index++) {

        $($selectTypeForPd[index] + " .mberPage3product").click(function() {
            $(this).css({
                "transform": "scale(1.1)",
                "filter": "drop-shadow(2px 4px 6px black)"
            });
            $($selectTypeForPd[index] + " .mberPage3product").not(this).css({
                "transform": "unset",
                "filter": "unset"
            });
        });

        $(document).on('change', "input[name='" + $bySelectP[index] + "']", function(event) {
            $(this).parents(".mberPage3PdMsgBox").css("display", "block");
            $("input[name='" + $bySelectP[index] + "']").not(this).parents(".mberPage3PdMsgBox").css("display", "none");
        });
    }

}


// page3
// 類型標題 不自動輪播
$('.carousel').carousel({
    interval: false
});



// page1

// 修改密碼視窗
$("#pswInputButton").click(function() {
    $("#pswChangeBoxBg").fadeToggle();
});
$("#pswChangeCl").click(function() {
    $("#pswChangeBoxBg").fadeToggle();
});


// 修改完成提示
// $("#dataOk").click(function() {
// $(".size1").stop();
// $(".size1").css({
//     "z-index": "1",
//     "transform": "translate(-50%, -50%) scale(1.5)"
// }).delay(3000).queue(function(next) {
//     $("#msgBoxCloseBtn").click();
//     next();
// })
// });

// 關閉提示
// $("#msgBoxCloseBtn").click(function() {
//     $(".size1").css({
//         "z-index": "-1",
//         "transform": "translate(-50%, -50%) scale(0.1)"
//     })
// });