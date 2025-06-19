// ------------------------------
// 処理部
// ------------------------------

// アイテムリストをテーブルに紐付け
linkItemList(itemList);

// パワーリストをテーブルに紐付け
linkPowerList(powerList);

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

// ステータスボックス設定
updateStatus(selectedHero);

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

    // ステータスボックス更新
    updateStatus(id);

    // ヒーローウィンドウを消す
    document.getElementById("herowindow").style.display = "none";
}

// ステータスボックス設定
function updateStatus(selectedHero){
    // 各ヒーローごとにループ
    for(let i=0; i<statusList.length; i++) {

        // 選択中のヒーローの場合
        if (statusList[i][heroNameKey] == selectedHero){

            // DVAの場合
            if(selectedHero == "DVA（メック）" || selectedHero == "DVA（人）"){
                
                // メック人切り替えボタンを表示
                document.getElementById("dva-button").style.display = "flex";
            }else{

                // メック人切り替えボタンを非表示
                document.getElementById("dva-button").style.display = "none";
            }

            // 選択中のヒーローのステータスを設定
            document.getElementById("heroname").innerText = statusList[i][heroNameKey];
            document.getElementById("life").innerText = lifeKey + " :" + statusList[i][lifeKey];
            document.getElementById("armor").innerText = armorKey + " :" + statusList[i][armorKey] ;
            document.getElementById("shield").innerText = shieldKey + " :" + statusList[i][shieldKey];
            document.getElementById("mainweapon").innerText = mainWeaponKey + "(" + statusList[i][mainWeaponNameKey] + ")" + " :" + statusList[i][mainWeaponKey];
            document.getElementById("subweapon").innerText = subWeaponKey + "(" + statusList[i][subWeaponNameKey] + ")" + " :" + statusList[i][subWeaponKey];
            document.getElementById("ability1").innerText = ability1Key + "(" + statusList[i][ability1NameKey] + ")" + " :" + statusList[i][ability1Key];
            document.getElementById("ability2").innerText = ability2Key + "(" + statusList[i][ability2NameKey] + ")" + " :" + statusList[i][ability2Key];
            document.getElementById("ability3").innerText = ability3Key + "(" + statusList[i][ability3NameKey] + ")" + " :" + statusList[i][ability3Key];
            document.getElementById("ult").innerText = ultKey + "(" + statusList[i][ultNameKey] + ")" + " :" + statusList[i][ultKey];
            document.getElementById("addpower").innerText = addPowerKey + " :" + statusList[i][addPowerKey];

            // リロード速度がある場合は追加
            if(statusList[i][mainReloadKey] != 0){
                document.getElementById("mainweapon").innerText = document.getElementById("mainweapon").innerText + " (リロード" + statusList[i][mainReloadKey] + "秒)";
            }
            if(statusList[i][subReloadKey] != 0){
                document.getElementById("subweapon").innerText = document.getElementById("subweapon").innerText + " (リロード" + statusList[i][subReloadKey] + "秒)";
            }

            // 弾薬数がある場合は追加
            if(statusList[i][mainAmmoKey] != 0){
                document.getElementById("mainweapon").innerText = document.getElementById("mainweapon").innerText + " (" + statusList[i][mainAmmoKey] + "弾)";
            }
            if(statusList[i][subAmmoKey] != 0){
                document.getElementById("subweapon").innerText = document.getElementById("subweapon").innerText + " (" + statusList[i][subReloadKey] + "弾)";
            }

            // 継続時間がある場合は追加
            if(statusList[i][ability1DurationKey] != 0){
                document.getElementById("ability1").innerText = document.getElementById("ability1").innerText + " (" + statusList[i][ability1DurationKey] + "秒継続)";
            }
            if(statusList[i][ability2DurationKey] != 0){
                document.getElementById("ability2").innerText = document.getElementById("ability2").innerText + " (" + statusList[i][ability2DurationKey] + "秒継続)";
            }
            if(statusList[i][ability3DurationKey] != 0){
                document.getElementById("ability3").innerText = document.getElementById("ability3").innerText + " (" + statusList[i][ability3DurationKey] + "秒継続)";
            }
            if(statusList[i][ultDurationKey] != 0){
                document.getElementById("ult").innerText = document.getElementById("ult").innerText + " (" + statusList[i][ultDurationKey] + "秒継続)";
            }

            // CT時間がある場合は追加
            if(statusList[i][ability1CTKey] != 0){
                document.getElementById("ability1").innerText = document.getElementById("ability1").innerText + " (CT" + statusList[i][ability1CTKey] + "秒)";
            }
            if(statusList[i][ability2CTKey] != 0){
                document.getElementById("ability2").innerText = document.getElementById("ability2").innerText + " (CT" + statusList[i][ability2CTKey] + "秒)";
            }
            if(statusList[i][ability3CTKey] != 0){
                document.getElementById("ability3").innerText = document.getElementById("ability3").innerText + " (CT" + statusList[i][ability3CTKey] + "秒)";
            }
        }
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

    // ステータスボックス更新
    updateStatus(selectedHero);
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
function linkItemList(itemList) {
    let tbody_weapon = document.getElementById("item-table-weapon").querySelector("tbody");
    let tbody_ability = document.getElementById("item-table-ability").querySelector("tbody");
    let tbody_survival = document.getElementById("item-table-survival").querySelector("tbody");

    //各テーブルのヘッダー情報を取得
    let headers_weapon = document.getElementById("item-table-weapon").querySelectorAll("th");
    let headers_ability = document.getElementById("item-table-ability").querySelectorAll("th");
    let headers_survival = document.getElementById("item-table-survival").querySelectorAll("th");

    // 各アイテムごとにループ
    for(let i=0; i<itemList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化 
        let isCheck = false;  // 選択列はアイテム情報になく、初期時必ずfalseを入れる
        let itemNameText = "";
        let iconText = "-";  // アイコン列は現状アイテム情報にないため、とりあえずハイフンを入れる　TODO：RIN
        let statusText = "";
        let textText = "";
        let rarityText = "";
        let costText = "";

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

        })

        // 取得した各値をテーブルに紐付け
        // カテゴリー別に紐付け先のテーブルを分ける
        if(categoryCheck == "武器"){
            tbody_weapon.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, iconText, rarityText, costText));
        }else if(categoryCheck == "アビリティ"){
            tbody_ability.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, iconText, rarityText, costText));
        }else if(categoryCheck == "サバイバル"){
            tbody_survival.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, iconText, rarityText, costText));
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
function appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText){
    // 選択列
    var td = document.createElement("td");
    td.classList.add("item-td");
    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = isCheck;
    td.appendChild(input);
    tr.appendChild(td);

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

    return tr;
}

// パワーリストをテーブルに紐づける関数
function linkPowerList(powerList) {
    let tbody = document.getElementById("power-table").querySelector("tbody");

    // 各パワーごとにループ
    for(let i=0; i<powerList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化 
        let isCheck = false;  // 選択列はパワー情報になく、初期時必ずfalseを入れる
        let powerNameText = "";
        let iconText = "-";  // アイコン列は現状パワー情報にないため、とりあえずハイフンを入れる　TODO：RIN
        let textText = "";

        // 各キーペアごとにループ
        Object.keys(powerList[i]).forEach(key => {

            // キー名がパワー名キーの場合
            if(powerNameKey == key) {

                // パワー名用変数に値を代入
                powerNameText = powerList[i][key];
            }

            // キー名がテキストキーの場合
            if(textKey == key) {

                // テキスト用変数に値を代入
                textText = powerList[i][key];
            }

        })

        // 取得した各値をテーブルに紐付け
        // 選択列
        var td = document.createElement("td");
        td.classList.add("power-td");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.checked = isCheck;
        td.appendChild(input);
        tr.appendChild(td);

        // パワー名列
        var td = document.createElement("td");
        td.textContent = powerNameText;
        td.classList.add("power-td");
        tr.appendChild(td);

        // アイコン列
        var td = document.createElement("td");
        td.textContent = iconText;
        td.classList.add("power-td");
        tr.appendChild(td);

        // テキスト列
        var td = document.createElement("td");
        td.textContent = textText;
        td.classList.add("power-td");
        tr.appendChild(td);

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
