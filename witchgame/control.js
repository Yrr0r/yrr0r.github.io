
// color of boxes:
var bluebox = [2,8,14,25];
var greenbox = [6,15,24,28,35];
var yelwbox = [9,18,27,36];
var redbox = [10,20,31,37];

var curpos = 0;

var gametext = [
    "你不小心超出了终点，要被丢入泳池中了", // DEFAULT
    "1）塞上一枚跳蛋，前进1格",
    "2）与你的对象接吻",
    "3）脱下丝袜，含在口中一分钟",
    "4）将跳蛋频率调高一档",
    "5）脱去内衣和内裤，前进3格",
    "6）戴上手铐",
    "7）脱去身上所有衣物",
    "8）与你的对象进行一轮“真心话大冒险”游戏",
    "9）塞上按摩棒,前进1格",
    "10）休息一轮，后前进3格",
    "11）后退2格",
    "12）脱下内裤并含在嘴中三分钟",
    "13）将按摩棒调至最高档位，持续时间两分钟",
    "14）脱光所有的衣服并后退一格",
    "15）单脚站立保持平衡一分钟",
    "16）被你的对象打屁股x*10下，x为你本轮扔到的骰子数",
    "17）戴上脚铐，被你的对象挠一分钟脚心",
    "18）脱一件衣服，前进3格",
    "19）戴上口球，若一分钟内没有口水流出，则获得buff【不用执行下一次命令】若有口水流出，则多加一枚跳蛋",
    "20）脱去上衣并戴上乳夹，允许你休息一轮",
    "21）把你身体里所有的跳蛋转移给一名指定玩家",
    "22）与你的对象接吻，然后前进三格",
    "23）捆住手腕脚踝，然后后退一格",
    "24）单脚站立一分钟，同时让你的对象给你不断地挠脚心",
    "25）指定一名玩家进行roll点，如果你的点数高，则可以调高她所有道具的频率1档，反之则自己被调高2档",
    "26）打你的对象屁股5x下，x为本轮点数",
    "27）向你的对象念以下话语：“我最喜欢xxx（名字）了，以后心甘情愿成为xxx的宠物，让我做什么事情都可以”",
    "28）戴上口球，同时被打屁股5x下，x为本轮点数",
    "29）脱去所有衣服，然后前进2格，并执行31格的指令【保持M字开腿自慰直至高潮，同时进行录像】",
    "30）取下所有的道具，然后前进1格，并执行31格的指令【保持M字开腿自慰直至高潮，同时进行录像】",
    "31）保持M字开腿自慰直至高潮，同时进行录像",
    "32）你太幸运了，回到原点",
    "33）与你的对象互换所在的格子",
    "34）后退10格，同时本轮游戏之中不允许再高潮",
    "35）摘下所有装饰，后退4格，并执行31格的指令【保持M字开腿自慰直至高潮，同时进行录像】",
    "36）如果没有经过31格，则执行一次31格的指令【保持M字开腿自慰直至高潮，同时进行录像】，如果经过了31格，则播放31格时候的录像",
    "37）将按摩棒和跳蛋的频率调整至最高，持续三分钟",
    "38）如果你的身上还有衣服，那么直接前进至40格，获得胜利。如果没有衣服，则返回至30格",
    "39）如果你的身上没有衣服，那么直接前进至40格，获得胜利。如果还有衣服，则脱光所有衣服并丢进泳池",
    "40）恭喜你到达了终点，现在可以指定所有人完成一个命令"
]

var jumps = {
    1:1, 5:3, 9:1, 10:3, 11:-2, 14:-1, 18:3, 22:3, 23:-1, 29:2, 30:1, 32: "RESET", 34:-10, 35:-3
}

// init
init();

function box(nth){
    return `board${nth}`;
}

function init(){
    // Activate the tooltip plugin:
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // Create boxes:
    for(i=1; i<=8; i++){
        if(i%2 == 1){
            for(c=1; c<=5; c++){
                var counter = (i-1)*5 + c;
                var newEle = document.createElement(`span`);
                document.getElementById("chessboard").appendChild(newEle);
                newEle.id = `board${counter}`; newEle.classList = "col-sm-2 m-1 p-3 border bg-light";
                newEle.setAttribute("data-toggle", "tooltip");
                newEle.setAttribute("title", gametext[counter]);
                newEle.innerHTML = `${counter}`;

                counter ++;
            }
            
        } else {
            for(c=5; c>=1; c--){
                var counter = (i-1)*5 + c;
                var newEle = document.createElement(`span`);
                document.getElementById("chessboard").appendChild(newEle);
                newEle.id = `board${counter}`; newEle.classList = "col-sm-2 m-1 p-3 border bg-light";
                newEle.setAttribute("data-toggle", "tooltip");
                newEle.setAttribute("title", gametext[counter]);
                newEle.innerHTML = `${counter}`;

                counter ++;
            }
        }
    }
    // Color them:
    for(i of bluebox) {
        document.getElementById(box(i)).classList.replace("bg-light","bg-primary");
    }
    for(i of greenbox) {
        document.getElementById(box(i)).classList.replace("bg-light","bg-success");
    }
    for(i of yelwbox) {
        document.getElementById(box(i)).classList.replace("bg-light","bg-warning");
    }
    for(i of redbox) {
        document.getElementById(box(i)).classList.replace("bg-light","bg-danger");
    }
}

// 开始游戏按钮
function startgame(){
    document.getElementById("notes").hidden = true;
    document.getElementById("gameview").hidden = false;
}

//掷骰子
function roll(){
    if(curpos > 40){
            document.getElementById("rollButton").classList.add("disabled");
            return ;
    }

    randint = Math.floor(Math.random()*5 + 1);
    if(randint == 6){
        document.getElementById("currentDraw").innerText = "你扔到了6，请把档位提高一档并重新再扔一次吧";
    } else {
        curpos = curpos + randint;

        var action = gametext[curpos];
        if(curpos > 40) action = gametext[0];
        
        if(jumps[curpos] != undefined){
            if(jumps[curpos] == "RESET"){
                curpos = 0;
            } else {
                curpos = curpos + jumps[curpos];
            }
        }

        document.getElementById("currentDraw").innerText = `你扔到了${randint}, 并且：${action}`;

        document.getElementById("curpos").innerText = curpos;
        markpiece(curpos);
        appendlog(curpos);
        
    }
    

}

function appendlog(num){
    gamelog = document.getElementById("gamelog");
    
    var newnum = document.createElement("span");
    newnum.id = `lognum${num}`;
    newnum.innerText = num;
    newnum.classList = "badge badge-secondary m-1";
    
    gamelog.appendChild(newnum);

}

function markpiece(num){
    piece = document.getElementById(`board${num}`);
    piece.classList.add("font-weight-bold");
    piece.classList.add("border-success");
}
