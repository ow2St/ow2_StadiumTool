// ------------------------------
// 処理部
// ------------------------------

// アイテムリストのキー
var itemIdKey = "アイテムID"; 
var item_nameKey = "アイテム名";
var categoryKey = "カテゴリー";
var rarityKey = "レア度";
var costKey = "コスト";
var item_iconKey = "アイコン";
var uniqueHeroKey = "固有ヒーロー";
var item_textKey = "テキスト";
var item_lifeKey = "ライフ";
var item_armorKey = "アーマー";
var item_shieldKey = "シールド";
var weaponPowerKey = "武器パワー";
var abilityPowerKey = "アビリティパワー";
var attackSpeedKey = "攻撃速度";
var ctReducationKey = "CT短縮";
var ammoKey = "弾薬";
var weapon_LifeStealKey = "ライフ吸収（武器）";
var ability_LifeStealKey = "ライフ吸収（アビリティ）";
var speedKey = "移動速度";
var reloadSpeedKey = "リロード速度";
var item_meleeDamageKey = "近接ダメージ";
var criticalKey = "クリティカル";
var othersKey = "その他";
var durationFlgKey = "持続時間フラグ";
var durationKey = "持続時間";
var theoreticalFlgKey = "理論値フラグ";

// キー対応マッピング（英語 → 日本語）
const itemKeyMap = {
    id: itemIdKey,
    itemname: item_nameKey,
    category: categoryKey,
    rarity: rarityKey,
    cost: costKey,
    icon: item_iconKey,
    uniquehero: uniqueHeroKey,
    text: item_textKey,
    life: item_lifeKey,
    armor: item_armorKey,
    shield: item_shieldKey,
    weaponpower: weaponPowerKey,
    abilitypower: abilityPowerKey,
    attackspeed: attackSpeedKey,
    ctreducation: ctReducationKey,
    ammo: ammoKey,
    weaponlifesteal: weapon_LifeStealKey,
    abilitylifesteal: ability_LifeStealKey,
    speed: speedKey,
    reloadspeed: reloadSpeedKey,
    meleedamage: item_meleeDamageKey,
    critical: criticalKey,
    others: othersKey,
    durationflg: durationFlgKey,
    duration: durationKey,
    theoreticalflag: theoreticalFlgKey
};

// パワーリストのキー
var power_nameKey = "パワー名";
var heroKey = "ヒーロー";
var power_iconKey = "アイコン";
var power_textKey = "テキスト";

// キー対応マッピング（英語 → 日本語）
const powerKeyMap = {
    powername: power_nameKey,
    hero: heroKey,
    icon: power_iconKey,
    text: power_textKey,
};


const accordionContainer = document.getElementById("accordion-container");

let itemAllData = []; // 全てのアイテムデータを保持

// データの読み込み(itemList)
fetch("itemListData.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        itemAllData = data;

        // 整形 → キー変換
        const itemList = convertItemKeys(organizeItemData(itemAllData));

        linkItemList(itemList);
    })
    .catch(error => {
        console.error("データの読み込み中にエラーが発生しました:", error);
        accordionContainer.textContent = "データの読み込みに失敗しました。";
    });

let powerAllData = []; // 全てのアイテムデータを保持

// データの読み込み(powerList)
fetch("powerListData.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        powerAllData = data;

        // 整形 → キー変換
        const powerList = convertPowerKeys(organizePowerData(powerAllData));

        linkPowerList(powerList);
    })
    .catch(error => {
        console.error("データの読み込み中にエラーが発生しました:", error);
        accordionContainer.textContent = "データの読み込みに失敗しました。";
    });

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

//itemList に　itemListData.json　から貰うデータの形を決める
function organizeItemData(itemAllData) {
    const selectedData = itemAllData
    .map(Ilist => {
        return {
            id: Ilist.id,
            itemname: Ilist.itemname,
            category: Ilist.category,
            rarity: Ilist.rarity,
            cost: Ilist.cost,
            icon: Ilist.icon,
            uniquehero: Ilist.uniquehero,
            text: Ilist.text,
            life: Ilist.life,
            armor: Ilist.armor,
            shield: Ilist.shield,
            weaponpower: Ilist.weaponpower,
            abilitypower: Ilist.abilitypower,
            attackspeed: Ilist.attackspeed,
            ctreducation: Ilist.ctreducation,
            ammo: Ilist.ammo,
            weaponlifesteal: Ilist.weaponlifesteal,
            abilitylifesteal: Ilist.abilitylifesteal,
            speed: Ilist.speed,
            reloadspeed: Ilist.reloadspeed,
            meleedamage: Ilist.meleedamage,
            critical: Ilist.critical,
            others: (Ilist.others === "-") ? Ilist.others : "※" + Ilist.others,
            durationflg: Ilist.durationflg,
            duration: Ilist.duration,
            theoreticalflag: Ilist.theoreticalflag

        };
    })
    return selectedData;
}

// 英名キーを日本名キーへ変換処理
function convertItemKeys(dataArray) {
    return dataArray.map(obj => {
        let newObj = {};
        for (let key in obj) {
            let newKey = itemKeyMap[key] || key; // 対応がないキーはそのまま
            newObj[newKey] = obj[key];
        }
        return newObj;
    });
}

//powerList に　powerListData.json　から貰うデータの形を決める
function organizePowerData(powerAllData) {
    const selectedData = powerAllData
    .map(Plist => {
        return {
            powername: Plist.powername,
            hero: Plist.hero,
            icon: Plist.icon,
            text: Plist.text,
        };
    })
    return selectedData;
}

// 英名キーを日本名キーへ変換処理
function convertPowerKeys(dataArray) {
    return dataArray.map(obj => {
        let newObj = {};
        for (let key in obj) {
            let newKey = powerKeyMap[key] || key; // 対応がないキーはそのまま
            newObj[newKey] = obj[key];
        }
        return newObj;
    });
}


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

    //パワー一覧　D.VAアイコンをONにする
    let defaultHero = document.getElementById("D.VA");
    filterPowerTable(defaultHero);
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
            if(item_nameKey == key) {

                // アイテム名用変数に値を代入
                itemNameText = itemList[i][key];
            }

            // キー名がアイコンキーの場合
            if(item_iconKey == key) {

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
            if([item_lifeKey, item_armorKey, item_shieldKey, weaponPowerKey, abilityPowerKey, 
                attackSpeedKey, ctReducationKey, ammoKey, weapon_LifeStealKey, 
                ability_LifeStealKey, speedKey, reloadSpeedKey, item_meleeDamageKey, 
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
            if(item_textKey == key) {

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
    var div = document.createElement("div");
    // 中のアイコン
    var iconImg = document.createElement("img");
    iconImg.src = "assets/images/icons/item/" + iconText;
    iconImg.classList.add("itemandpower-itemicon");
    // 中のアイテム名とヒーロー名
    var text = document.createElement("span");
    var textTmp = itemNameText + "\n\n" + "ヒーロー：" + uniqueHeroText;
    text.innerHTML = textTmp.replace(/\n/g, "<br>");;
    div.appendChild(iconImg);
    div.appendChild(text);
    div.classList.add("name-table");
    td.appendChild(div);
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

    // 固有ヒーロー列（非表示）
    var td = document.createElement("td");
    td.textContent = uniqueHeroText;
    td.classList.add("hidden-column");
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
        if(shouldShow == true){
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
            if(power_nameKey == key) {

                // パワー名用変数に値を代入
                powerNameText = powerList[i][key];
            }

            // キー名がアイコンキーの場合
            if(power_iconKey == key) {

                // アイコン用変数に値を代入
                iconText = powerList[i][key];
            }

            // キー名がヒーローキーの場合
            if(heroKey == key) {

                // ヒーロー用変数に値を代入
                heroText = powerList[i][key];
            }
            // キー名がテキストキーの場合
            if(power_textKey == key) {

                // テキスト用変数に値を代入
                textText = powerList[i][key];
            }
        })
    
    tbody.appendChild(appendChildPowerList(tr, powerNameText, iconText, heroText, textText));
    tr.classList.add("table-off"); //アイテムテーブルと違い、パワーテーブルは初期表示が非表示の為（D.VA以外）
    }
}

//　検索ボックスで絞り込み（パワー）
function power_searchWords() {

    //ボタンを全てOFFにした状態に
    let activeImages = document.querySelectorAll("img.power-hero-icon-on");
    activeImages.forEach(img => filterPowerTable(img));

    //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_power に配列のように格納。各行を1つのパワーとする。
    var tbody_power = document.getElementById("power-table").querySelector("tbody");
    var rows_power = tbody_power.querySelectorAll("tr");

    // 行ごとの絞り込み
    // パワー行をループ
    rows_power.forEach(tr => {
        const cells = tr.querySelectorAll("td");

        // 毎回クラスを初期化
        tr.classList.remove("table-on");
        tr.classList.remove("table-off");

        // 非表示にするパワーを探す

        const powerName = cells[0]?.textContent.trim() || "";
        const textColumn = cells[3]?.textContent.trim() || "";

        // 検索ワードを取得
        const keyword = document.getElementById("power_search-input").value.trim();

        // 非表示フラグ　keywordが空の場合は全て非表示、
        const shouldShow = keyword !== "" && (powerName.includes(keyword) || textColumn.includes(keyword));

        // 非表示対応
        if(shouldShow == true){
            tr.classList.add("table-on");
        }else{
            tr.classList.add("table-off");
        }
    });

}


// パワーリスト用子要素作成関数
function appendChildPowerList(tr, powerNameText, iconText, heroText, textText){


    // パワー名列
    var td = document.createElement("td");
    var div = document.createElement("div");
    // 中のアイコン
    var iconImg = document.createElement("img");
    iconImg.src = "assets/images/icons/power/" + iconText;
    iconImg.classList.add("itemandpower-powericon");
    // 中のパワー名とヒーロー名
    var text = document.createElement("span");
    var textTmp = powerNameText + "\n\n" + "ヒーロー：" + heroText;
    text.innerHTML = textTmp.replace(/\n/g, "<br>");;
    div.appendChild(iconImg);
    div.appendChild(text);
    div.classList.add("name-table");
    td.appendChild(div);
    td.classList.add("item-td");
    tr.appendChild(td);

    // ヒーロー列(非表示)
    var td = document.createElement("td");
    td.textContent = heroText;
    td.classList.add("hidden-column");
    tr.appendChild(td);

    // テキスト列
    var td = document.createElement("td");
    td.textContent = textText;
    td.classList.add("item-td");
    tr.appendChild(td);

    return tr;
}

// 絞り込み条件を更新する関数（パワー）
function filterPowerTable(elem){

    // 絞り込みイメージのON/OFF切り替え
    const tag = elem.tagName.toLowerCase();
    let isNowOn;
    if (tag === "img") {
        isNowOn = elem.classList.contains("power-hero-icon-on");
        elem.classList.toggle("power-hero-icon-on", !isNowOn);
        elem.classList.toggle("power-hero-icon-off", isNowOn);
    } else if (tag === "input" && elem.type === "checkbox") {
        isNowOn = elem.checked;
        elem.classList.toggle("checkbox-on", isNowOn);
        elem.classList.toggle("checkbox-off", !isNowOn);
    }

    // 各絞り込み一覧を取得
    const heroes_tank = document.querySelectorAll("#button-tank img");
    const heroes_damage = document.querySelectorAll("#button-damage img");
    const heroes_support = document.querySelectorAll("#button-support img");

    // テーブルのヘッダー行（<tr>）を取得
    const headerRow = document.querySelector("#power-table thead tr");

    // 各 <th> 要素を配列として取得
    const headers = Array.from(headerRow.querySelectorAll("th"));

    // 各絞り込み要素が何番目かを取得
    const heroNumber = headers.findIndex(th => th.textContent == "ヒーロー");

    //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_power に配列のように格納。各行を1つのパワーとする。
    var tbody_power = document.getElementById("power-table").querySelector("tbody");
    var rows_power = tbody_power.querySelectorAll("tr");

    // 行ごとの絞り込み
    // パワー行をループ
    rows_power.forEach(tr => {
        const cells = tr.querySelectorAll("td");


        // 毎回クラスを初期化
        tr.classList.remove("table-on");
        tr.classList.remove("table-off");

        let shouldShow = true;  // 表示判定フラグ

        // 非表示にするパワーを探す

        // ヒーロー関連

        //タンク
        heroes_tank.forEach(img =>{
            
            // ボタンがOFFの場合
            if(img.className == "power-hero-icon-off" && shouldShow){
                shouldShow = !(cells[heroNumber]?.innerText == img.id);
            }
        });

        //ダメージ
        heroes_damage.forEach(img =>{

            // ボタンがOFFの場合
            if(img.className == "power-hero-icon-off" && shouldShow){
                shouldShow = !(cells[heroNumber]?.innerText == img.id);
            }
        });

        //サポート
        heroes_support.forEach(img => {
            // ボタンがOFFの場合
            if(img.className == "power-hero-icon-off" && shouldShow){
                shouldShow = !(cells[heroNumber]?.innerText == img.id);
            }
        });

        // 非表示対応
        if(shouldShow == true){
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