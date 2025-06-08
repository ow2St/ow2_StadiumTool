//サンプル（コピペしただけ）
/*function itemTab(){
    document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');

        // ボタンのアクティブ状態を切り替え
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // コンテンツのアクティブ状態を切り替え
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
    });
}*/

/*
function ow2IconClick(){
    const chat = document.getElementById("chat")
    chat.style.display = (chat.style.display === "block") ? "none" : "block";
}
*/

function IAPbutton(){
    const Button = document.getElementById("itemButton")
    button.style.backgroundColor = (button.style.backgroundColor === "#fff") ? "#ffffff80" : "#fff";
}/*TODO:カラーが反映されない*/