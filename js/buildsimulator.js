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

var zariaFlg = "エネルギー0%"  // ザリア計算用フラグ
var junoFlg = "ダメージ"  // ジュノ計算用フラグ
var moiraFlg = "ダメージ"  // モイラ計算用フラグ

var queenScratch = 15;  // クイーン傷ダメージ用変数

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

    // ジュノ計算用フラグ初期化
    junoFlg = "ダメージ";

    let imgPath = "";
    // 選択中ヒーローアイコンを変更
    // DVAチェック
    if(id == "DVA（メック）" || id == "DVA（人）"){
        imgPath = "DVA.png"
    }else{
        imgPath = id + ".png";
    }
    document.getElementById("selected-hero-icon").src = "assets/images/icons/hero/" + imgPath;

    // 選択ヒーロー名変更
    changeSelectedHeroTitle(id);

    // 傷ダメージ初期化
    queenScratch = 15;

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

// 選択ヒーロー名切り替え
function changeSelectedHeroTitle(id){

    const selectedHeroTitle = document.querySelector('.selectedhero-title');
    let heroName = "";

    if(id == "DVA（メック）" || id == "DVA（人）"){
        heroName = "DVA";
    }else{
        heroName = id;
    }

    selectedHeroTitle.textContent = heroName;
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

            // ザリアの場合
            if(selectedHero == "ザリア"){
                
                // エネルギーボタンを表示
                document.getElementById("zaria-button").style.display = "flex";
            }else{

                // エネルギーボタンを非表示
                document.getElementById("zaria-button").style.display = "none";
            }

            // ジュノの場合
            if(selectedHero == "ジュノ"){
                
                // ダメージボタンを表示
                document.getElementById("juno-button").style.display = "flex";
            }else{

                // ダメージボタンを非表示
                document.getElementById("juno-button").style.display = "none";
            }

            // モイラの場合
            if(selectedHero == "モイラ"){
                
                // エネルギーボタンを表示
                document.getElementById("moira-button").style.display = "flex";
            }else{

                // エネルギーボタンを非表示
                document.getElementById("moira-button").style.display = "none";
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
    document.getElementById("life").innerText = lifeKey + " :" + statuslist[lifeKey];
    document.getElementById("armor").innerText = armorKey + " :" + statuslist[armorKey];
    document.getElementById("shield").innerText = shieldKey + " :" + statuslist[shieldKey];
    
    const container = document.getElementById('status-container');
    container.innerHTML = '';

    // 武器キーをまとめておく配列
    const weapons = [
        {
            nameKey: mainWeaponNameKey,
            attackPointKey: mainWeaponKey,
            HSRateKey: mainHSRateKey,
            reloadKey: mainReloadKey,
            ammoKey: mainAmmoKey,
            lifeStealRateKey: mainLifeStealRateKey
        },
        {
            nameKey: subWeaponNameKey,
            attackPointKey: subWeaponKey,
            HSRateKey: subHSRateKey,
            reloadKey: subReloadKey,
            ammoKey: subAmmoKey,
            lifeStealRateKey: subLifeStealRateKey
        },
        {
            nameKey: meleeDamageKey,
            attackPointKey: meleeDamageKey,
            HSRateKey: "",
            reloadKey: "",
            ammoKey: "",
            lifeStealRateKey: ""
        }
    ];

    // アビリティ、ウルトキーをまとめておく配列
    const anothers = [
        {
            nameKey: ability1NameKey,
            attackPointKey: ability1Key,
            CTKey: ability1CTKey,
            durationKey: ability1DurationKey,
            lifeStealRateKey: ability1LifeStealRateKey
        },
        {
            nameKey: ability2NameKey,
            attackPointKey: ability2Key,
            CTKey: ability2CTKey,
            durationKey: ability2DurationKey,
            lifeStealRateKey: ability2LifeStealRateKey
        },
        {
            nameKey: ability3NameKey,
            attackPointKey: ability3Key,
            CTKey: ability3CTKey,
            durationKey: ability3DurationKey,
            lifeStealRateKey: ability3LifeStealRateKey
        },
        {
            nameKey: ultNameKey,
            attackPointKey: ultKey,
            CTKey: "",
            durationKey: ultDurationKey,
            lifeStealRateKey: ultLifeStealRateKey
        },
    ];

    // ループで各武器の処理を実行
    weapons.forEach(weapon => {
        processWeapon(
            statuslist,
            weapon.nameKey,
            weapon.attackPointKey,
            weapon.HSRateKey,
            weapon.reloadKey,
            weapon.ammoKey,
            weapon.lifeStealRateKey
        );
    });

    // ループで各アビリティ、ウルトの処理を実行
    anothers.forEach(another => {
        processAnother(
            statuslist,
            another.nameKey,
            another.attackPointKey,
            another.CTKey,
            another.durationKey,
            another.lifeStealRateKey
        );
    });

    document.getElementById("addpower").innerText = "追加効果(パワー):";
    // 羅列するため初期設定時のみ走るようinit判定をする
    if(addItemText == "init"){
        document.getElementById("additem").innerText = "追加効果(アイテム):";
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

function processWeapon(statuslist,weaponNameKey,attackPointKey,HSRateKey,reloadKey,ammoKey,lifeStealRateKey){
    // 武器が存在しない場合は何もしない
    if (statuslist[weaponNameKey] == "なし") {
        return;
    }

    let weaponValue = statuslist[attackPointKey];
    let HSValue = 0;
    let reloadValue = 0;
    let ammoValue = 0;
    let lifeStealValue = 0;
    
    if (selectedHero == "ジュノ" && junoFlg == "ヒール") {
        weaponValue = Math.round((statuslist[attackPointKey] * 0.8 * 10 ** 2) / 10 ** 2);
    } else if (selectedHero == "ザリア" && zariaFlg == "エネルギー100%") {
        weaponValue = Math.round(statuslist[attackPointKey] * 2 * 10 ** 2) / 10 ** 2;
    } else if (selectedHero == "ジャンカー・クイーン" && weaponNameKey == meleeDamageKey){
        weaponValue =  statuslist[attackPointKey] + queenScratch;
    }

    // HS倍率
    if(HSRateKey != "" && statuslist[HSRateKey] != 1){
        HSValue = Math.round(statuslist[attackPointKey] * statuslist[HSRateKey]);
    }

    // リロード速度
    if(reloadKey != "" && statuslist[reloadKey] != 0){
        reloadValue = statuslist[reloadKey];
    }

    // 弾薬数
    if(ammoKey != "" && statuslist[ammoKey] != 0){
        ammoValue = statuslist[ammoKey];
    }

    // ライフ吸収
    if(lifeStealRateKey != "" &&  selectedHero == "リーパー"){
        lifeStealValue = Math.round(statuslist[attackPointKey] * (statuslist[lifeStealRateKey] + 0.3));
    }else if(lifeStealRateKey != "" &&  statuslist[lifeStealRateKey] != 0){
        lifeStealValue = Math.round(statuslist[attackPointKey] * statuslist[lifeStealRateKey]);
    }

    // 武器の情報を追加
    if(weaponNameKey == meleeDamageKey){
        addStatusDiv_Weapon(weaponNameKey,weaponValue,HSValue,reloadValue,ammoValue,lifeStealValue);
    }else{
        addStatusDiv_Weapon(statuslist[weaponNameKey],weaponValue,HSValue,reloadValue,ammoValue,lifeStealValue);
    }
    
};

function addStatusDiv_Weapon(name,value,hsValue,reload,ammo,lifeSteal){
    const container = document.getElementById('status-container');
    const div = document.createElement('div');
    div.classList.add('status-div');

    // HS表示用文字列を生成
    const hsView = hsValue > 0 ? "（HS" + hsValue + "）" : "";
    // リロード、弾薬、L吸収の表示用文字列を生成
    let detailParts = [];

    if (reload != 0) {
        detailParts.push(`<span><strong>リロード</strong>：${reload}秒</span>`);
    }
    if (ammo != 0) {
        detailParts.push(`<span><strong>弾薬</strong>：${ammo}発</span>`);
    }
    if (lifeSteal != 0) {
        detailParts.push(`<span><strong>L吸収</strong>：${lifeSteal}</span>`);
    }

    // 詳細部分を結合（項目がない場合は空文字）
    const detailsHtml = detailParts.length > 0 ? `<p class="status-detail">${detailParts.join("　")}</p>` : "";

    // 内容を生成
    div.innerHTML = `
        <p><strong>${name}</strong>：${value}${hsView}</p>
        ${detailsHtml}
    `;

    container.appendChild(div);
}

function processAnother(statuslist,nameKey,attackPointKey,CTKey,durationKey,lifeStealRateKey){
    // アビリティが存在しない場合は何もしない
    if (statuslist[nameKey] == "なし") {
        return;
    }

    let attackValue = statuslist[attackPointKey];
    let durationValue = 0;
    let CTValue = 0;
    let lifeStealValue = 0;
    
    if(attackPointKey == "ability1Key"){
         if(selectedHero == "ジュノ" && junoFlg == "ヒール"){
            attackValue = statuslist[attackPointKey] + 50;
        }else if(selectedHero == "モイラ" && moiraFlg == 'ヒール'){
            attackValue = Math.round((statuslist[attackPointKey] * 1.5 * 10 ** 2) / 10 ** 2);
        }
    }

    if(attackPointKey == "ultKey"){
        if(selectedHero == "モイラ" && moiraFlg == 'ヒール'){
            attackValue = Math.round((statuslist[ultKey] / 18 * 27 * 10 ** 2) / 10 ** 2);
        }
    }

    // 継続時間
    if(statuslist[durationKey] != 0){
        durationValue = statuslist[durationKey];
    }

    // CT
    if(CTKey != "" && statuslist[CTKey] != 0){
        CTValue = statuslist[CTKey];
    }

    // ライフ吸収
    if(selectedHero == "リーパー"){
        lifeStealValue = Math.round(statuslist[attackPointKey] * (statuslist[lifeStealRateKey] + 0.3));
    }else if(statuslist[lifeStealRateKey] != 0){
        lifeStealValue = Math.round(statuslist[attackPointKey] * statuslist[lifeStealRateKey]);
    }

    // アビリティ、ウルトの情報を追加
    addStatusDiv_AbilityOrULT(statuslist[nameKey],attackValue,CTValue,durationValue,lifeStealValue);
}

function addStatusDiv_AbilityOrULT(name,value,ct,duration,lifeSteal){
    const container = document.getElementById('status-container');
    const div = document.createElement('div');
    div.classList.add('status-div');

    // CT、継続時間、L吸収の表示用文字列を生成
    let detailParts = [];

    if (ct != 0) {
        detailParts.push(`<span><strong>CT</strong>：${ct}秒</span>`);
    }
    if (duration != 0) {
        detailParts.push(`<span><strong>継続時間</strong>：${duration}秒</span>`);
    }
    if (lifeSteal != 0) {
        detailParts.push(`<span><strong>L吸収</strong>：${lifeSteal}</span>`);
    }

    // 詳細部分を結合（項目がない場合は空文字）
    const detailsHtml = detailParts.length > 0 ? `<p class="status-detail">${detailParts.join("　")}</p>` : "";

    // 内容を生成
    div.innerHTML = `
        <p><strong>${name}</strong>：${value}</p>
        ${detailsHtml}
    `;

    container.appendChild(div);
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

    // ビルドを反映
    if(selectedItemRowsData.length > 0){
        updateStatus_Item(selectedItemRowsData);
    }
    if(selectedPowerRowsData.length > 0){
        updateStatus_Power(selectedPowerRowsData);
    }
}

// ザリアエネルギー切り替え
function zariaButtonClick(){

    const zariaButton = document.getElementById("zaria-button");

    // エネルギー表示を入れ替える
    if(zariaButton.innerText == "エネルギー0%"){
        zariaFlg = "エネルギー100%";
        zariaButton.innerText = zariaFlg;
    }else if(zariaButton.innerText == "エネルギー100%"){
        zariaFlg = "エネルギー0%";
        zariaButton.innerText = zariaFlg;
    }
    // ステータスボックス初期化
    initStatusValue(showStatusList,"-","-");

    // ビルドを反映
    if(selectedItemRowsData.length > 0){
        updateStatus_Item(selectedItemRowsData);
    }
    if(selectedPowerRowsData.length > 0){
        updateStatus_Power(selectedPowerRowsData);
    }
}

// ジュノダメージ/ヒール切り替え
function junoButtonClick(){

    const junoButton = document.getElementById("juno-button");

    // ダメージ/ヒール表示を入れ替える
    if(junoButton.innerText == "ダメージ"){
        junoFlg = "ヒール";
        junoButton.innerText = junoFlg;
    }else if(junoButton.innerText == "ヒール"){
        junoFlg = "ダメージ";
        junoButton.innerText = junoFlg;
    }
    // ステータスボックス初期化
    initStatusValue(showStatusList,"-","-");

    // ビルドを反映
    if(selectedItemRowsData.length > 0){
        updateStatus_Item(selectedItemRowsData);
    }
    if(selectedPowerRowsData.length > 0){
        updateStatus_Power(selectedPowerRowsData);
    }
}

// モイラダメージ/ヒール切り替え
function moiraButtonClick(){

    const moiraButton = document.getElementById("moira-button");

    // ダメージ/ヒール表示を入れ替える
    if(moiraButton.innerText == "ダメージ"){
        moiraFlg = "ヒール";
        moiraButton.innerText = moiraFlg;
    }else if(moiraButton.innerText == "ヒール"){
        moiraFlg = "ダメージ";
        moiraButton.innerText = moiraFlg;
    }
    // ステータスボックス初期化
    initStatusValue(showStatusList,"-","-");

        // ビルドを反映
    if(selectedItemRowsData.length > 0){
        updateStatus_Item(selectedItemRowsData);
    }
    if(selectedPowerRowsData.length > 0){
        updateStatus_Power(selectedPowerRowsData);
    }
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
    
    // 傷ダメージも初期化
    queenScratch = 15;

    initStatusValue(showStatusList,"init","-");

    // 最後に計算する倍率変数
    let lifeRate = 1;
    let armorRate = 1;
    let shieldRate = 1;
    let ammoRate = 1;

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

        // ライフ割合上昇アイテムの場合は倍率変数に保管後、追加効果に乗らないようハイフンにする
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
            
            // ラインハルトは近接ダメージにも武器パワーが乗るので対応
            if(showStatusList[heroNameKey] == "ラインハルト"){
                showStatusList[meleeDamageKey] = Math.round(showStatusList[meleeDamageKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }

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

            // クイーンの場合は傷ダメージにも乗算
            queenScratch = Math.round(queenScratch * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
        }

        // TODO:RIN 攻撃速度に記載がある場合

        // CT短縮に記載がある場合
        if(ctReducationTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[ability1CTKey] = Math.round(showStatusList[ability1CTKey] * ((100 - abilityPowerTmp) / 100) * 10 ** 2) / 10 ** 2;
            showStatusList[ability2CTKey] = Math.round(showStatusList[ability2CTKey] * ((100 - abilityPowerTmp) / 100) * 10 ** 2) / 10 ** 2;
            showStatusList[ability3CTKey] = Math.round(showStatusList[ability3CTKey] * ((100 - abilityPowerTmp) / 100) * 10 ** 2) / 10 ** 2;
        }

        // 弾薬に記載がある場合
        if(ammoTmp != 0){

            // 固定値計算アイテムを先に表示用ステータスリストに反映し、追加効果に乗らないようハイフンにする
            if(nameTmp == "リソース・マネジメント"){
                showStatusList[mainAmmoKey] += 4;
                othersTmp = "-";
            }
            ammoRate = ammoRate * ammoTmp;
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

        // 近接ダメージに記載がある場合
        if(meleeDamageTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[meleeDamageKey] = Math.round(showStatusList[meleeDamageKey] * (meleeDamageTmp / 100 + 1) * 10 ** 2) / 10 ** 2;

            // ラインハルトはメイン武器にも近接ダメージが乗るので対応
            if(showStatusList[heroNameKey] == "ラインハルト"){
                showStatusList[mainWeaponKey] = Math.round(showStatusList[mainWeaponKey] * (meleeDamageTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }
        }

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

        // 持続時間上昇アイテム
        if(nameTmp == "不滅の刃"){
            showStatusList[ultDurationKey] = showStatusList[ultDurationKey] + 4;
            othersTmp = "-";
        }
        else if(nameTmp == "ターゲット・トラッカー"){
            showStatusList[ability2DurationKey] = Math.round(showStatusList[ability2DurationKey] * 1.15 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "次世代手首ユニット"){
            showStatusList[ability3DurationKey] = Math.round(showStatusList[ability3DurationKey] * 1.35 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "エフィの法則"){
            showStatusList[ability2DurationKey] = Math.round(showStatusList[ability2DurationKey] * 1.5 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "超電導ユニット"){
            showStatusList[ability1DurationKey] = Math.round(showStatusList[ability1DurationKey] * 1.4 * 10 ** 2) / 10 ** 2;
            showStatusList[ability2DurationKey] = Math.round(showStatusList[ability2DurationKey] * 1.4 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "バッテリー・パック"){
            showStatusList[ability2DurationKey] = Math.round(showStatusList[ability2DurationKey] * 1.4 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "コーカイの目"){
            showStatusList[ultDurationKey] = Math.round(showStatusList[ultDurationKey] * 1.35 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "ルクス・ループ"){
            showStatusList[ability3DurationKey] = Math.round(showStatusList[ability3DurationKey] * 1.25 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "エクステンデッド・プレイ"){
            showStatusList[ability2DurationKey] = Math.round(showStatusList[ability2DurationKey] * 1.25 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "導電コア"){
            showStatusList[ability1DurationKey] = Math.round(showStatusList[ability1DurationKey] * 1.25 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "スライシー・クーラント"){
            showStatusList[ability1DurationKey] = Math.round(showStatusList[ability1DurationKey] + 1);
            othersTmp = "-";
        }
        else if(nameTmp == "不屈の亡霊"){
            showStatusList[ability2DurationKey] = Math.round(showStatusList[ability2DurationKey] * 1.15 * 10 ** 2) / 10 ** 2;
            othersTmp = "15%[レイス・フォーム]移動速度";
        }
        else if(nameTmp == "パーフェクト・フォーミュラ"){
            showStatusList[ultDurationKey] = Math.round(showStatusList[ultDurationKey] * 1.33 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }
        else if(nameTmp == "補助ブースター"){
            showStatusList[ability2DurationKey] = Math.round(showStatusList[ability2DurationKey] * 1.25 * 10 ** 2) / 10 ** 2;
            othersTmp = "-";
        }

        // ラインハルトの盾増強
        if(nameTmp == "オーバークロック・バリア"){
            showStatusList[ability3Key] = Math.round(showStatusList[ability3Key] * 1.2 * 10 ** 2) / 10 ** 2;
            othersTmp = "20%[バリア・フィールド]サイズ";
        }
        

        // 最後に計算するものがある場合
        if(i + 1 == selectedItemRows.length){

            // ライフ
            if(lifeRate != 1){

                // 表示用ステータスリストに反映
                showStatusList[lifeKey] = Math.round(showStatusList[lifeKey] * lifeRate);
            }

            // アーマー
            if(armorRate != 1){

                // 表示用ステータスリストに反映
                showStatusList[armorKey] = Math.round(showStatusList[armorKey] * armorRate);
            }

            // シールド
            if(shieldRate != 1){

                // 表示用ステータスリストに反映
                showStatusList[shieldKey] = Math.round(showStatusList[shieldKey] * shieldRate);
            }   

            // 弾薬
            if(ammoRate != 1){

                // 表示用ステータスリストに反映
                if(showStatusList[heroNameKey] != "キリコ"){

                    // キリコのメイン弾薬は増えないので除外
                    showStatusList[mainAmmoKey] = Math.round(showStatusList[mainAmmoKey] * ammoRate);
                }
                
                if(showStatusList[heroNameKey] != "フレイヤ"){

                    // フレイヤのサブ弾薬は増えないので除外
                    showStatusList[subAmmoKey] = Math.round(showStatusList[subAmmoKey] * ammoRate);
                }
            }   
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
