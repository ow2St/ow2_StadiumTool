// ------------------------------
// 処理部
// ------------------------------

// 選択中ヒーロー変数
var selectedHero = "DVA（メック）"  // 初期値はDVA
var life = 0;
var armor = 0;
var shield = 0;
var mainWeapon = 0;
var subWeapon = 0;
var ability1 = 0;
var ability2 = 0;
var ability3 = 0;
var ult = 0;
var addPower = "";

// 表示用のステータスリストを初期化
var showStatusList = {};

// アイテムリストをテーブルに紐付け
linkItemList(itemList, selectedHero);

// パワーリストをテーブルに紐付け
linkPowerList(powerList, selectedHero);

// ステータスボックス設定
initStatus(selectedHero);

// チェックされた行のデータを格納する配列
var selectedItemRowsData = [];
var selectedPowerRowsData = [];

// 各イベント発生対象取得
const itemCheckboxes = document.querySelectorAll(".item-checkbox");
const powerCheckboxes = document.querySelectorAll(".power-checkbox");

// 初期表示のために一度実行
updateSelectedItemsList();
updateSelectedPowerList();

// 各アイテムのチェックボックスにイベントリスナーを追加
itemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selectedItemRowsDataBeforeLength = selectedItemRowsData.length;

        // チェックボックスの状態が変わる毎に選択リストを更新
        selectedItemRowsData = updateSelectedItemsList();

        // ビルド欄の表示を更新
        updateBuild_Item(selectedItemRowsData);
        // ステータスに反映
        updateStatus_Item(selectedItemRowsData);

        const selectedItemRowsDataAfterLength = selectedItemRowsData.length;

        if(selectedItemRowsDataBeforeLength == 6 && selectedItemRowsDataAfterLength < 6){
            // 選択できないようにしたチェックボックスを入力可に戻す
            disableItemTableCheckbox(false);
        }else if(selectedItemRowsDataAfterLength == 6){
            //　選択済みのアイテムが6個になった場合、未選択チェックボックスを入力不可にする
            disableItemTableCheckbox(true);
        }
    });
});

// 各パワーのチェックボックスにイベントリスナーを追加
powerCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selectedPowerRowsDataBeforeLength = selectedPowerRowsData.length;

        // チェックボックスの状態が変わる毎に選択リストを更新
        selectedPowerRowsData = updateSelectedPowerList();
        // ビルド欄の表示を更新 
        updateBuild_Power(selectedPowerRowsData);
        // ステータスに反映
        updateStatus_Power(selectedPowerRowsData);

        const selectedPowerRowsDataAfterLength = selectedPowerRowsData.length;

        if(selectedPowerRowsDataBeforeLength == 4 && selectedPowerRowsDataAfterLength < 4){
            // 選択できないようにしたチェックボックスを入力可に戻す
            disablePowerTableCheckbox(false);
        }else if(selectedPowerRowsDataAfterLength == 4){
            //　選択済みのパワーが4個になった場合、未選択チェックボックスを入力不可にする
            disablePowerTableCheckbox(true);
        }
    });
});

const selectedBuildItem = document.querySelector(".selectedbuild-item");
const selectedBuildpower = document.querySelector(".selectedbuild-power");

// ビルド欄の各アイテムにイベントリスナーを追加
selectedBuildItem.addEventListener("click", (event) =>{
    // 削除ボタンをクリックされた場合
    if(event.target.classList.contains("selectedbuild-delete-button") && event.target.tagName =="SPAN"){
        // アイコンを削除する
        selectedItemRowsData = clickDeleteButton(event.target.id,selectedItemRowsData);
        // ステータスに反映
        updateStatus_Item(selectedItemRowsData);
    }
});

// ビルド欄の各パワーにイベントリスナーを追加
selectedBuildpower.addEventListener("click", (event) =>{
    // 削除ボタンをクリックされた場合
    if(event.target.classList.contains("selectedbuild-delete-button") && event.target.tagName =="SPAN"){
        // アイコンを削除する
        selectedPowerRowsData = clickDeleteButton(event.target.id,selectedPowerRowsData);
        // ステータスに反映
        updateStatus_Power(selectedPowerRowsData);
    }
});

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
function selectHero(id){
    
    // 選択中ヒーローを設定
    selectedHero = id;

    let imgPath = "";
    // 選択中ヒーローアイコンを変更
    // DVAチェック
    if(id == "DVA（メック）" || id == "DVA（人）"){
        imgPath = "DVA.png"
    }else{
        imgPath = id + ".png";
    }
    document.getElementById("selected-hero-icon").src = "assets/images/icons/hero/" + imgPath;

    // ステータスボックス初期化
    initStatus(id);

    // アイテムリスト、パワーリストの初期化や絞り込み
    disableItemTableCheckbox(false);
    disablePowerTableCheckbox(false);
    filterTable(id);

    // 選択済みアイテム、選択済みパワーについて初期化
    selectedItemRowsData = updateSelectedItemsList();
    selectedPowerRowsData = updateSelectedPowerList();

    
    updateBuild_Item(selectedItemRowsData);
    updateBuild_Power(selectedPowerRowsData);

    // ヒーローウィンドウを消す
    document.getElementById("herowindow").style.display = "none";
}

// ステータスボックス初期化
function initStatus(selectedHero){

    // 各ヒーローごとにループ
    for(let i=0; i<initStatusList.length; i++) {

        // 選択中のヒーローの場合
        if (initStatusList[i][heroNameKey] == selectedHero){

            // DVAの場合
            if(selectedHero == "DVA（メック）" || selectedHero == "DVA（人）"){
                
                // メック人切り替えボタンを表示
                document.getElementById("dva-button").style.display = "flex";
            }else{

                // メック人切り替えボタンを非表示
                document.getElementById("dva-button").style.display = "none";
            }

            // 選択中のヒーローのステータスを設定
            initStatusValue(initStatusList[i],"init","-");
            
            // 表示用のステータスリストを初期化
            showStatusList = JSON.parse(JSON.stringify(initStatusList[i]));
        }
    }
}

// ステータス値初期化
function initStatusValue(statuslist, addItemText, addItemOthers){
    // 選択中のヒーローのステータスを設定
    document.getElementById("heroname").innerText = statuslist[heroNameKey];
    document.getElementById("life").innerText = lifeKey + " :" + statuslist[lifeKey];
    document.getElementById("armor").innerText = armorKey + " :" + statuslist[armorKey] ;
    document.getElementById("shield").innerText = shieldKey + " :" + statuslist[shieldKey];
    document.getElementById("mainweapon").innerText = mainWeaponKey + "(" + statuslist[mainWeaponNameKey] + ")" + " :" + statuslist[mainWeaponKey];
    document.getElementById("subweapon").innerText = subWeaponKey + "(" + statuslist[subWeaponNameKey] + ")" + " :" + statuslist[subWeaponKey];
    document.getElementById("ability1").innerText = ability1Key + "(" + statuslist[ability1NameKey] + ")" + " :" + statuslist[ability1Key];
    document.getElementById("ability2").innerText = ability2Key + "(" + statuslist[ability2NameKey] + ")" + " :" + statuslist[ability2Key];
    document.getElementById("ability3").innerText = ability3Key + "(" + statuslist[ability3NameKey] + ")" + " :" + statuslist[ability3Key];
    document.getElementById("ult").innerText = ultKey + "(" + statuslist[ultNameKey] + ")" + " :" + statuslist[ultKey];
    document.getElementById("addpower").innerText = "追加効果(パワー):";
    // 羅列するため初期設定時のみ走るようinit判定をする
    if(addItemText == "init"){
        document.getElementById("additem").innerText = "追加効果(アイテム):";
    }

    // リロード速度がある場合は追加
    if(statuslist[mainReloadKey] != 0){
        document.getElementById("mainweapon").innerText = document.getElementById("mainweapon").innerText + " (リロード" + statuslist[mainReloadKey] + "秒)";
    }
    if(statuslist[subReloadKey] != 0){
        document.getElementById("subweapon").innerText = document.getElementById("subweapon").innerText + " (リロード" + statuslist[subReloadKey] + "秒)";
    }

    // 弾薬数がある場合は追加
    if(statuslist[mainAmmoKey] != 0){
        document.getElementById("mainweapon").innerText = document.getElementById("mainweapon").innerText + " (" + statuslist[mainAmmoKey] + "弾)";
    }
    if(statuslist[subAmmoKey] != 0){
        document.getElementById("subweapon").innerText = document.getElementById("subweapon").innerText + " (" + statuslist[subReloadKey] + "弾)";
    }

    // HS倍率がある場合は追加
    if(statuslist[mainHSRateKey] != 1){
        document.getElementById("mainweapon").innerText = document.getElementById("mainweapon").innerText + " (HS" + Math.round(statuslist[mainWeaponKey] * statuslist[mainHSRateKey]) + ")";
    }
    if(statuslist[subHSRateKey] != 1){
        document.getElementById("subweapon").innerText = document.getElementById("subweapon").innerText + " (HS" + Math.round(statuslist[subWeaponKey] * statuslist[subHSRateKey]) + ")";
    }

    // ライフ吸収がある場合は追加
    if(statuslist[mainLifeStealRateKey] != 0){
        document.getElementById("mainweapon").innerText = document.getElementById("mainweapon").innerText + " (" + Math.round(statuslist[mainWeaponKey] * statuslist[mainLifeStealRateKey]) + "吸収)";
    }
    if(statuslist[subLifeStealRateKey] != 0){
        document.getElementById("subweapon").innerText = document.getElementById("subweapon").innerText + " (" + Math.round(statuslist[subWeaponKey] * statuslist[subLifeStealRateKey]) + "吸収)";
    }

    // 継続時間がある場合は追加
    if(statuslist[ability1DurationKey] != 0){
        document.getElementById("ability1").innerText = document.getElementById("ability1").innerText + " (" + statuslist[ability1DurationKey] + "秒継続)";
    }
    if(statuslist[ability2DurationKey] != 0){
        document.getElementById("ability2").innerText = document.getElementById("ability2").innerText + " (" + statuslist[ability2DurationKey] + "秒継続)";
    }
    if(statuslist[ability3DurationKey] != 0){
        document.getElementById("ability3").innerText = document.getElementById("ability3").innerText + " (" + statuslist[ability3DurationKey] + "秒継続)";
    }
    if(statuslist[ultDurationKey] != 0){
        document.getElementById("ult").innerText = document.getElementById("ult").innerText + " (" + statuslist[ultDurationKey] + "秒継続)";
    }

    // CT時間がある場合は追加
    if(statuslist[ability1CTKey] != 0){
        document.getElementById("ability1").innerText = document.getElementById("ability1").innerText + " (CT" + statuslist[ability1CTKey] + "秒)";
    }
    if(statuslist[ability2CTKey] != 0){
        document.getElementById("ability2").innerText = document.getElementById("ability2").innerText + " (CT" + statuslist[ability2CTKey] + "秒)";
    }
    if(statuslist[ability3CTKey] != 0){
        document.getElementById("ability3").innerText = document.getElementById("ability3").innerText + " (CT" + statuslist[ability3CTKey] + "秒)";
    }

    // ライフ吸収がある場合は追加
    if(statuslist[ability1LifeStealRateKey] != 0){
        document.getElementById("ability1").innerText = document.getElementById("ability1").innerText + " (" + Math.round(statuslist[ability1Key] * statuslist[ability1LifeStealRateKey]) + "吸収)";
    }
    if(statuslist[ability2LifeStealRateKey] != 0){
        document.getElementById("ability2").innerText = document.getElementById("ability2").innerText + " (" + Math.round(statuslist[ability2Key] * statuslist[ability2LifeStealRateKey]) + "吸収)";
    }
    if(statuslist[ability3LifeStealRateKey] != 0){
        document.getElementById("ability3").innerText = document.getElementById("ability3").innerText + " (" + Math.round(statuslist[ability3Key] * statuslist[ability3LifeStealRateKey]) + "吸収)";
    }
    if(statuslist[ultLifeStealRateKey] != 0){
        document.getElementById("ult").innerText = document.getElementById("ult").innerText + " (" + Math.round(statuslist[ultKey] * statuslist[ultLifeStealRateKey]) + "吸収)";
    }

    // テキストに記載がある場合
    if(addItemText != "-" && addItemText != "init"){

    // 追加効果欄に羅列
        document.getElementById("additem").innerText = document.getElementById("additem").innerText + addItemText + "\n";
    }

    // その他に記載がある場合
    if(addItemOthers != "-"){

        // 追加効果欄に羅列
        document.getElementById("additem").innerText = document.getElementById("additem").innerText + addItemOthers + "\n";
    }
}

// メック人切り替え
function dvaButtonClick(){

    // 選択ヒーロー切り替え
    if(selectedHero == "DVA（メック）"){
        selectedHero = "DVA（人）";
    }else if(selectedHero == "DVA（人）"){
        selectedHero = "DVA（メック）";
    }

    // ステータスボックス初期化
    initStatus(selectedHero);
}

// アイテムリストを開く
function openItemList(){
    document.getElementById("itemlist-title-open").style.display = "block";
    document.getElementById("itemlist-title-close").style.display = "none";
    document.getElementById("itemlist").style.display = "block";
}

// アイテムリストを閉じる
function closeItemList(){
    document.getElementById("itemlist-title-open").style.display = "none";
    document.getElementById("itemlist-title-close").style.display = "block";
    document.getElementById("itemlist").style.display = "none";
}

// 武器リストを開く
function openWeapon(){
    document.getElementById("weapon-title-open").style.display = "block";
    document.getElementById("weapon-title-close").style.display = "none";
    document.getElementById("weapon").style.display = "block";
}

// 武器リストを閉じる
function closeWeapon(){
    document.getElementById("weapon-title-open").style.display = "none";
    document.getElementById("weapon-title-close").style.display = "block";
    document.getElementById("weapon").style.display = "none";
}

// アビリティリストを開く
function openAbility(){
    document.getElementById("ability-title-open").style.display = "block";
    document.getElementById("ability-title-close").style.display = "none";
    document.getElementById("ability").style.display = "block";
}

// アビリティリストを閉じる
function closeAbility(){
    document.getElementById("ability-title-open").style.display = "none";
    document.getElementById("ability-title-close").style.display = "block";
    document.getElementById("ability").style.display = "none";
}

// サバイバルリストを開く
function openSurvival(){
    document.getElementById("survival-title-open").style.display = "block";
    document.getElementById("survival-title-close").style.display = "none";
    document.getElementById("survival").style.display = "block";
}

// サバイバルリストを閉じる
function closeSurvival(){
    document.getElementById("survival-title-open").style.display = "none";
    document.getElementById("survival-title-close").style.display = "block";
    document.getElementById("survival").style.display = "none";
}

// パワーリストを開く
function openPowerList(){
    document.getElementById("powerlist-title-open").style.display = "block";
    document.getElementById("powerlist-title-close").style.display = "none";
    document.getElementById("powerlist").style.display = "block";
}

// パワーリストを閉じる
function closePowerList(){
    document.getElementById("powerlist-title-open").style.display = "none";
    document.getElementById("powerlist-title-close").style.display = "block";
    document.getElementById("powerlist").style.display = "none";
}

// アイテムリストをテーブルに紐づける関数
function linkItemList(itemList, id) {
    let tbody_weapon = document.getElementById("item-table-weapon").querySelector("tbody");
    let tbody_ability = document.getElementById("item-table-ability").querySelector("tbody");
    let tbody_survival = document.getElementById("item-table-survival").querySelector("tbody");

    //各テーブルのヘッダー情報を取得
    let headers_weapon = document.getElementById("item-table-weapon").querySelectorAll("th");
    let headers_ability = document.getElementById("item-table-ability").querySelectorAll("th");
    let headers_survival = document.getElementById("item-table-survival").querySelectorAll("th");

    // 選択ヒーローがDVAの場合、絞り込み条件と合致させるために値を変更
    if(id == "DVA（メック）" || id == "DVA（人）"){
        id = "D.VA";
    }

    // 各アイテムごとにループ
    for(let i=0; i<itemList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化 
        let isCheck = false;  // 選択列はアイテム情報になく、初期時必ずfalseを入れる
        let itemNameText = "";
        let iconText = "-";
        let statusText = "";
        let textText = "";
        let rarityText = "";
        let costText = "";
        let uniqueHeroText = "";

        // カテゴリー判定用変数
        let categoryCheck = "";

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

            // キー名がアイコンキーの場合
            if(iconKey == key) {

                // アイコン用変数に値を代入
                iconText = itemList[i][key];
            }

            // キー名がテキストキーの場合
            if(textKey == key) {

                // テキスト用変数に値を代入
                textText = itemList[i][key];
            }

            // キー名がカテゴリーキーの場合
            if(categoryKey == key) {

                // カテゴリー判定用変数に値を代入
                categoryCheck = itemList[i][key];
            }
            
            // キー名がレア度キーの場合
            if(rarityKey == key) {

                // レア度用変数に値を代入
                rarityText = itemList[i][key];
            }

            // キー名がコストキーの場合
            if(costKey == key) {

                //コスト用変数に値を代入
                costText = itemList[i][key];
            }

            // キー名が固有ヒーローキーの場合
            if(uniqueHeroKey == key){

                // 固有ヒーロー用変数に値を代入
                uniqueHeroText = itemList[i][key];
            }

        })

        // 取得した各値をテーブルに紐付け
        // カテゴリー別に紐付け先のテーブルを分ける
        if(categoryCheck == "武器"){
            tbody_weapon.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText, uniqueHeroText, id));
        }else if(categoryCheck == "アビリティ"){
            tbody_ability.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText, uniqueHeroText, id));
        }else if(categoryCheck == "サバイバル"){
            tbody_survival.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText, uniqueHeroText, id));
        }
    }

    const sortingCriteria = [
        { column: "rarity", order: "asc", type: "string" },
        { column: "cost", order: "asc", type: "number" }
    ]

    // 各テーブルをソート
    TableSort(headers_weapon,tbody_weapon, sortingCriteria);
    TableSort(headers_ability,tbody_ability, sortingCriteria);
    TableSort(headers_survival,tbody_survival, sortingCriteria);
    
}

// アイテムリスト用子要素作成関数（※カテゴリー別に分けているため関数化）
function appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText, uniqueHeroText, id){
    // 選択列
    var td = document.createElement("td");
    td.classList.add("item-td");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = isCheck;
    input.classList.add("item-checkbox");
    td.appendChild(input);
    tr.appendChild(td);

    // アイテム名列
    var td = document.createElement("td");
    td.textContent = itemNameText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // アイコン列
    var td = document.createElement("td");
    td.classList.add("item-td");
    var iconImg = document.createElement("img");
    iconImg.src = "assets/images/icons/item/" + iconText;
    iconImg.classList.add("buildsimulator-itemicon");
    td.appendChild(iconImg);
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

    // レア度列（非表示）
    var td = document.createElement("td");
    td.textContent = rarityText;
    td.classList.add("hidden-column");
    tr.appendChild(td);
    
    // コスト列（非表示）
    var td = document.createElement("td");
    td.textContent = costText;
    td.classList.add("hidden-column");
    tr.appendChild(td);

    // 固有ヒーロー列（非表示）
    var td = document.createElement("td");
    td.textContent = uniqueHeroText;
    td.classList.add("hidden-column");
    td.id = "filter-target";
    tr.appendChild(td);

    if(uniqueHeroText == "-" || uniqueHeroText == id){
        tr.classList.remove("hidden-column");
    }else if(uniqueHeroText != "-" && uniqueHeroText != id){
        tr.classList.add("hidden-column");
    }

    return tr;
}

// パワーリストをテーブルに紐づける関数
function linkPowerList(powerList, id) {
    let tbody = document.getElementById("power-table").querySelector("tbody");

    // 選択ヒーローがDVAの場合、絞り込み条件と合致させるために値を変更
    if(id == "DVA（メック）" || id == "DVA（人）"){
        id = "D.VA";
    }

    // 各パワーごとにループ
    for(let i=0; i<powerList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化 
        let isCheck = false;  // 選択列はパワー情報になく、初期時必ずfalseを入れる
        let powerNameText = "";
        let iconText = "-";
        let textText = "";
        let heroText = "";

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

            // キー名がテキストキーの場合
            if(textKey == key) {

                // テキスト用変数に値を代入
                textText = powerList[i][key];
            }

            // キー名が固有ヒーローキーの場合
            if(heroKey == key){

                // 固有ヒーロー用変数に値を代入
                heroText = powerList[i][key];
            }

        })

        // 取得した各値をテーブルに紐付け
        // 選択列
        var td = document.createElement("td");
        td.classList.add("power-td");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.checked = isCheck;
        input.classList.add("power-checkbox");
        td.appendChild(input);
        tr.appendChild(td);

        // パワー名列
        var td = document.createElement("td");
        td.textContent = powerNameText;
        td.classList.add("power-td");
        tr.appendChild(td);

        // アイコン列
        var td = document.createElement("td");
        var iconImg = document.createElement("img");
        iconImg.src = "assets/images/icons/power/" + iconText;
        iconImg.classList.add("buildsimulator-powericon");
        td.appendChild(iconImg);
        td.classList.add("power-td");
        tr.appendChild(td);

        // テキスト列
        var td = document.createElement("td");
        td.textContent = textText;
        td.classList.add("power-td");
        tr.appendChild(td);

        // 固有ヒーロー列（非表示）
        var td = document.createElement("td");
        td.textContent = heroText;
        td.classList.add("hidden-column");
        td.id = "filter-target";
        tr.appendChild(td);

        if(heroText == "-" || heroText == id){
            tr.classList.remove("hidden-column");
        }else if(heroText != "-" && heroText != id){
            tr.classList.add("hidden-column");
        }

        tbody.appendChild(tr);
    }
}

// テーブルをソートする関数
function TableSort(headers, tbody, sortingCriteria) {

    //レア度の並び替えの基準を設定
    const rarityOrder = ['コモン', 'レア', 'エピック']

    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.shift();

    // 比較
    const comparator = (rowA, rowB) => {
        for (const criteria of sortingCriteria) {
            const { column, order, type } = criteria;

            // data-column属性に対応する<td>要素のインデックスを検索
            const columnIndex = Array.from(headers).findIndex(th => th.dataset.column == column);
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


// チェックされたアイテム名をもとに、アイテムリストの情報を配列に格納する関数
function updateSelectedItemsList() {

    var selectedItemRows = [];

    itemCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            const cells = row.querySelectorAll('td');
            
            //選択されたアイテム名
            const itemName = cells[1].textContent;
            for(let i=0; i<itemList.length; i++) {
                
                if(itemList[i][itemNameKey] == itemName){
                    selectedItemRows.push(itemList[i]);
                }
            }
        }
    });
    return selectedItemRows;
}

// チェックされたパワー名をもとに、パワーリストの情報を配列に格納する関数
function updateSelectedPowerList() {

    var selectedPowerRows = [];

    powerCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const row = checkbox.closest('tr');
            const cells = row.querySelectorAll('td');
            
            //選択されたパワー名
            const powerName = cells[1].textContent;
            for(let i=0; i<powerList.length; i++) {
                
                if(powerList[i][powerNameKey] == powerName){
                    selectedPowerRows.push(powerList[i]);
                }
            }
        }
    });
    return selectedPowerRows;
}

//ビルド欄のアイテムを更新する関数
function updateBuild_Item(selectedItemRows){

    for(let i=0; i<6; i++) {
        // 親要素を指定
        const targetDiv = document.getElementById("item" + String(i + 1))

        // 指定した要素内に子要素がある場合は削除する
        if(targetDiv.children.length != 0){
            const image = document.getElementById("item-image" + String(i + 1));
            const span = document.getElementById("delete-item" + String(i + 1));
            targetDiv.removeChild(image);
            targetDiv.removeChild(span);
        }
        
        // 選択されたアイテムのアイコンと✖ボタンを追加する
        if(i < selectedItemRows.length){
            // アイコン追加部分
            var iconImg = document.createElement("img");
            iconImg.src = "assets/images/icons/item/" + selectedItemRows[i][iconKey];
            iconImg.classList.add("selectedbuild-item-icon");
            iconImg.id = "item-image" + String(i + 1)
            targetDiv.appendChild(iconImg);
            
            // ✖ボタン追加部分
            var span = document.createElement("span");
            span.textContent = "✖︎";
            span.classList.add("selectedbuild-delete-button");
            span.id = "delete-item" + String(i + 1);
            targetDiv.appendChild(span);
        }
    }
}

//ステータスにアイテムの内容を反映する関数
function updateStatus_Item(selectedItemRows){

    // 選択中のヒーローのステータスを初期化
    const showStatusListTmp = initStatusList.filter(heroStatus => heroStatus[heroNameKey] === selectedHero);
    showStatusList = JSON.parse(JSON.stringify(showStatusListTmp[0]));
    initStatusValue(showStatusList,"init","-");

    // 最後に計算する倍率変数
    let lifeRate = 1;
    let armorRate = 1;
    let shieldRate = 1;

    for(let i=0; i<selectedItemRows.length; i++) {

        // 各パラメータを抽出
        const nameTmp = selectedItemRows[i][itemNameKey];
        const lifeTmp = selectedItemRows[i][lifeKey];
        const armorTmp = selectedItemRows[i][armorKey];
        const shieldTmp = selectedItemRows[i][shieldKey];
        const weaponPowerTmp = selectedItemRows[i][weaponPowerKey];
        const abilityPowerTmp = selectedItemRows[i][abilityPowerKey];
        const attackSpeedTmp = selectedItemRows[i][attackSpeedKey];
        const ctReducationTmp = selectedItemRows[i][ctReducationKey];
        const ammoTmp = selectedItemRows[i][ammoKey];
        const weapon_LifeStealTmp = selectedItemRows[i][weapon_LifeStealKey];
        const ability_LifeStealTmp = selectedItemRows[i][ability_LifeStealKey];
        const speedTmp = selectedItemRows[i][speedKey];
        const reloadSpeedTmp = selectedItemRows[i][reloadSpeedKey];
        const meleeDamageTmp = selectedItemRows[i][meleeDamageKey];
        const criticalTmp = selectedItemRows[i][criticalKey];
        let othersTmp = selectedItemRows[i][othersKey];
        let textTmp = selectedItemRows[i][textKey];

        // ライフに記載がある場合
        if(lifeTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[lifeKey] = showStatusList[lifeKey] + lifeTmp;
        }

        // 割合上昇アイテムの場合は倍率変数に保管後、追加効果に乗らないようハイフンにする
        if(nameTmp == "MEKA Zシリーズ"){
            lifeRate = lifeRate * 1.08;
            armorRate = armorRate * 1.08;
            shieldRate = shieldRate * 1.08;
            othersTmp = "-";
        }else if(nameTmp == "不屈の獅子"){
            lifeRate = lifeRate * 1.15;
            armorRate = armorRate * 1.15;
            shieldRate = shieldRate * 1.15;
            othersTmp = "-";
        }

        // アーマーに記載がある場合
        if(armorTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[armorKey] = showStatusList[armorKey] + armorTmp;
        }

        // シールドに記載がある場合
        if(shieldTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[shieldKey] = showStatusList[shieldKey] + shieldTmp;
        }

        // 武器パワーに記載がある場合
        if(weaponPowerTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[mainWeaponKey] = Math.round(showStatusList[mainWeaponKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            showStatusList[subWeaponKey] = Math.round(showStatusList[subWeaponKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;

            // ゲンジ・ソルジャーの場合はULTにも武器パワーが乗るので対応
            if(showStatusList[heroNameKey] == "ゲンジ" || showStatusList[heroNameKey] == "ソルジャー76"){
                showStatusList[ultKey] = Math.round(showStatusList[ultKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }
        }

        // アビリティパワーに記載がある場合
        if(abilityPowerTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[ability1Key] = Math.round(showStatusList[ability1Key] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            showStatusList[ability2Key] = Math.round(showStatusList[ability2Key] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;

            // ラインハルトとシグマの盾は除外
            if(showStatusList[heroNameKey] != "ラインハルト" && showStatusList[heroNameKey] != "シグマ"){
                showStatusList[ability3Key] = Math.round(showStatusList[ability3Key] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }

            // ゲンジとソルジャーのULTは除外
            if(showStatusList[heroNameKey] != "ゲンジ" && showStatusList[heroNameKey] != "ソルジャー76"){
                showStatusList[ultKey] = Math.round(showStatusList[ultKey] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }
        }

        // TODO:RIN 攻撃速度に記載がある場合

        // CT短縮に記載がある場合
        if(ctReducationTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[ability1CTKey] = Math.round(showStatusList[ability1CTKey] * ((100 - abilityPowerTmp) / 100) * 10 ** 2) / 10 ** 2;
            showStatusList[ability2CTKey] = Math.round(showStatusList[ability2CTKey] * ((100 - abilityPowerTmp) / 100) * 10 ** 2) / 10 ** 2;
            showStatusList[ability3CTKey] = Math.round(showStatusList[ability3CTKey] * ((100 - abilityPowerTmp) / 100) * 10 ** 2) / 10 ** 2;
        }

        // 弾薬に記載がある場合　TODO:RIN QA10
        if(ammoTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[mainAmmoKey] = Math.round(showStatusList[mainAmmoKey] * (ammoTmp/100 + 1));
            showStatusList[subAmmoKey] = Math.round(showStatusList[subAmmoKey] * (ammoTmp/100 + 1));
        }

        // 武器ライフ吸収に記載がある場合
        if(weapon_LifeStealTmp != 0){

            // 表示用ステータスリストに反映
            if(showStatusList[mainWeaponKey] != 0){
                showStatusList[mainLifeStealRateKey] = showStatusList[mainLifeStealRateKey] + weapon_LifeStealTmp / 100;
            }
            if(showStatusList[subWeaponKey] != 0){
                showStatusList[subLifeStealRateKey] = showStatusList[subLifeStealRateKey] + weapon_LifeStealTmp / 100;
            }

            // ゲンジ・ソルジャーの場合はULTにも武器パワーが乗るので対応
            if(showStatusList[heroNameKey] == "ゲンジ" || showStatusList[heroNameKey] == "ソルジャー76"){
                showStatusList[ultLifeStealRateKey] = showStatusList[ultLifeStealRateKey] + weapon_LifeStealTmp / 100;
            }
        }

        // アビリティライフ吸収に記載がある場合
        if(ability_LifeStealTmp != 0){

            // 表示用ステータスリストに反映
            if(showStatusList[ability1Key] != 0){
                showStatusList[ability1LifeStealRateKey] = showStatusList[ability1LifeStealRateKey] + ability_LifeStealTmp / 100;
            }
            if(showStatusList[ability2Key] != 0){
                showStatusList[ability2LifeStealRateKey] = showStatusList[ability2LifeStealRateKey] + ability_LifeStealTmp / 100;
            }

            // ラインハルトとシグマの盾は除外
            if(showStatusList[heroNameKey] != "ラインハルト" && showStatusList[heroNameKey] != "シグマ"){
                if(showStatusList[ability3Key] != 0){
                    showStatusList[ability3LifeStealRateKey] = showStatusList[ability3LifeStealRateKey] + ability_LifeStealTmp / 100;
                }
            }

            // ゲンジとソルジャーのULTは除外
            if(showStatusList[heroNameKey] != "ゲンジ" && showStatusList[heroNameKey] != "ソルジャー76"){
                if(showStatusList[ultKey] != 0){
                    showStatusList[ultLifeStealRateKey] = showStatusList[ultLifeStealRateKey] + ability_LifeStealTmp / 100;
                }
            }
        }

        // TODO:RIN 移動速度に記載がある場合

        // リロード速度に記載がある場合
        if(reloadSpeedTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[mainReloadKey] = Math.round(showStatusList[mainReloadKey] * ((100 - reloadSpeedTmp) / 100) * 10 ** 2) / 10 ** 2;
            showStatusList[subReloadKey] = Math.round(showStatusList[subReloadKey] * ((100 - reloadSpeedTmp) / 100) * 10 ** 2) / 10 ** 2;
        }

        // TODO:RIN 近接ダメージに記載がある場合

        // クリティカルに記載がある場合
        if(criticalTmp != 0){

            // HS倍率があるなら表示用ステータスリストに反映
            if(showStatusList[mainHSRateKey] != 1){
                showStatusList[mainHSRateKey] = showStatusList[mainHSRateKey] * (criticalTmp/100 + 1);
            }
            if(showStatusList[subHSRateKey] != 1){
                showStatusList[subHSRateKey] = showStatusList[subHSRateKey] * (criticalTmp / 100 + 1);   
            }
        }

        // 最後に計算するものがある場合 TODO:RIN QA9
        if(lifeRate != 0){

            // 表示用ステータスリストに反映
            showStatusList[lifeKey] = Math.round(showStatusList[lifeKey] * lifeRate);
        }

        if(armorRate != 0){

            // 表示用ステータスリストに反映
            showStatusList[armorKey] = Math.round(showStatusList[armorKey] * armorRate);
        }

        if(shieldRate != 0){

            // 表示用ステータスリストに反映
            showStatusList[shieldKey] = Math.round(showStatusList[shieldKey] * shieldRate);
        }

        // ステータス表に反映
        initStatusValue(showStatusList, textTmp, othersTmp);
    }
}

//ビルド欄のパワーを更新する関数
function updateBuild_Power(selectedPowerRows){

    for(let i=0; i<4; i++) {
        // 親要素を指定
        let targetDiv = document.getElementById("power" + String(i + 1));

        // 指定した要素内に子要素がある場合は削除する
        if(targetDiv.children.length != 0){
            const image = document.getElementById("power-image" + String(i + 1));
            const span = document.getElementById("delete-power" + String(i + 1));
            targetDiv.removeChild(image);
            targetDiv.removeChild(span);
        }
        
        // 選択されたアイテムのアイコンと✖ボタンを追加する
        if(i < selectedPowerRows.length){
            // アイコン追加部分
            var iconImg = document.createElement("img");
            iconImg.src = "assets/images/icons/power/" + selectedPowerRows[i][iconKey];
            iconImg.classList.add("selectedbuild-power-icon");
            iconImg.id = "power-image" + String(i + 1)
            targetDiv.appendChild(iconImg);
            
            // ✖ボタン追加部分
            var span = document.createElement("span");
            span.textContent = "✖︎";
            span.classList.add("selectedbuild-delete-button");
            span.id = "delete-power" + String(i + 1);
            targetDiv.appendChild(span);
        }
    }
}

//ステータスにパワーの内容を反映する関数
function updateStatus_Power(selectedPowerRows){

    // 追加効果欄を初期化
    document.getElementById("addpower").innerText = "追加効果(パワー):";
    
    for(let i=0; i<4; i++) {

        // テキストを抽出
        const textTmp = selectedPowerRows[i][textKey];

        // 追加効果欄に羅列(パワーは必ずテキストがあるため空チェックはしない)
        document.getElementById("addpower").innerText = document.getElementById("addpower").innerText + textTmp + "\n";
    }
}

// ✖ボタンクリック時にアイコンを削除する関数
function clickDeleteButton(spanId,selectedRows) {

    let index = Number(spanId.slice(-1)) - 1;
    const selectedRowsBeforeLength = selectedRows.length

    // IDに「item」が含まれる場合
    if(spanId.includes("item")){
        
        const itemName = selectedRows[index][itemNameKey];
        const category = selectedRows[index][categoryKey];
        //初期値は武器カテゴリを設定
        var tbody = document.getElementById("item-table-weapon").querySelector("tbody");

        // 武器以外のカテゴリの場合検索範囲を設定
        if(category == "アビリティ"){
            tbody = document.getElementById("item-table-ability").querySelector("tbody");
        }else if(category == "サバイバル"){
            tbody = document.getElementById("item-table-survival").querySelector("tbody");
        }

        const rows = tbody.querySelectorAll("tr");
        // アイテム名のインデックス
        const targetColumnIndex = 1;
        // 変更する列のインデックス
        const changeColumnIndex = 0;

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const cellText = cells[targetColumnIndex].textContent;

            if(cellText == itemName){
                // 選択したアイテムのチェックボックスのチェックを解除
                const checkbox =  cells[changeColumnIndex].querySelector(".item-checkbox");
                checkbox.checked = false;
            }
        });

        // アイテムリスト、ビルド欄を更新
        selectedRows = updateSelectedItemsList();
        updateBuild_Item(selectedRows);

        if(selectedRowsBeforeLength == 6){
            //元々アイテムが6個選ばれていた場合、選択されていないアイテムのチェックボックスを入力可
            disableItemTableCheckbox(false);
        }

        return selectedRows;

    }else if(spanId.includes("power")){

        const powerName = selectedRows[index][powerNameKey];
        const tbody = document.getElementById("power-table").querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));
        rows.shift();
        // パワー名のインデックス
        const targetColumnIndex = 1;
        // 変更する列のインデックス
        const changeColumnIndex = 0;

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const cellText = cells[targetColumnIndex].textContent;

            if(cellText == powerName){
                // 選択したパワーのチェックボックスのチェックを解除
                const checkbox =  cells[changeColumnIndex].querySelector(".power-checkbox");
                checkbox.checked = false;
            }
        });

        // パワーリスト、ビルド欄を更新
        selectedRows = updateSelectedPowerList();
        updateBuild_Power(selectedRows);

        if(selectedRowsBeforeLength == 4){
            //元々パワーが4個選ばれていた場合、選択されていないパワーのチェックボックスを入力可
            disablePowerTableCheckbox(false);
        }

        return selectedRows;
    }
}

// アイテムテーブルのチェックボックス管理の関数
function disableItemTableCheckbox(flag){
    const checkboxes = document.querySelectorAll(".item-checkbox");

    checkboxes.forEach(checkbox =>{
        if(!checkbox.checked){
            if(flag){
                checkbox.disabled = true;    
            }else{
                checkbox.disabled = false;
            }           
        }
    });
}

// パワーテーブルのチェックボックス管理の関数
function disablePowerTableCheckbox(flag){
    const checkboxes = document.querySelectorAll(".power-checkbox");

    checkboxes.forEach(checkbox =>{
        if(!checkbox.checked){
            if(flag){
                checkbox.disabled = true;    
            }else{
                checkbox.disabled = false;
            }           
        }
    });
}

// 選択ヒーローに応じてテーブルを絞り込む関数
function filterTable(id){

    // 選択ヒーローがDVAの場合、絞り込み条件と合致させるために値を変更
    if(id == "DVA（メック）" || id == "DVA（人）"){
        id = "D.VA";
    }

    // アイテムテーブルのカテゴリ
    const tableCategory = ["weapon","ability","survival"];

    for(let i=0; i<tableCategory.length; i++){
        var tbody_item = document.getElementById("item-table-" + tableCategory[i]).querySelector("tbody");
        var rows_item = tbody_item.querySelectorAll("tr");

        rows_item.forEach(row =>{
            const cells = row.querySelectorAll("td");
            const checkbox =  cells[0].querySelector(".item-checkbox");
            const target = row.querySelector("td#filter-target").textContent;

            // チェックボックスを未選択状態にする
            if(checkbox.checked){
                checkbox.checked = false;
            }

            // 選択ヒーローに応じてアイテムテーブル絞り込み実施
            if(target == "-" || target == id){
                row.classList.remove("hidden-column");
            }else if(target != "-" && target != id){
                row.classList.add("hidden-column");
            }
        });
    }

    var tbody_power = document.getElementById("power-table").querySelector("tbody");
    var rows_power = Array.from(tbody_power.querySelectorAll("tr"));
    rows_power.shift();

    rows_power.forEach(row =>{
        const cells = row.querySelectorAll("td");
        const checkbox =  cells[0].querySelector(".power-checkbox");
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