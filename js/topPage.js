function ow2IconClick(){
    const chat = document.getElementById("chat")
    chat.style.display = (chat.style.display === "block") ? "none" : "block";
}


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