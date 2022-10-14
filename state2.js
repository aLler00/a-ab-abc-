<!-- document.querySelector获取页面元素-->
//获得start按钮和title
var startBtn = document.querySelector("#star_btn");
var title = document.querySelector("#title");
var rulebtn = document.querySelector("#rule_btn");
//隐藏骰子等元素的样式
var dicebtn = document.querySelector("#dice");
dicebtn.style.display="none";
var player1btn = document.querySelector("#player1");
player1btn.style.display="none";
var player2btn = document.querySelector("#player2");
player2btn.style.display="none";
var headbtn1 = document.querySelector("#head1");
headbtn1.style.display="none";
var headbtn2 = document.querySelector("#head2");
headbtn2.style.display="none";

var succes= document.querySelector("#suc");
var scores1= document.querySelector("#score_one");
var scores2= document.querySelector("#score_two");
scores1.style.display="none";
scores2.style.display="none";

var play1=1;
var play2=0;
var okremove=1;
//准备两个一维数组,表示两个玩家的棋盘格填充情况，值为0则代表该格子里没有骰子数
var player1=new Array();
var player2=new Array();
//获得每个棋盘格子
var grid100= document.querySelector("#grid1-0-0");
var grid101= document.querySelector("#grid1-0-1");
var grid102= document.querySelector("#grid1-0-2");
var grid110= document.querySelector("#grid1-1-0");
var grid111= document.querySelector("#grid1-1-1");
var grid112= document.querySelector("#grid1-1-2");
var grid120= document.querySelector("#grid1-2-0");
var grid121= document.querySelector("#grid1-2-1");
var grid122= document.querySelector("#grid1-2-2");

var grid200= document.querySelector("#grid2-0-0");
var grid201= document.querySelector("#grid2-0-1");
var grid202= document.querySelector("#grid2-0-2");
var grid210= document.querySelector("#grid2-1-0");
var grid211= document.querySelector("#grid2-1-1");
var grid212= document.querySelector("#grid2-1-2");
var grid220= document.querySelector("#grid2-2-0");
var grid221= document.querySelector("#grid2-2-1");
var grid222= document.querySelector("#grid2-2-2");

//点击游戏规则的按钮，设置弹窗展示游戏规则
rulebtn.onclick=function () {
    document.getElementById("btnmusic").play();
    window.confirm("游戏规则：\n" +
        "1.玩家A,B轮流掷骰，并选择己区九宫格中任意一线放置\n" +
        "2.在己方某线置骰后，对方该线同点数骰将被消除\n" +
        "3.当某方九宫格满时，结束掷骰，进入结算\n" +
        "计分规则：\n" +
        "1.某玩家某线得分=∑（各点数x此点数在此线出现次数²）\n" +
        "2.各玩家得分=∑（己区各线得分）\n" +
        "3.得分高者胜出\n");
}

//设置一个点击start图标的事件
startBtn.onclick=function (){
    document.getElementById("btnmusic").play();
    //隐藏按钮和标题
    title.style.display="none";
    startBtn.style.display="none";
    //创建div元素，添加游戏选择模式
    var duct1=document.createElement("div")
    duct1.innerHTML='<div class = "chioce" id = par1></div>';
    var duct2=document.createElement("div")
    duct2.innerHTML='<div class = "chioce" id = par2></div>';
    //将选择的div添加到外层div（partern1、partern2）
    partern1.appendChild(duct1);
    partern2.appendChild(duct2);
    //设置游戏选择模式的鼠标点击事件
    var par1Btn = document.querySelector("#partern1");
    var par2Btn = document.querySelector("#partern2");

    <!--选择双人对战-->
    par1Btn.onclick=function () {
        document.getElementById("btnmusic").play();
        par2Btn.style.display = "none";
        par1Btn.style.display = "none";
        //显示骰子等元素
        dicebtn.style.display = "block";
        player1btn.style.display = "block";
        player2btn.style.display = "block";
        scores1.style.display="block";
        scores2.style.display="block";


        //创建div元素，添加玩家双方游戏框
        var check1 = document.createElement("div");
        check1.innerHTML = '<div id = check1></div>';
        var check2 = document.createElement("div");
        check2.innerHTML = '<div  id = check2></div>';
        //将选择的div添加到外层div
        checker1.appendChild(check1);
        checker2.appendChild(check2);

        //添加游戏区域的格子
        for (var i = 0; i < 3; i++) {
            player1[i] = new Array();
            player2[i] = new Array();
            for (var j = 0; j < 3; j++) {
                var gridd1 = document.querySelector("#grid1-" + i + "-" + j);
                var gridd2 = document.querySelector("#grid2-" + i + "-" + j);
                gridd1.style.border = "3px solid #c93083";
                gridd2.style.border = "3px solid #c93083";
                //初始化棋盘格内容
                player1[i][j] = 0;
                player2[i][j] = 0;
            }
        }
        <!--设置骰子的点击事件-->
        //随机生成先手，firstplay标记该哪个玩家投骰子，1为play1,2为play2;
        var firstplay = Math.ceil(Math.random() * 2);
        if (firstplay == 1) {
            play1 = 1;//1代表该玩家可以投骰子，0代表不可以
            play2 = 0;
            window.alert ("玩家1先手");
        }
        else if (firstplay == 2) {
            play1 = 0;
            play2 = 1;
            window.alert ("玩家2先手");
        }
        //鼠标点击骰子事件
        dicebtn.onclick = function () {
            document.getElementById("dicemusic").play();
            var num = Math.ceil(Math.random() * 6);//随机生成一个数
            dicebtn.style.backgroundImage = "url(../resource/img/" + num + ".gif"; //按照生成的数显示对应的骰子数
            gamestar_double(play1, play2,num);//进入函数来选择骰子的位置
            //检索行列是否有相等的值以及是否满格
            remove_score1(play1, play2);
            var full = get_full();
            get_score(full);
            //进入change()交换玩家
            play1=change(play1);
            play2=change(play2);
        }

    }

    <!--选择人机对战-->

    par2Btn.onclick=function () {
        document.getElementById("btnmusic").play();
        par1Btn.style.display = "none";
        par2Btn.style.display = "none";

        //显示骰子等元素
        dicebtn.style.display = "block";
        player1btn.style.display = "block";
        player2btn.style.display = "block";
        scores1.style.display="block";
        scores2.style.display="block";

        //创建div元素，添加玩家双方游戏框
        var check1 = document.createElement("div");
        check1.innerHTML = '<div id = check1></div>';
        var check2 = document.createElement("div");
        check2.innerHTML = '<div  id = check2></div>';
        //将选择的div添加到外层div
        checker1.appendChild(check1);
        checker2.appendChild(check2);

        //添加游戏区域的格子
        for (var i = 0; i < 3; i++) {
            player1[i] = new Array();
            player2[i] = new Array();
            for (var j = 0; j < 3; j++) {
                var gridd1 = document.querySelector("#grid1-" + i + "-" + j);
                var gridd2 = document.querySelector("#grid2-" + i + "-" + j);
                gridd1.style.border = "3px solid #c93083";
                gridd2.style.border = "3px solid #c93083";
                //初始化棋盘格内容
                player1[i][j] = 0;
                player2[i][j] = 0;
            }
        }
        <!--设置骰子的点击事件-->
        //随机生成先手，firstplay标记该哪个玩家投骰子，1为play1,2为play2;
        window.alert("您为玩家2！");
        var firstplay = Math.ceil(Math.random() * 2);
        if (firstplay == 1) {
            play1 = 1;//1代表该玩家可以投骰子，0代表不可以
            play2 = 0;
            window.alert("玩家1先手");
        } else if (firstplay == 2) {
            play1 = 0;
            play2 = 1;
            window.alert("玩家2先手");
        }

        dicebtn.onclick = function () {
            document.getElementById("dicemusic").play();
            var num = Math.ceil(Math.random() * 6);//随机生成一个数
            dicebtn.style.backgroundImage = "url(../resource/img/" + num + ".gif"; //按照生成的数显示对应的骰子数
            gamestar_robot(play1, play2, num);
            //检索行列是否有相等的值以及是否满格
            var full = get_full();
            get_score(full);
            remove_score2(play1,play2);

            play1 = change(play1);
            play2 = change(play2);

        }
    }
}

function gamestar_double(play1,play2,num){
    var okplay1=1;
    var okplay2=1;
    if (play1==1){
        headbtn1.style.display = "block";
        headbtn2.style.display = "none";
        grid100.onclick=function (){
            if (player1[0][0]==0 && okplay1==1){
                grid100.style.backgroundImage="url(../resource/img/" + num + ".png";
                player1[0][0]=num;
                okplay1=0;

            }
        }
        grid101.onclick=function (){
            if (player1[0][1]==0 && okplay1==1){
                grid101.style.backgroundImage="url(../resource/img/" + num + ".png";
                player1[0][1]=num;
                okplay1=0;

            }
        }
        grid102.onclick=function (){
            if (player1[0][2]==0 && okplay1==1){
                grid102.style.backgroundImage="url(../resource/img/" + num + ".png";
                player1[0][2]=num;
                okplay1=0;

            }
        }
        grid110.onclick=function () {
            if (player1[1][0] == 0 && okplay1 == 1) {
                grid110.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player1[1][0] = num;
                okplay1=0;

            }
        }
        grid111.onclick=function (){
            if (player1[1][1]==0 & okplay1==1) {
                grid111.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player1[1][1] = num;
                okplay1=0;

            }
        }
        grid112.onclick=function (){
            if (player1[1][2]==0 & okplay1==1) {
                grid112.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player1[1][2] = num;
                okplay1=0;

            }
        }
        grid120.onclick=function (){
            if (player1[2][0]==0 & okplay1==1) {
                grid120.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player1[2][0] = num;
                okplay1=0;

            }
        }
        grid121.onclick=function (){
            if (player1[2][1]==0 & okplay1==1) {
                grid121.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player1[2][1] = num;
                okplay1=0;

            }
        }
        grid122.onclick=function (){
            if (player1[2][2]==0 & okplay1==1) {
                grid122.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player1[2][2] = num;
                okplay1=0;

            }
        }

    }
    else if (play2==1) {
        headbtn2.style.display = "block";
        headbtn1.style.display = "none";
        grid200.onclick=function () {
            if (player2[0][0] == 0 & okplay2 == 1) {
                grid200.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[0][0] = num;
                okplay2=0;
            }
        }
        grid201.onclick=function () {
            if (player2[0][1] == 0 & okplay2 == 1) {
                grid201.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[0][1] = num;
                okplay2=0;

            }
        }
        grid202.onclick=function (){
            if (player2[0][2]==0 & okplay2==1){
                grid202.style.backgroundImage="url(../resource/img/" + num + ".png";
                player2[0][2]=num;
                okplay2=0;

            }
        }
        grid210.onclick=function () {
            if (player2[1][0] == 0 & okplay2 == 1) {
                grid210.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[1][0] = num;
                okplay2=0;

            }
        }
        grid211.onclick=function (){
            if (player2[1][1]==0 & okplay2==1) {
                grid211.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[1][1] = num;
                okplay2=0;

            }
        }
        grid212.onclick=function () {
            if (player2[1][2] == 0 & okplay2 == 1) {
                grid212.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[1][2] = num;
                okplay2=0;

            }
        }
        grid220.onclick=function (){
            if (player2[2][0]==0 & okplay2==1){
                grid220.style.backgroundImage="url(../resource/img/" + num + ".png";
                player2[2][0]=num;
                okplay2=0;

            }
        }
        grid221.onclick=function (){
            if (player2[2][1]==0 & okplay2==1) {
                grid221.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[2][1] = num;
                okplay2=0;

            }
        }
        grid222.onclick=function (){
            if (player2[2][2]==0 & okplay2==1){
                grid222.style.backgroundImage="url(../resource/img/" + num + ".png";
                player2[2][2]=num;
                okplay2=0;

            }
        }
    }
}

function gamestar_robot(play1, play2, num) {
    var okplay1=1;
    var okplay2=1;
    if (play1==1){
        var x;
        var y;
        headbtn1.style.display = "block";
        headbtn2.style.display = "none";
        x = Math.floor(Math.random() * 3);
        y = Math.floor(Math.random() * 3);
        while (okplay1) {
            for(var i=0;i<=2;i++){
                for (var j=0;j<=2;j++){
                    for (var k=0;k<=2;k++){
                        if ((player2[i][j]==num) && (player1[i][k]==0)){
                            var play_grid = document.querySelector("#grid1-" + i + "-" + k);
                            play_grid.style.backgroundImage = "url(../resource/img/" + num + ".png";
                            player1[i][k] = num;
                            return ;
                        }
                    }
                }
            }
            for(var i=0;i<=2;i++){
                for (var j=0;j<=2;j++){
                    for (var k=0;k<=2;k++){
                        if ((player1[i][j]==num) && (player1[i][k]==0)){
                            var play_grid = document.querySelector("#grid1-" + i + "-" + k);
                            play_grid.style.backgroundImage = "url(../resource/img/" + num + ".png";
                            player1[i][k] = num;
                            return ;
                        }
                    }
                }
            }
            if (player1[x][y]==0) {
                var play_grid = document.querySelector("#grid1-" + x + "-" + y);
                play_grid.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player1[x][y] = num;
                break;
            }
            else {
                x = Math.floor(Math.random() * 3);
                y = Math.floor(Math.random() * 3);
            }
        }
    }
    else if (play2==1) {
        headbtn2.style.display = "block";
        headbtn1.style.display = "none";
        grid200.onclick=function () {
            if (player2[0][0] == 0 & okplay2 == 1) {
                grid200.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[0][0] = num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[0][0]==player1[0][i]){
                        player1[0][i] = 0;
                        var gridd = document.querySelector("#grid1-0"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }

            }
        }
        grid201.onclick=function () {
            if (player2[0][1] == 0 & okplay2 == 1) {
                grid201.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[0][1] = num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[0][1]==player1[0][i]){
                        player1[0][i] = 0;
                        var gridd = document.querySelector("#grid1-0"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
        grid202.onclick=function (){
            if (player2[0][2]==0 & okplay2==1){
                grid202.style.backgroundImage="url(../resource/img/" + num + ".png";
                player2[0][2]=num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[0][2]==player1[0][i]){
                        player1[0][i] = 0;
                        var gridd = document.querySelector("#grid1-0"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
        grid210.onclick=function () {
            if (player2[1][0] == 0 & okplay2 == 1) {
                grid210.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[1][0] = num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[1][0]==player1[1][i]){
                        player1[1][i] = 0;
                        var gridd = document.querySelector("#grid1-1"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
        grid211.onclick=function (){
            if (player2[1][1]==0 & okplay2==1) {
                grid211.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[1][1] = num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[1][1]==player1[1][i]){
                        player1[1][i] = 0;
                        var gridd = document.querySelector("#grid1-1"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
        grid212.onclick=function () {
            if (player2[1][2] == 0 & okplay2 == 1) {
                grid212.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[1][2] = num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[1][2]==player1[1][i]){
                        player1[1][i] = 0;
                        var gridd = document.querySelector("#grid1-1"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
        grid220.onclick=function (){
            if (player2[2][0]==0 & okplay2==1){
                grid220.style.backgroundImage="url(../resource/img/" + num + ".png";
                player2[2][0]=num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[2][0]==player1[2][i]){
                        player1[2][i] = 0;
                        var gridd = document.querySelector("#grid1-2"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
        grid221.onclick=function (){
            if (player2[2][1]==0 & okplay2==1) {
                grid221.style.backgroundImage = "url(../resource/img/" + num + ".png";
                player2[2][1] = num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[2][1]==player1[2][i]){
                        player1[2][i] = 0;
                        var gridd = document.querySelector("#grid1-2"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
        grid222.onclick=function (){
            if (player2[2][2]==0 & okplay2==1){
                grid222.style.backgroundImage="url(../resource/img/" + num + ".png";
                player2[2][2]=num;
                okplay2=0;
                for (var i=0;i<=2;i++){
                    if (player2[2][2]==player1[2][i]){
                        player1[2][i] = 0;
                        var gridd = document.querySelector("#grid1-2"+"-" + i);
                        gridd.style.backgroundImage = "none";
                    }
                }
            }
        }
    }

}

function change(play){
    var a=0;
    var b=1;
    if (play==a){
        play=b;
    }
    else {
        play=a;
    }
    return play;
}
function remove_score1(play1,play2) {
    for (i = 0; i <= 2; i++) {
        for (j = 0; j <= 2; j++) {
            for (k = 0; k <= 2; k++) {
                if (play1 == 1 && (player1[i][j] == player2[i][k]) &&(player1[i][j]!=0)&&(player2[i][k]!=0)) {
                    player1[i][j] = 0;
                    var gridd = document.querySelector("#grid1-" + i + "-" + j);
                    gridd.style.backgroundImage = "none";
                }
                else if (play2 == 1 && (player2[i][j] == player1[i][k])&& (player2[i][j]!=0)&&(player1[i][k]!=0)) {
                    player2[i][j] = 0;
                    var gridd = document.querySelector("#grid2-" + i + "-" + j);
                    gridd.style.backgroundImage = "none";
                }
            }
        }
    }
}

function remove_score2(play1,play2) {
    for (i = 0; i <= 2; i++) {
        for (j = 0; j <= 2; j++) {
            for (k = 0; k <= 2; k++) {
                if (play1 == 1 && (player1[i][j] == player2[i][k]) &&(player1[i][j]!=0)&&(player2[i][k]!=0)) {
                    player2[i][k] = 0;
                    var gridd = document.querySelector("#grid2-" + i + "-" + k);
                    gridd.style.backgroundImage = "none";
                }
            }
        }
    }
}
function get_full(){
    var num1=0;
    var num2=0;
    for (i = 0; i <= 2; i++) {
        for (j = 0; j <= 2; j++) {
            if (player1[i][j]!= 0) {
                num1=num1+1;
            }
            if (player2[i][j] != 0) {
                num2=num2+1;
            }
            if (num2==9 || num1==9) {
                return true
            }
        }
    }
    return false;
}

function get_score(full) {
    var i1, j1, i2, j2;
    var sum1 = 0;
    var sum2 = 0;
    var num1 = 0, num2 = 0;
    var score1 = 0, score2 = 0;
    for (i1 = 0; i1 < 3; i1++) {
        if (player2[i1][0] == player2[i1][1] && player2[i1][0] != player2[i1][2])
            score1 = score1 + (player2[i1][0] * 4) + player2[i1][2];
        if (player2[i1][0] == player2[i1][2] && player2[i1][0] != player2[i1][1])
            score1 = score1 + (player2[i1][0] * 4) + player2[i1][1];
        if (player2[i1][0] == player2[i1][2] && player2[i1][0] == player2[i1][1])
            score1 = score1 + (player2[i1][0] * 9);
        if (player2[i1][2] == player2[i1][1] && player2[i1][2] != player2[i1][0])
            score1 = score1 + (player2[i1][2] * 4) + player2[i1][0];
        if (player2[i1][0] != player2[i1][1] && player2[i1][0] != player2[i1][2] && player2[i1][1] != player2[i1][2])
            score1 = score1 + player2[i1][0] + player2[i1][1] + player2[i1][2];
    }
    for (i2 = 0; i2 < 3; i2++) {
        if (player1[i2][0] == player1[i2][1] && player1[i2][0] != player1[i2][2])
            score2 = score2 + (player1[i2][0] * 4) + player1[i2][2];
        if (player1[i2][0] == player1[i2][2] && player1[i2][0] != player1[i2][1])
            score2 = score2 + (player1[i2][0] * 4) + player1[i2][1];
        if (player1[i2][0] == player1[i2][2] && player1[i2][0] == player1[i2][1])
            score2 = score2 + (player1[i2][0] * 9);
        if (player1[i2][2] == player1[i2][1] && player1[i2][2] != player1[i2][0])
            score2 = score2 + (player1[i2][2] * 4) + player1[i2][0];
        if (player1[i2][0] != player1[i2][1] && player1[i2][0] != player1[i2][2] && player1[i2][1] != player1[i2][2])
            score2 = score2 + player1[i2][0] + player1[i2][1] + player1[i2][2];
    }
    if (score1 > score2) {
        if(full==true){
            succes.style.backgroundImage = "url(../resource/img/play2_suc.png";
            dicebtn.style.backgroundImage = "none";
        }

        scores2.innerHTML="得分:"+score2;
        scores1.innerHTML="得分:"+score1;
    }
    if (score1 < score2) {
        if(full==true){
            succes.style.backgroundImage = "url(../resource/img/play1_suc.png";
            dicebtn.style.backgroundImage = "none";
        }
        scores2.innerHTML="得分:"+score2;
        scores1.innerHTML="得分:"+score1;

    }
}