// ------------------------------
// 処理部
// ------------------------------

// 表用のタイトル用定義
var isCheckTitle = "選択";          // 選択（タイトル）
var itemNameTitle = "アイテム名";    // アイテム名（タイトル）
var iconTitle = "アイコン";          // アイコン（タイトル）
var statusTitle = "ステータス";      // ステータス（タイトル）
var textTitle = "テキスト";          // テキスト（タイトル）

// アイテムリスト定義（初期化）
var itemList = [];

// アイテムリスト作成
addItemList(false,"コンペンセイター",0,0,0);
addItemList(false,"プラズマコンバーター",0,0,0);

// アイテムリストをテーブルに紐付け
linkItemList(itemList);

// ------------------------------
// 関数部
// ------------------------------

// ヒーロー選択ウィンドウを開く
function openHeroWindow(){
    document.getElementById("herowindow").style.display = "block";
}

// ヒーロー選択ウィンドウを閉じる
function closeHeroWindow(){
    document.getElementById("herowindow").style.display = "none";
}

// ヒーロー選択
function selectHero(){
    document.getElementById("herowindow").style.display = "none";
}

// アイテムリストにアイテム情報を追加する関数
function addItemList(ischeck, itemName, icon, status, text) {
    
    // アイテム情報を連想配列にする
    let itemData = {isCheckTitle:ischeck,
                    itemNameTitle:itemName,
                    iconTitle:icon,
                    statusTitle:status,
                    textTitle:text};

    // アイテム情報をアイテムリストに追加
    itemList.push(itemData);
}

// アイテムリストをテーブルに紐づける関数
function linkItemList(itemList) {
    var tbody = document.getElementById("item-table").querySelector("tbody");
    for(let i=0; i<itemList.length; i++) {
        var tr = document.createElement("tr");
        for(var title in itemList[i]){
            if(itemList[i].hasOwnProperty(title)) {
                var td = document.createElement("td");
                td.textContent = itemList[i][title];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    }
}