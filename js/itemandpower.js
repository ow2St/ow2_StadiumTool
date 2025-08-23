// ------------------------------
// 処理部
// ------------------------------

// アイテム・パワーリストをテーブルに紐付け
linkItemList(itemList);
linkPowerList(powerList);

//パワー一覧　D.VAアイコンをONにする
window.onload = function() {
    const defaultHero = document.getElementById("D.VA");
    filterPowerTable(defaultHero);
};

//タブ切り替え初期化
const tabItem = document.getElementById('tabItem');
const itemContent = document.getElementById('item-content');
const tabPower = document.getElementById('tabPower');
const powerContent = document.getElementById('power-content');

const sortingCriteria = [
        { column: "itemName", type: "string" },
        { column: "powerName", type: "string" },
        { column: "rarity", type: "string" },
        { column: "cost", type: "number" }
    ]

let sortDirection = new Array(8).fill(null);

// ------------------------------
// 関数部
// ------------------------------

//タブ切り替え
// アイテムタブに遷移
function changeTabItem() {
   itemContent.style.display = "block";
   powerContent.style.display = "none";
   tabPower.style.backgroundColor = "white";
   tabItem.style.backgroundColor = "lightgray";
   tabPower.style.border = "1px dashed black";
   tabPower.style.borderBottom = "none";
   tabPower.style.borderLeft = "none";
   tabItem.style.border = "1px solid black";
   tabItem.style.borderBottom = "none";
}
// パワータブに遷移
function changeTabPower() {
   powerContent.style.display = "block";
   itemContent.style.display = "none";
   tabItem.style.backgroundColor = "white";
   tabPower.style.backgroundColor = "lightgray";
   tabItem.style.border = "1px dashed black";
   tabItem.style.borderBottom = "none";
   tabItem.style.borderRight = "none";
   tabPower.style.border = "1px solid black";
   tabPower.style.borderBottom = "none";
}

// アイテムリストをテーブルに紐づける関数
function linkItemList(itemList) {
    let tbody = document.getElementById("item-table").querySelector("tbody");

    // 各アイテムごとにループ
    for(let i=0; i<itemList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化 
        let itemNameText = "";
        let iconText = "";
        let categoryText = "";
        let rarityText = "";
        let costText = "";
        let uniqueHeroText = "";
        let statusText = "";
        let textText = "";

        // 各キーペアごとにループ
        Object.keys(itemList[i]).forEach(key => {

            // キー名がアイテム名キーの場合
            if(itemNameKey == key) {

                // アイテム名用変数に値を代入
                itemNameText = itemList[i][key];
            }

            // キー名がアイコンキーの場合
            if(iconKey == key) {

                // アイコン用変数に値を代入
                iconText = itemList[i][key];
            }

            // キー名がカテゴリーキーの場合
            if(categoryKey == key) {

                // カテゴリー用変数に値を代入
                categoryText = itemList[i][key];
            }

            // キー名がレアリティキーの場合
            if(rarityKey == key) {

                // レアリティ用変数に値を代入
                rarityText = itemList[i][key];
            }

             // キー名がコストキーの場合
            if(costKey == key) {

                // コスト用変数に値を代入
                costText = itemList[i][key];
            }

             // キー名が固有ヒーローキーの場合
            if(uniqueHeroKey == key) {

                // 固有ヒーロー用変数に値を代入
                uniqueHeroText = itemList[i][key];
            }

            // キー名がステータス関連のキーの場合
            if([lifeKey, armorKey, shieldKey, weaponPowerKey, abilityPowerKey, 
                attackSpeedKey, ctReducationKey, ammoKey, weapon_LifeStealKey, 
                ability_LifeStealKey, speedKey, reloadSpeedKey, meleeDamageKey, 
                criticalKey].includes(key)) {

                // 値が0でない場合
                if(itemList[i][key] != 0) {
                    statusText = statusText + key + "+" + String(itemList[i][key]) + "\n";
                }
            }

            // キー名がその他キーの場合
            if(othersKey == key) {

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
    
    tbody.appendChild(appendChildItemList(tr, itemNameText, iconText, categoryText, rarityText, costText, uniqueHeroText, statusText, textText));
    
    tr.classList.add("table-on");
    }
}

// アイテムリスト用子要素作成関数
function appendChildItemList(tr, itemNameText, iconText, categoryText, rarityText, costText, uniqueHeroText, statusText, textText){

    // アイテム名列
    var td = document.createElement("td");
    td.textContent = itemNameText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // アイコン列
    var td = document.createElement("td");
    var iconImg = document.createElement("img");
    iconImg.src = "assets/images/icons/item/" + iconText;
    iconImg.classList.add("itemandpower-itemicon");
    td.appendChild(iconImg);
    td.classList.add("item-td");
    tr.appendChild(td);

    // カテゴリー列
    var td = document.createElement("td");
    td.textContent = categoryText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // レアリティ列
    var td = document.createElement("td");
    td.textContent = rarityText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // コスト列
    var td = document.createElement("td");
    td.textContent = costText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // 固有ヒーロー列
    var td = document.createElement("td");
    td.textContent = uniqueHeroText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // ステータス列
    var td = document.createElement("td");
    td.innerHTML = statusText.replace(/\n/g, "<br>");
    td.classList.add("item-td");
    tr.appendChild(td);

    // テキスト列
    var td = document.createElement("td");
    td.textContent = textText;
    td.classList.add("item-td");
    tr.appendChild(td);

    return tr;
}

// 絞り込み条件を更新する関数（アイテム）
function filterItemTable(elem){

    // 絞り込みボタンのON/OFF切り替え
    const tag = elem.tagName.toLowerCase();
    let isNowOn;
    if (tag === "button") {
        isNowOn = elem.classList.contains("button-on");
        elem.classList.toggle("button-on", !isNowOn);
        elem.classList.toggle("button-off", isNowOn);
    } else if (tag === "input" && elem.type === "checkbox") {
        isNowOn = elem.checked;
        elem.classList.toggle("checkbox-on", isNowOn);
        elem.classList.toggle("checkbox-off", !isNowOn);
    }

    // 各絞り込み一覧を取得
    const buttons_category = document.querySelectorAll("#button-category button");
    const buttons_rarity = document.querySelectorAll("#button-rarity button");
    const buttons_status = document.querySelectorAll("#button-status button");
    const uniqueHero = document.getElementById("uniqueHero");

    // テーブルのヘッダー行（<tr>）を取得
    const headerRow = document.querySelector("#item-table thead tr");

    // 各 <th> 要素を配列として取得
    const headers = Array.from(headerRow.querySelectorAll("th"));

    // 各絞り込み要素が何番目かを取得
    const categoryNumber = headers.findIndex(th => th.textContent == "カテゴリー");
    const rarityNumber = headers.findIndex(th => th.textContent == "レアリティ");
    const statusNumber = headers.findIndex(th => th.textContent == "ステータス");
    const uniqueHeroNumber = headers.findIndex(th => th.textContent == "固有ヒーロー");

    //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_item に配列のように格納。各行を1つのアイテムとする。
    var tbody_item = document.getElementById("item-table").querySelector("tbody");
    var rows_item = tbody_item.querySelectorAll("tr");

    // 行ごとの絞り込み
    // アイテム行をループ
    rows_item.forEach(tr => {
        const cells = tr.querySelectorAll("td");

        // 毎回クラスを初期化
        tr.classList.remove("table-on");
        tr.classList.remove("table-off");

        let shouldShow = true;  // 表示判定フラグ
        let shouldShowStatus = false;  // ステータス判定用フラグ

        // 非表示にするアイテムを探す
        // 固有ヒーロー関連
        if (!uniqueHero.checked) {
            shouldShow = !(cells[uniqueHeroNumber]?.innerText != "-");
        }

        // カテゴリー関連
        buttons_category.forEach(button =>{
            
            // ボタンがOFFの場合
            if(button.className == "button-off" && shouldShow){
                shouldShow = !(cells[categoryNumber]?.innerText == button.innerText);
            }
        });

        // レアリティ関連
        buttons_rarity.forEach(button =>{

            // ボタンがOFFの場合
            if(button.className == "button-off" && shouldShow){
                shouldShow = !(cells[rarityNumber]?.innerText == button.innerText);
            }
        });

        // ステータス関連
        buttons_status.forEach(button => {
            const statusList = cells[statusNumber]?.innerText.split("\n").map(s => s.trim());

            // ボタンがONの場合
            if(button.className == "button-on" && !shouldShowStatus){
                
                // ライフはライフ吸収と重複するので専用処理
                if(button.innerText == "ライフ"){
                    shouldShowStatus = statusList.some(status => status.includes("ライフ+"));
                }else if(button.innerText == "その他"){
                    shouldShowStatus = statusList.some(status => status.includes("※"));
                }else{
                    shouldShowStatus = statusList.some(status => status.includes(button.innerText));
                }
            }
        });

        // 非表示対応
        if(shouldShow && shouldShowStatus){
            tr.classList.add("table-on");
        }else{
            tr.classList.add("table-off");
        }
    });
}

//　検索ボックスで絞り込み（アイテム）
function item_searchWords() {

    //ボタンを全てOFFにした状態に
    let activeButtons = document.querySelectorAll("button.button-on");
    activeButtons.forEach(btn => filterItemTable(btn));

    //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_item に配列のように格納。各行を1つのアイテムとする。
    var tbody_item = document.getElementById("item-table").querySelector("tbody");
    var rows_item = tbody_item.querySelectorAll("tr");

    // 行ごとの絞り込み
    // アイテム行をループ
    rows_item.forEach(tr => {
        const cells = tr.querySelectorAll("td");

        // 毎回クラスを初期化
        tr.classList.remove("table-on");
        tr.classList.remove("table-off");

        // 非表示にするアイテムを探す

        const itemName = cells[0]?.textContent.trim() || "";
        const textColumn = cells[7]?.textContent.trim() || "";

        // 検索ワードを取得
        const keyword = document.getElementById("item_search-input").value.trim();

        // 非表示フラグ　keywordが空の場合は全て非表示、
        const shouldShow = keyword !== "" && (itemName.includes(keyword) || textColumn.includes(keyword));

        // 非表示対応
        if(shouldShow){
            tr.classList.add("table-on");
        }else{
            tr.classList.add("table-off");
        }
    });

}

//アイテムテーブルソートの前提準備
function itemSortClick(id){
    const tHeader=document.getElementById("item-table").querySelectorAll("th");
    const tBody = document.getElementById("item-table").querySelector("tbody");
    const criteria = Array.from(sortingCriteria.entries()).find(([key,row]) => row.column === id);
    const columnIndex = Array.from(tHeader).findIndex(th => th.dataset.column == id);
    const currentDirection = sortDirection[columnIndex] == true ? false:true;
    sortDirection = new Array(8).fill(null);
    sortDirection[columnIndex] = currentDirection

    itemTableSort(tHeader,tBody,criteria[1],columnIndex,currentDirection);

    // 表示テキスト更新
    const labelMap = {
        itemName: "アイテム名",
        rarity: "レアリティ",
        cost: "コスト"
    };

    // テーブル列名初期化
    sortingCriteria.forEach(row => {
        document.getElementById(row.column).innerText = labelMap[row.column];
    });
    
    let arrows = "";
    
    if(sortDirection[columnIndex]){
        arrows = "▲"
    }else if(!sortDirection[columnIndex]){
        arrows = "▼"
    }

    // ソート結果に応じた列名に更新
    document.getElementById(id).innerText = labelMap[id] + arrows;

}

// アイテムテーブルをソートする関数
function itemTableSort(headers, tbody, sortingCriteria,index,sorting) {

    //レア度の並び替えの基準を設定
    const rarityOrder = ['コモン', 'レア', 'エピック']

    const rows = Array.from(tbody.querySelectorAll("tr"));

    // 日本語ロケールに基づいた比較器（五十音順）
    const collator = new Intl.Collator('ja-JP', { sensitivity: 'base' });
    // 比較
    const comparator = (rowA, rowB) => {
        const { column, type } = sortingCriteria;

        const cellA = rowA.children[index].textContent.trim();
        const cellB = rowB.children[index].textContent.trim();

        let valA, valB;

        // データの型に応じて比較対象の値を変換（デフォルトはString型）
        if (type == "number") {
            valA = parseFloat(cellA);
            valB = parseFloat(cellB);
        } else {
            valA = cellA;
            valB = cellB;
        }

        // レア度を比較用に数値変換
        if (column == "rarity") {
            valA = rarityOrder.indexOf(valA);
            valB = rarityOrder.indexOf(valB);
        }

        let comparison = 0;

        // 文字列は日本語ロケールで比較
        if (type === "string" && column !== "rarity") {
            comparison = collator.compare(valA, valB);
        } else {
            if (valA < valB) comparison = -1;
            else if (valA > valB) comparison = 1;
        }
        
        // ソート順序を適用し、結果が0でない場合はここで終了
        return sorting ? comparison : -comparison;

        // 全てのキーが同じ場合
        return 0; 
    };
        

    // 配列のソート
    rows.sort(comparator);
    // 既存の行をすべて削除
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    // ソートされた順序で行を追加
    rows.forEach(row => tbody.appendChild(row));
}

// パワーリストをテーブルに紐づける関数
function linkPowerList(powerList) {
    let tbody = document.getElementById("power-table").querySelector("tbody");

    // 各アイテムごとにループ
    for(let i=0; i<powerList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化
        let powerNameText = "";
        let iconText = "";
        let heroText = "";
        let textText = "";

        // 各キーペアごとにループ
        Object.keys(powerList[i]).forEach(key => {

            // キー名がパワー名キーの場合
            if(powerNameKey == key) {

                // パワー名用変数に値を代入
                powerNameText = powerList[i][key];
            }

            // キー名がアイコンキーの場合
            if(iconKey == key) {

                // アイコン用変数に値を代入
                iconText = powerList[i][key];
            }

            // キー名がヒーローキーの場合
            if(heroKey == key) {

                // ヒーロー用変数に値を代入
                heroText = powerList[i][key];
            }
            // キー名がテキストキーの場合
            if(textKey == key) {

                // テキスト用変数に値を代入
                textText = powerList[i][key];
            }
        })
    
    tbody.appendChild(appendChildPowerList(tr, powerNameText, iconText, heroText, textText));
    tr.classList.add("table-off"); //アイテムテーブルと違い、パワーテーブルは初期表示が非表示の為（D.VA以外）
    }
}

// パワーリスト用子要素作成関数
function appendChildPowerList(tr, powerNameText, iconText, heroText, textText){
    

    // パワー名列
    var td = document.createElement("td");
    td.textContent = powerNameText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // アイコン列
    var td = document.createElement("td");
    var iconImg = document.createElement("img");
    iconImg.src = "assets/images/icons/power/" + iconText;
    iconImg.classList.add("itemandpower-powericon");
    td.appendChild(iconImg);
    td.classList.add("item-td");
    tr.appendChild(td);

    // ヒーロー列
    var td = document.createElement("td");
    td.textContent = heroText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // テキスト列
    var td = document.createElement("td");
    td.textContent = textText;
    td.classList.add("item-td");
    tr.appendChild(td);

    return tr;
}

// 絞り込み条件を更新する関数（パワー）
function filterPowerTable(elem) {
    const id = elem.id;
    const targetText = id;

    // まず画像のON/OFF切り替え（クラス切り替え）
    const isNowOn = elem.classList.contains("power-hero-icon-on");
    if (isNowOn) {
        elem.classList.remove("power-hero-icon-on");
        elem.classList.add("power-hero-icon-off");
    } else {
        elem.classList.remove("power-hero-icon-off");
        elem.classList.add("power-hero-icon-on");
    }

    // パワーテーブルを取得
    const tbody_power = document.getElementById("power-table").querySelector("tbody");
    const rows_power = tbody_power.querySelectorAll("tr");

    // 各行に対してヒーロー一致判定し、表示/非表示を切り替える
    rows_power.forEach(tr => {
        const cells = tr.querySelectorAll("td");
        const cellValue = cells[2]?.textContent.trim(); //cells[2] は各パワーの左から3つ目（ヒーロー列位置）を示す

        if (cellValue === targetText) {
            if (isNowOn) {
                tr.classList.remove("table-on");
                tr.classList.add("table-off");
            } else {
                tr.classList.remove("table-off");
                tr.classList.add("table-on");
            }
        }
    });
}

//　検索ボックスで絞り込み（パワー）
function power_searchWords() {

    //アイコンを全てOFFにした状態に
    let activeIcons = document.querySelectorAll("img.power-hero-icon-on");
    activeIcons.forEach(img => filterPowerTable(img));

    //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_power に配列のように格納。各行を1つのアイテムとする。
    var tbody_power = document.getElementById("power-table").querySelector("tbody");
    var rows_power = tbody_power.querySelectorAll("tr");

    // 行ごとの絞り込み
    // アイテム行をループ
    rows_power.forEach(tr => {
        const cells = tr.querySelectorAll("td");

        // 毎回クラスを初期化
        tr.classList.remove("table-on");
        tr.classList.remove("table-off");

        // 非表示にするアイテムを探す

        const powerName = cells[0]?.textContent.trim() || "";
        const textColumn = cells[3]?.textContent.trim() || "";

        // 検索ワードを取得
        const keyword = document.getElementById("power_search-input").value.trim();

        // 非表示フラグ　keywordが空の場合は全て非表示、
        const shouldShow = keyword !== "" && (powerName.includes(keyword) || textColumn.includes(keyword));

        // 非表示対応
        if(shouldShow){
            tr.classList.add("table-on");
        }else{
            tr.classList.add("table-off");
        }
    });

}

//パワーテーブルソートの前提準備
function powerSortClick(id){
    const tHeader=document.getElementById("power-table").querySelectorAll("th");
    const tBody = document.getElementById("power-table").querySelector("tbody");
    const criteria = Array.from(sortingCriteria.entries()).find(([key,row]) => row.column === id);
    const columnIndex = Array.from(tHeader).findIndex(th => th.dataset.column == id);
    const currentDirection = sortDirection[columnIndex] == true ? false:true;
    sortDirection = new Array(4).fill(null);
    sortDirection[columnIndex] = currentDirection

    powerTableSort(tHeader,tBody,criteria[1],columnIndex,currentDirection);

    // 表示テキスト更新
    const labelMap = {
        powerName: "パワー名",
    };

    // テーブル列名初期化
    sortingCriteria.forEach(row => {
        document.getElementById(row.column).innerText = labelMap[row.column];
    });
    
    let arrows = "";
    
    if(sortDirection[columnIndex]){
        arrows = "▲"
    }else if(!sortDirection[columnIndex]){
        arrows = "▼"
    }

    // ソート結果に応じた列名に更新
    document.getElementById(id).innerText = labelMap[id] + arrows;

}

// パワーテーブルをソートする関数
function powerTableSort(headers, tbody, sortingCriteria,index,sorting) {

    //レア度の並び替えの基準を設定
    const rarityOrder = ['コモン', 'レア', 'エピック']

    const rows = Array.from(tbody.querySelectorAll("tr"));

    // 日本語ロケールに基づいた比較器（五十音順）
    const collator = new Intl.Collator('ja', { sensitivity: 'base' });

    // 比較
    const comparator = (rowA, rowB) => {
        const { column, type } = sortingCriteria;

        const cellA = rowA.children[index].textContent.trim();
        const cellB = rowB.children[index].textContent.trim();

        let valA, valB;

        // データの型に応じて比較対象の値を変換（デフォルトはString型）
        if (type == "number") {
            valA = parseFloat(cellA);
            valB = parseFloat(cellB);
        } else {
            valA = cellA;
            valB = cellB;
        }

        // レア度を比較用に数値変換
        if (column == "rarity") {
            valA = rarityOrder.indexOf(valA);
            valB = rarityOrder.indexOf(valB);
        }

        let comparison = 0;

        // 文字列は日本語ロケールで比較
        if (type === "string" && column !== "rarity") {
            comparison = collator.compare(valA, valB);
        } else {
            if (valA < valB) comparison = -1;
            else if (valA > valB) comparison = 1;
        }
        
        // ソート順序を適用し、結果が0でない場合はここで終了
        return sorting ? comparison : -comparison;

        // 全てのキーが同じ場合
        return 0; 
    };
        

    // 配列のソート
    rows.sort(comparator);
    // 既存の行をすべて削除
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    // ソートされた順序で行を追加
    rows.forEach(row => tbody.appendChild(row));
}