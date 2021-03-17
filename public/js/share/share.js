// 提示字
$(function() {
    $("[data-toggle='tooltip']").tooltip();
});

// AOS
AOS.init({
    easing: 'ease-out-cubic',
    duration: '3000'
});

// 小logo飛入
let domElement = document.getElementById("logoLT");
if (document.getElementById("logoLT")) {
    domElement.zoomInLeft();
}

// 取出隨機整數
function geRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// P1跑馬燈
var $move = -$("#marqueeBox").width() + 5;
var $marqueeStr = "您的旅行計畫可能會受新冠病毒疫情影響，請在安排旅程前購買充足的遊戲！"
    // console.log($("#marqueeP").width());
var mover = setInterval(function() {
    $move += 1;
    $("#marqueeP").text($marqueeStr);
    $("#marqueeP").css("right", $move);

    if ($move > $("#marqueeP").width() + 5) {
        $move = -$("#marqueeBox").width() + 5;
    }
}, 20);



// 會員↓

$("#memberButton").click(function() {
    $("#memberBox").fadeIn();
    $("#memberBox").toggle();
});

$("#memberLoginClose").click(function() {
    $("#memberBox").toggle();
});
$("#memberCreateClose").click(function() {
    $("#memberLoginShow").fadeIn();
    $("#memberLoginShow").css("display", "block");
    $("#memberCreateShow").css("display", "none");
});
$("#goCreate").click(function() {
    $("#memberCreateShow").fadeIn();
    $("#memberCreateShow").css("display", "block");
    $("#memberLoginShow").css("display", "none");
});





// 記住帳號 / 取消勾選
$("#remenberUser").change(function() {
    if ($("#remenberUser").is(":checked") == true) {
        $("#memberUser").keyup(doChange);
        $("#memberUser").focus(doChange);
        localStorage.setItem("remenberUser", "on");
    } else {
        localStorage.removeItem("memberUser");
        localStorage.removeItem("remenberUser");
    }
});



// 會員保持登入勾選
$("#keepUser").change(function() {
    if ($("#keepUser").is(":checked") == true) {
        //如給被勾選將做什麼事 console.log("選");
        $("#remenberUser").prop("checked", true);
    } else {
        //沒被勾選做什麼事 console.log("沒選");
    }
});


// 儲存
function doChange() {
    localStorage.setItem(this.name, this.value);
}

// 顯示儲存
function readAndShow() {
    if (localStorage["memberUser"])
        $("#memberUser").val(localStorage["memberUser"]);
    if (localStorage["remenberUser"])
        $("#remenberUser").prop("checked", true);
}
readAndShow();

// 會員↑




// 會員資料 訂單 優惠券
$("#goto_userData").on("click", function() {
    var userData = $("#goto_userData").text();
    localStorage.setItem("goWhere", userData);
});
$("#goto_userOrder").on("click", function() {
    var userData = $("#goto_userOrder").text();
    localStorage.setItem("goWhere", userData);
});
$("#goto_userDiscount").on("click", function() {
    var userData = $("#goto_userDiscount").text();
    localStorage.setItem("goWhere", userData);
});
$("#goto_userFavor").on("click", function() {
    var userData = $("#goto_userFavor").text();
    localStorage.setItem("goWhere", userData);
});
$("#clear_goto").on("click", function() {
    localStorage.removeItem("goWhere");
});
// 會員資料 訂單 優惠券

// 修改完成
function showOK() {
    Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        width: 48 + "vw",
        padding: 13 + "vw",
        background: '#fff url(/img/cur/msg/ok.png) no-repeat'
    })
    $(".swal2-modal").css('background-size', 'cover');
}