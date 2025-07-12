// ------------------------------
// 処理部
// ------------------------------

// アイテム・パワーリストをテーブルに紐付け
linkItemList(itemList);
linkPowerList(powerList);

//パワー一覧　DVAアイコンをONにする
let startCheckIcon = "DVA";
selectHero(startCheckIcon);

//アイテムボタン用フラグ初期化
let isCheckWeapon = true;
let isCheckAbility = true;
let isCheckSurvival = true;
let isCheckCommon = true;
let isCheckRare = true;
let isCheckEpic = true;
let isCheckLife = true;
let isCheckArmor = true;
let isCheckShield = true;
let isCheckWeaponPower = true;
let isCheckAbilityPower = true;
let isCheckAttackSpeed = true;
let isCheckCtReducation = true;
let isCheckAmmo = true;
let isCheckWeapon_LifeSteal = true;
let isCheckSpeed = true;
let isCheckAbility_LifeSteal = true;
let isCheckReloadSpeed = true;
let isCheckMeleeDamage = true;
let isCheckCritical = true;
let isCheckOthers = true;

//タブ切り替え初期化
const tabItem = document.getElementById('tabItem');
const itemContent = document.getElementById('item-content');
const tabPower = document.getElementById('tabPower');
const powerContent = document.getElementById('power-content');

const sortingCriteria = [
        { column: "itemName", type: "string" },
        { column: "rarity", type: "string" },
        { column: "cost", type: "number" }
    ]

let sortDirection = new Array(8).fill(null);

// ------------------------------
// 関数部
// ------------------------------

//ボタン選択カラー変更
//武器
function IAPbuttonWeapon(){
    var Button = document.getElementById("itemButtonWeapon");
    if(isCheckWeapon){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckWeapon = !isCheckWeapon;
}
//アビリティ
function IAPbuttonAbility(){
    var Button = document.getElementById("itemButtonAbility");
    if(isCheckAbility){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckAbility = !isCheckAbility;
}
function IAPbuttonSurvival(){
    var Button = document.getElementById("itemButtonSurvival");
    if(isCheckSurvival){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckSurvival = !isCheckSurvival;
}
function IAPbuttonCommon(){
    var Button = document.getElementById("itemButtonCommon");
    if(isCheckCommon){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckCommon = !isCheckCommon;
}
function IAPbuttonRare(){
    var Button = document.getElementById("itemButtonRare");
    if(isCheckRare){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckRare = !isCheckRare;
}
function IAPbuttonEpic(){
    var Button = document.getElementById("itemButtonEpic");
    if(isCheckEpic){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckEpic = !isCheckEpic;
}
function IAPbuttonLife(){
    var Button = document.getElementById("itemButtonLife");
    if(isCheckLife){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckLife = !isCheckLife;
}
function IAPbuttonArmor(){
    var Button = document.getElementById("itemButtonArmor");
    if(isCheckArmor){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckArmor = !isCheckArmor;
}
function IAPbuttonShield(){
    var Button = document.getElementById("itemButtonShield");
    if(isCheckShield){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckShield = !isCheckShield;
}
function IAPbuttonWeaponPower(){
    var Button = document.getElementById("itemButtonWeaponPower");
    if(isCheckWeaponPower){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckWeaponPower = !isCheckWeaponPower;
}
function IAPbuttonAbilityPower(){
    var Button = document.getElementById("itemButtonAbilityPower");
    if(isCheckAbilityPower){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckAbilityPower = !isCheckAbilityPower;
}
function IAPbuttonAttackSpeed(){
    var Button = document.getElementById("itemButtonAttackSpeed");
    if(isCheckAttackSpeed){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckAttackSpeed = !isCheckAttackSpeed;
}
function IAPbuttonCtReducation(){
    var Button = document.getElementById("itemButtonCtReducation");
    if(isCheckCtReducation){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckCtReducation = !isCheckCtReducation;
}
function IAPbuttonAmmo(){
    var Button = document.getElementById("itemButtonAmmo");
    if(isCheckAmmo){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckAmmo = !isCheckAmmo;
}
function IAPbuttonWeapon_LifeSteal(){
    var Button = document.getElementById("itemButtonWeapon_LifeSteal");
    if(isCheckWeapon_LifeSteal){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckWeapon_LifeSteal = !isCheckWeapon_LifeSteal;
}
function IAPbuttonAbility_LifeSteal(){
    var Button = document.getElementById("itemButtonAbility_LifeSteal");
    if(isCheckAbility_LifeSteal){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckAbility_LifeSteal = !isCheckAbility_LifeSteal;
}
function IAPbuttonSpeed(){
    var Button = document.getElementById("itemButtonSpeed");
    if(isCheckSpeed){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckSpeed = !isCheckSpeed;
}
function IAPbuttonReloadSpeed(){
    var Button = document.getElementById("itemButtonReloadSpeed");
    if(isCheckReloadSpeed){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckReloadSpeed = !isCheckReloadSpeed;
}
function IAPbuttonMeleeDamage(){
    var Button = document.getElementById("itemButtonMeleeDamage");
    if(isCheckMeleeDamage){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckMeleeDamage = !isCheckMeleeDamage;
}
function IAPbuttonCritical(){
    var Button = document.getElementById("itemButtonCritical");
    if(isCheckCritical){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckCritical = !isCheckCritical;
}
function IAPbuttonOthers(){
    var Button = document.getElementById("itemButtonOthers");
    if(isCheckOthers){
        Button.style.backgroundColor = "white";
    }else{
        Button.style.backgroundColor = "lightgray";
    }
    isCheckOthers = !isCheckOthers;
}


//ヒーローアイコン選択変更
function selectHero(heroIconId){
    let heroIcon = document.getElementById(heroIconId);
    if(heroIcon.className == "power-hero-icon-off"){
        heroIcon.className = "power-hero-icon-on";
    }else{
        heroIcon.className = "power-hero-icon-off";
    }
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
    
    tr.classList.add("table-on");//TODO:アイテムテーブル絞り込みにて仮使用中
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



function sortClick(id){
    const tHeader=document.getElementById("item-table").querySelectorAll("th");
    const tBody = document.getElementById("item-table").querySelector("tbody");
    const criteria = Array.from(sortingCriteria.entries()).find(([key,row]) => row.column === id);
    const columnIndex = Array.from(tHeader).findIndex(th => th.dataset.column == id);
    const currentDirection = sortDirection[columnIndex] == true ? false:true;
    sortDirection = new Array(8).fill(null);
    sortDirection[columnIndex] = currentDirection

    TableSort(tHeader,tBody,criteria[1],columnIndex,currentDirection);

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

// テーブルをソートする関数
function TableSort(headers, tbody, sortingCriteria,index,sorting) {

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

// 選択⇔未選択に応じてアイテムテーブルを絞り込む関数
function filterItemTable(elem){
    const id = elem.id;
    const tag = elem.tagName.toLowerCase();

    //onclick元から読み込んだidを種類分けする
    switch (id) {
        case "weapon":
        case "ability":
        case "survival":
            judgementFactor = "カテゴリー";
            break;
        case "common":
        case "rare":
        case "epic":
            judgementFactor = "レアリティ";
            break;
        case "life":
        case "armor":
        case "shield":
        case "weaponPower":
        case "abilityPower":
        case "atackSpeed":
        case "ctReducation":
        case "ammo":
        case "weapon_LifeSteal":
        case "ability_LifeSteal":
        case "speed":
        case "reloadSpeed":
        case "meleeDamage":
        case "critical":
        case "others":
            judgementFactor = "ステータス";
            break;
        default:
            judgementFactor = "固有ヒーロー";
    }

    // テーブルのヘッダー行（<tr>）を取得
    const headerRow = document.querySelector("#item-table thead tr");

    // 各 <th> 要素を配列として取得
    const headers = Array.from(headerRow.querySelectorAll("th"));

    //  judgementFactor が何番目かを探す
    const judgeNumber = headers.findIndex(th => th.textContent.trim() === judgementFactor);

    //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_item に配列のように格納。各行を1つのアイテムとする。
    var tbody_item = document.getElementById("item-table").querySelector("tbody");
    var rows_item = tbody_item.querySelectorAll("tr");

    // class切り替え & ON状態判定
    let isNowOn;
    let targetText;

    if (tag === "button") {
        isNowOn = elem.classList.contains("button-on");
        elem.classList.toggle("button-on", !isNowOn);
        elem.classList.toggle("button-off", isNowOn);
        targetText = elem.innerText.trim();
    } else if (tag === "input" && elem.type === "checkbox") {
        isNowOn = elem.checked;
        elem.classList.toggle("checkbox-on", isNowOn);
        elem.classList.toggle("checkbox-off", !isNowOn);
        targetText = elem.value.trim();
    }

    // 行ごとの絞り込み
    rows_item.forEach(tr => {
        const cells = tr.querySelectorAll("td");
        const cellValue = cells[judgeNumber]?.textContent.trim();

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

// 選択⇔未選択に応じてパワーテーブルを絞り込む関数
function filterPowerTable(id){
    var tbody_power = document.getElementById("power-table").querySelector("tbody");
    var rows_power = Array.from(tbody_power.querySelectorAll("tr"));
    rows_power.shift();

    rows_power.forEach(row =>{
        const cells = row.querySelectorAll("td");
        const checkbox =  cells[0].querySelector(".power-checkbox");

        //固有ヒーローアイテムかどうかの読み取り
        const target = row.querySelector("td#filter-target").textContent

        // チェックボックスを未選択状態にする
        if(checkbox.checked){
            checkbox.checked = false;
        }

        // 選択ヒーローに応じてパワーテーブル絞り込み実施
        if(target == "-" || target == id){
            row.classList.remove("hidden-column");
        }else if(target != "-" && target != id){
            row.classList.add("hidden-column");
        }
    });
}