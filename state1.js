//完成游戏的初始化

$(function (){
    init();
});
function init(){
    //完成棋盘格的初始化
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            var grid1=$("#grid1-"+i+"-"+j);
            var grid2=$("#grid2-"+i+"-"+j);
            grid1.css("top",getPosTop(i,j));
            grid1.css("left",getPosLeft(i,j));
            grid2.css("top",getPosTop(i,j));
            grid2.css("left",getPosLeft(i,j));
        }
    }
}
function getPosTop(i,j){
    return i*100;
}
function getPosLeft(i,j){
    return j*100;
}
