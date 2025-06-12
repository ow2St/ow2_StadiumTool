// ------------------------------
// 処理部
// ------------------------------

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

// アイテムリストをテーブルに紐づける関数
function linkItemList(itemList) {
    var tbody = document.getElementById("item-table").querySelector("tbody");

    // 各アイテムごとにループ
    for(let i=0; i<itemList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとのフラグと変数を初期化 
        let isCheck = false;
        let checkText = false;  // 選択列はアイテム情報になく、初期時必ずfalseを入れる
        let isItemName = false;
        let itemNameText = "";
        let isIcon = false;
        let iconText = "-";  // アイコン列は現状アイテム情報にないため、とりあえずハイフンを入れる　TODO：RIN
        let isStatus = false;
        let statusText = "";
        let isText = false;
        let textText = "";

        // 各キーペアごとにループ
        Object.keys(itemList[i]).forEach(key => {

            // キー名がアイテム名キーの場合
            if(itemNameKey == key) {

                // アイテム名用変数に値を代入
                itemNameText = itemList[i][key];
            }

            // キー名がステータス関連のキーの場合
            if([lifeKey, armorKey, shieldKey, weaponPowerKey, abilityPowerKey, 
                attackSpeedKey, ctReducationKey, ammoKey, weapon_LifeStealKey, 
                ability_LifeStealKey, speedKey, reloadSpeedKey, meleeDamageKey, 
                criticalKey].includes(key)) {

                // 値が0でない場合
                if(itemList[i][key] != 0) {
                    statusText = statusText + String(itemList[i][key]) + "\n";
                }
            }

            // キー名がその他キーの場合
            if(textKey == key) {

                // 値が"-"でない場合
                if(itemList[i][key] != "-") {
                    statusText = statusText + String(itemList[i][key]);
                    statusText = statusText.replaceAll(",", "\n");
                }
            }

            // キー名がテキストキーの場合
            if(textKey == key) {

                // テキスト用変数に値を代入
                textText = itemList[i][key];
            }

        })

        // 取得した各値をテーブルに紐付け
        // 選択列
        var td = document.createElement("td");
        td.textContent = checkText;
        tr.appendChild(td);

        // アイテム名列
        var td = document.createElement("td");
        td.textContent = itemNameText;
        tr.appendChild(td);

        // アイコン列
        var td = document.createElement("td");
        td.textContent = iconText;
        tr.appendChild(td);

        // ステータス列
        var td = document.createElement("td");
        td.innerHTML = statusText.replace(/\n/g, "<br>");
        tr.appendChild(td);

        // テキスト列
        var td = document.createElement("td");
        td.textContent = textText;
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}