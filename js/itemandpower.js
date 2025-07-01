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

    // テーブルのヘッダー情報を取得
    let header = document.getElementById("item-table").querySelectorAll("th");

    // 各アイテムごとにループ
    for(let i=0; i<itemList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化 
        let itemNameText = "";
        let iconText = "-";  // アイコン列は現状アイテム情報にないため、とりあえずハイフンを入れる　TODO：RIN
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
    td.textContent = iconText;
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

const sortingCriteria = [
        /* { column: "itemName", order: "asc", type: "string" }, */
        { column: "rarity", order: "asc", type: "string" },
        { column: "cost", order: "asc", type: "number" }
    ]

    // テーブルをソート
    /* TableSort(header,tbody, sortingCriteria); */



// テーブルをソートする関数
function TableSort(header, tbody, sortingCriteria) {

    //レア度の並び替えの基準を設定
    const rarityOrder = ['コモン', 'レア', 'エピック']

    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.shift();

    // 比較
    const comparator = (rowA, rowB) => {
        for (const criteria of sortingCriteria) {
            const { column, order, type } = criteria;

            // data-column属性に対応する<td>要素のインデックスを検索
            const columnIndex = Array.from(header).findIndex(th => th.dataset.column == column);
            // カラムが見つからない場合は次の基準へ
            if (columnIndex == -1) continue;

            const cellA = rowA.children[columnIndex].textContent.trim();
            const cellB = rowB.children[columnIndex].textContent.trim();

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
            if (valA < valB) {
                comparison = -1;
            } else if (valA > valB) {
                comparison = 1;
            }

            if (comparison !== 0) {
                // ソート順序を適用し、結果が0でない場合はここで終了
                return order == "desc" ? -comparison : comparison;
            }
        }
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
        let iconText = "-";  // アイコン列は現状アイテム情報にないため、とりあえずハイフンを入れる
        let heroText = "";
        let textText = "";

        // 各キーペアごとにループ
        Object.keys(powerList[i]).forEach(key => {

            // キー名がパワー名キーの場合
            if(powerNameKey == key) {

                // パワー名用変数に値を代入
                powerNameText = powerList[i][key];
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
    td.classList.add("item-td");    //TODO:"item-td"を"power-td"に直す？（このままでも機能してる）
    tr.appendChild(td);

    // アイコン列
    var td = document.createElement("td");
    td.textContent = iconText;
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