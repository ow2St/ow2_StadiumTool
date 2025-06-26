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

// チェックされた行のデータを格納する配列
var selectedItemRowsData = [];
var selectedPowerRowsData = [];

// 各イベント発生対象取得
const itemCheckboxes = document.querySelectorAll(".item-checkbox");
const powerCheckboxes = document.querySelectorAll(".power-checkbox");

// 初期表示のために一度実行
updateSelectedItemsList();
updateSelectedPowerList()

// 各アイテムのチェックボックスにイベントリスナーを追加
itemCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selectedItemRowsDataBeforeLength = selectedItemRowsData.length;

        // チェックボックスの状態が変わる毎に選択リスト、ビルド欄を更新
        selectedItemRowsData = updateSelectedItemsList();
        updateBuild_Item(selectedItemRowsData);

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

        // チェックボックスの状態が変わる毎に選択リスト、ビルド欄を更新
        selectedPowerRowsData = updateSelectedPowerList();
        updateBuild_power(selectedPowerRowsData);

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

selectedBuildItem.addEventListener("click", (event) =>{
    if(event.target.classList.contains("selectedbuild-delete-button") && event.target.tagName =="SPAN"){
        // クリックされた場合に、アイコンを削除するイベント追加
        selectedItemRowsData = clickDeleteButton(event.target.id,selectedItemRowsData);
    }
});

selectedBuildpower.addEventListener("click", (event) =>{
    if(event.target.classList.contains("selectedbuild-delete-button") && event.target.tagName =="SPAN"){
        // クリックされた場合に、アイコンを削除するイベント追加
        selectedPowerRowsData = clickDeleteButton(event.target.id,selectedPowerRowsData);
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
        let iconText = "-";
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

        })

        // 取得した各値をテーブルに紐付け
        // カテゴリー別に紐付け先のテーブルを分ける
        if(categoryCheck == "武器"){
            tbody_weapon.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText));
        }else if(categoryCheck == "アビリティ"){
            tbody_ability.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText));
        }else if(categoryCheck == "サバイバル"){
            tbody_survival.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, statusText, textText, rarityText, costText));
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
        td.appendChild(iconImg);
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

//ビルド欄のパワーを更新する関数
function updateBuild_power(selectedPowerRows){

    for(let i=0; i<4; i++) {
        // 親要素を指定
        const targetDiv = document.getElementById("power" + String(i + 1))

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
            iconImg.classList.add("selectedbuild-item-icon");
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

// ✖ボタンクリック時にアイコンを削除する関数
function clickDeleteButton(spanId,selectedRows) {

    let index = Number(spanId.slice(-1)) - 1;
    const selectedRowsBeforeLength = selectedRows.length

    // IDに「item」が含まれる場合
    if(spanId.includes("item")){
        
        const itemName = selectedRows[index][itemNameKey];
        const category = selectedRows[index][categoryKey];
        //初期値は武器カテゴリを設定
        var tbody = document.getElementById("item-table-weapon").querySelector("tbody");;

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
        updateBuild_power(selectedRows);

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