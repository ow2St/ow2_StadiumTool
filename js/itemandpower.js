
/*
function ow2IconClick(){
    const chat = document.getElementById("chat")
    chat.style.display = (chat.style.display === "block") ? "none" : "block";
}

const Button = 
*/

/* function IAPbutton(){
    const b=document.getElementById("itemButton");
    b.style.backgroundColor = "lightgray";
        document.getElementById("itemButton").style.backgroundColor = "lightgray";
} */
let isCheckWeapon = true;

//武器ボタン選択カラー変更
function IAPbutton(){
    var Button = document.getElementById("itemButtonWeapon");
    if(isCheckWeapon){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckWeapon = !isCheckWeapon;
    /* Button.style.backgroundColor = (Button.style.backgroundColor == "lightgray") ? "white" : "lightgray"; */
}

//タブ切り替え
const a = document.getElementById('a');
const aa = document.getElementById('aa');
const b = document.getElementById('b');
const bb = document.getElementById('bb');

function changeTabA() {
   // ▼B-2. 指定のタブページだけを表示する
   aa.style.display = "block";
   bb.style.display = "none";
   aa.style.zIndex = "10";

   // ▼B-4. ページ遷移しないようにfalseを返す
   return false;
}

function changeTabB() {
   // ▼B-2. 指定のタブページだけを表示する
   bb.style.display = "block";
   aa.style.display = "none";
   bb.style.zIndex = "10";

   // ▼B-4. ページ遷移しないようにfalseを返す
   return false;
}