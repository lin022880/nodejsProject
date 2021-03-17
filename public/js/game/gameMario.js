// 取出隨機整數
function geRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
    // 遊戲
    var $gameMario = '<div id="stageGameMario">\
    <div id="startGameMario" class="start">START\
        <ul>遊戲說明\
            <p></p>\
            <li style="color: yellow;">遊戲時間60s，閃躲Mario裡的敵人。</li>\
            <p></p>\
            <li>開始遊戲：任意處按左鍵</li>\
            <p></p>\
            <li>左右移動：滑鼠左右按鍵</li>\
        </ul>\
    </div>\
        <div id="scoreGameMario" class="sprite score">00000000</div>\
        <div id="playerGameMario" class="sprite playerGameMario"></div>\
    </div>'

    $(".gameMario").append($gameMario);
    $(".gameMario").append('<img id="gameClose" class="close" data-dismiss="modal" src="../../img/index/set/P1/X.png" alt="">');



    $("#startGameMario").click(function() {
        $("#gameClose").remove();
        $("#startGameMario").remove();
        // 當DOM讀取完畢執行
        $(function() {
            var $body = $("body"),
                $stage = $("#stageGameMario"),
                $player = $("#playerGameMario"),
                $score = $("#scoreGameMario"),
                enemy_fall_speed = 3,
                enemy_fall_max_speed = 12,
                enemy_wave = 0,
                enemy_wave_gap = 250,
                hit_test_r = 20,
                can_control_player = true,
                score = 0,
                scoreI = 0,
                score_add = 1,
                loop,
                time = 60,
                endGameStr = "",
                speedup;

            var gameMusicStr = "",
                xMusic = geRandomInt(0, 3);
            switch (xMusic) {
                case 0:
                    gameMusicStr = "music/Third_Time.mp3";
                    break;

                case 1:
                    gameMusicStr = "music/Path_to_Follow.mp3";
                    break;

                case 2:
                    gameMusicStr = "music/On_the_Bach.mp3";
                    break;

                case 3:
                    gameMusicStr = "music/Good_Starts.mp3";
                    break;
            }

            var mySound = soundManager.createSound({
                id: 'aSound',
                url: gameMusicStr
            });
            mySound.play();


            // player 初始位置
            $player.css("left", ($stage.width() - $player.width()) / 2 + "px");
            $player.css("top", $stage.height() - $player.height());

            // score 初始位置
            $score.css("left", $stage.width() - $score.width() - 5 + "px");
            $score.css("top", "5px");

            // 左鍵點擊
            $body.click(function() {
                if (can_control_player) {
                    var x = parseInt($player.css("left"));
                    if (x > 10)
                        $player.css("left", x - 100 + "px");
                }
            });

            // 右鍵點擊
            $body.contextmenu(function(e) {
                e.preventDefault();
                if (can_control_player) {
                    var x = parseInt($player.css("left"));
                    if (x < 210)
                        $player.css("left", x + 100 + "px");
                }
            });

            // 生成障礙物
            function createEnemy() {
                var enemy_pos = [10, 110, 210];

                for (var i = 0; i < 2; i++) {
                    var xNum = geRandomInt(0, 2);
                    var str = "";

                    switch (xNum) {
                        case 0:
                            str = "<div class='sprite enemyGameMario enemy1GameMario'></div>";
                            break;

                        case 1:
                            str = "<div class='sprite enemyGameMario enemy2GameMario'></div>";
                            break;

                        case 2:
                            str = "<div class='sprite enemyGameMario enemy3GameMario'></div>";
                            break;
                    }

                    $stage.append(str);
                    var $enemy = $stage.find(".enemyGameMario:last");
                    $enemy.data("wave", enemy_wave);
                    var rand_index = geRandomInt(0, enemy_pos.length - 1);
                    var enemy_x = enemy_pos.splice(rand_index, 1)[0];
                    // 障礙物起始位置
                    $enemy.css("left", enemy_x + "px");
                    $enemy.css("top", -($enemy.height()) + "px");
                }
            }
            createEnemy();

            // 遊戲結束
            function endGame() {
                mySound.stop();
                can_control_player = false;
                clearInterval(loop);
                // 跳出結束畫面
                $stage.append(endGameStr);
                $stage.append('<img id="gameClose" class="close" data-dismiss="modal" src="../../img/index/set/P1/X.png" alt="">');
                $(".end>ul>li").text(scoreI + "分");


                // 關閉遊戲廣告輪播繼續
                $("#gameClose").click(function() {
                    $(".AD>a").addClass("carousel-item");
                });

                // 恢復右鍵功能
                $body.unbind('contextmenu');
            }

            // 計時器(處理落下動畫跟碰撞機制)
            loop = setInterval(function() {
                $stage.find(".enemyGameMario").each(function() {
                    var enemy_y = parseInt($(this).css("top"));
                    if (enemy_y > enemy_wave_gap && $(this).data("wave") == enemy_wave) {
                        enemy_wave++;
                        createEnemy();
                    }

                    var px = parseInt($player.css("left")) + $player.width() / 2;
                    var py = parseInt($player.css("top")) + $player.height() / 2;
                    var ex = parseInt($(this).css("left")) + $(this).width() / 2;
                    var ey = parseInt($(this).css("top")) + $(this).height() / 2;
                    var p_e_dist = Math.sqrt(Math.pow(px - ex, 2) + Math.pow(py - ey, 2));
                    if (hit_test_r * 2 > p_e_dist) {
                        endGameStr = "<div class='end'>END<ul>獲得分數：<p></p><li></li></ul></div>";
                        endGame();
                    }

                    if (enemy_y > $stage.height()) {
                        $(this).remove();
                        return;
                    }
                    $(this).css("top", enemy_y + enemy_fall_speed + "px");
                    $score.html(scoreI);
                    score += score_add;
                    scoreI = parseInt(score / 1000) * 10;
                });
            }, 1000 / 60);

            // 每秒增加落下速度
            speedup = setInterval(function() {
                if (enemy_fall_speed >= enemy_fall_max_speed) {
                    enemy_fall_speed = 12;
                    clearInterval(speedup);
                }
                enemy_fall_speed += 0.3;
                score_add *= 1.05;
            }, 1000);

            // 計時遊戲時間 限時
            timer = setInterval(function() {
                time -= 1;
                if (time == 0) {
                    endGameStr = "<div class='end'>Time’s up<ul>獲得分數：<p></p><li></li></ul></div>";
                    endGame();
                    clearInterval(timer);
                }
            }, 1000);
        })
    });
    // 關閉遊戲廣告輪播繼續
    $("#gameClose").click(function() {
        $(".AD>a").addClass("carousel-item");
    });
});