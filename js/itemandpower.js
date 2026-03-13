// ------------------------------
// 処理部
// ------------------------------

// アイテムキー対応マッピング（英語 → 日本語）
const itemKeyMap = {
    id: ITEMLISTKEY.itemIdKey,
    itemname: ITEMLISTKEY.item_nameKey,
    category: ITEMLISTKEY.categoryKey,
    rarity: ITEMLISTKEY.rarityKey,
    cost: ITEMLISTKEY.costKey,
    icon: ITEMLISTKEY.item_iconKey,
    uniquehero: ITEMLISTKEY.uniqueHeroKey,
    text: ITEMLISTKEY.item_textKey,
    life: ITEMLISTKEY.item_lifeKey,
    armor: ITEMLISTKEY.item_armorKey,
    shield: ITEMLISTKEY.item_shieldKey,
    weaponpower: ITEMLISTKEY.weaponPowerKey,
    abilitypower: ITEMLISTKEY.abilityPowerKey,
    attackspeed: ITEMLISTKEY.attackSpeedKey,
    ctreducation: ITEMLISTKEY.ctReducationKey,
    ammo: ITEMLISTKEY.ammoKey,
    weaponlifesteal: ITEMLISTKEY.weapon_LifeStealKey,
    abilitylifesteal: ITEMLISTKEY.ability_LifeStealKey,
    speed: ITEMLISTKEY.speedKey,
    reloadspeed: ITEMLISTKEY.reloadSpeedKey,
    meleedamage: ITEMLISTKEY.item_meleeDamageKey,
    critical: ITEMLISTKEY.criticalKey,
    others: ITEMLISTKEY.othersKey,
    durationflg: ITEMLISTKEY.durationFlgKey,
    duration: ITEMLISTKEY.durationKey,
    theoreticalflag: ITEMLISTKEY.theoreticalFlgKey
};

// ガジェットキー対応マッピング
const gadgetKeyMap = {
    id: GADGETLISTKEY.gadget_idKey,
    gadgetname: GADGETLISTKEY.gadget_nameKey,
    rarity: GADGETLISTKEY.gadget_rarityKey,
    cost: GADGETLISTKEY.gadget_costKey,
    uniquehero: GADGETLISTKEY.gadget_uniqueHeroKey,
    CT: GADGETLISTKEY.gadget_coolTimeKey,
    icon: GADGETLISTKEY.gadget_iconKey,
    text: GADGETLISTKEY.gadget_textKey,
    life: GADGETLISTKEY.gadget_lifeKey,
    armor: GADGETLISTKEY.gadget_armorKey,
    shield: GADGETLISTKEY.gadget_shieldKey,
    weaponpower: GADGETLISTKEY.gadget_weaponPowerKey,
    abilitypower: GADGETLISTKEY.gadget_abilityPowerKey,
    attackspeed: GADGETLISTKEY.gadget_attackSpeedKey,
    ctreducation: GADGETLISTKEY.gadget_ctReducationKey,
    ammo: GADGETLISTKEY.gadget_ammoKey,
    weaponlifesteal: GADGETLISTKEY.gadget_weapon_LifeStealKey,
    abilitylifesteal: GADGETLISTKEY.gadget_ability_LifeStealKey,
    speed: GADGETLISTKEY.gadget_speedKey,
    others: GADGETLISTKEY.gadget_othersKey,
    durationflg: GADGETLISTKEY.gadget_durationFlgKey,
    duration: GADGETLISTKEY.gadget_durationKey,
    theoreticalflag: GADGETLISTKEY.gadget_theoreticalFlgKey
};

// パワーキー対応マッピング（英語 → 日本語）
const powerKeyMap = {
    powername: POWERLISTKEY.power_nameKey,
    hero: POWERLISTKEY.heroKey,
    icon: POWERLISTKEY.power_iconKey,
    text: POWERLISTKEY.power_textKey
};

// パラメータキー対応マッピング（英語 → 日本語）
const parameterKeyMap = {
    id: PARAMETERKEY.idKey,
    name: PARAMETERKEY.nameKey,
    value: PARAMETERKEY.valueKey
};

const accordionContainer = document.getElementById("accordion-container");

//タブ切り替え初期化
const tabItem = document.getElementById('tabItem');
const tabGadget = document.getElementById('tabGadget');
const tabPower = document.getElementById('tabPower');

const itemContent = document.getElementById("item-content");
const gadgetContent = document.getElementById("gadget-content");
const powerContent = document.getElementById("power-content");

let patchNotesApplied = false;

let itemAllData = []; // 全てのアイテムデータを保持
let gadgetAllData = []; // 全てのガジェットデータを保持
let powerAllData = []; // 全てのパワーデータを保持
let patchNoteAllData = []; // 全てのパッチノートデータを保持
let parameterAllData = []; // 全てのパラメータデータを保持

// ソート基準の定義
const sortingCriteria = [
    { column: "itemName", type: "string" },
    { column: "gadgetName", type: "string" },
    { column: "powerName", type: "string" },
    { column: "rarity", type: "string" },
    { column: "cost", type: "number" }
]

let sortDirection = new Array(8).fill(null);

try {
    loadAndInitData();
} catch(error) {
    console.error(ERRORMESSAGEKEY.dataRoadError);
}

// ------------------------------
// 関数部
// ------------------------------

/** データの読み込みと初期化を行う非同期関数
 * @return {Promise<void>} - 非同期処理の完了を示すPromise
*/
async function loadAndInitData() {
    // データの読み込み(itemList)
    const [itemData, gadgetData, powerData, parameterData, patchNoteData] = await Promise.all([
        // データの読み込み(itemList)
        fetch("itemListData.json").then(response => response.json()),

        // データの読み込み(gadgetList)
        fetch("gadgetListData.json").then(response => response.json()),

        // データの読み込み(powerList)
        fetch("powerListData.json").then(response => response.json()),

        // データの読み込み(parameter)
        fetch("parameterData.json").then(response => response.json()),

        // データの読み込み(patchNoteData)
        fetch("patchNoteData.json").then(response => response.json())
    ]);
    itemAllData = itemData;
    gadgetAllData = gadgetData;
    powerAllData = powerData;
    patchNoteAllData = patchNoteData;
    parameterAllData = parameterData;

    //初期データをカテゴリー順に並び替え
    // 並び替え優先順位を定義
    const categoryOrder = [CATEGORYELEMENTS.weapon, CATEGORYELEMENTS.ability, CATEGORYELEMENTS.survival];

    itemAllData.sort((a, b) => {
    // categoryOrder内でのインデックスを取得
    const indexA = categoryOrder.indexOf(a.category);
    const indexB = categoryOrder.indexOf(b.category);

    // indexが見つからない（＝該当しないカテゴリ）場合は末尾へ
    const orderA = indexA === -1 ? categoryOrder.length : indexA;
    const orderB = indexB === -1 ? categoryOrder.length : indexB;

    // 比較して順序を返す
    return orderA - orderB;
    });

    //リスト初期化
    let itemList = [];
    let gadgetList = [];
    let powerList = [];
    let parameterList = [];

    // 整形 → キー変換
    try {
        itemList = convertKeys(organizeItemData(itemAllData), itemKeyMap);
        gadgetList = convertKeys(organizeGadgetData(gadgetAllData), gadgetKeyMap);
        powerList = convertKeys(organizePowerData(powerAllData), powerKeyMap);
        parameterList = convertKeys(organizeParameterData(parameterAllData), parameterKeyMap);
    } catch(error) {
        console.error(ERRORMESSAGEKEY.dataConvertError, error);
    }
    //パラメータ設定
    tracerHPUPscalefactor = Number(parameterList.find(param => param[PARAMETERKEY.idKey] === PARAMETERID.TracerHPUPscalefactorID)?.[PARAMETERKEY.valueKey]);

    // 各リストをテーブルに紐づけ
    try {
        linkItemList(itemList);
        linkGadgetList(gadgetList);
        linkPowerList(powerList);
    } catch(error) {
        console.error(ERRORMESSAGEKEY.dataLinkError, error);
    }
    // パッチノート適用
    applyPatchNotesIfReady();

    //アイテム・ガジェットリスト、コストのキャッシュアイコン等初期表示
    try {
        const cost_itemTh = document.querySelector("th#cost.item-th");
        const cost_gadgetTh = document.querySelector("th#cost.IGP_gadget-th");
        addCostDivAndSpan(cost_itemTh);
        addCostDivAndSpan(cost_gadgetTh);
    } catch(error) {
        console.error(ERRORMESSAGEKEY.cashIconError, error);
    }

    //ヒーロー専用アイテム　初期状態OFF
    const heroButtonDva = document.getElementById("D.VA-item");
    heroButtonDva.onclick();

    //テキスト検索にて、エンターキーと検索ボタンのクリックを紐づける
    const searches = document.querySelectorAll('input[type="search"]');
    searches.forEach(input => {
        input.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();   // フォーム送信防止（重要）

                switch (input.id) {
                    case "item_search-input":
                        item_searchWords();
                        break;
                    case "gadget_search-input":
                        gadget_searchWords();
                        break;
                    case "power_search-input":
                        power_searchWords();
                        break;
                    default:
                        console.error(ERRORMESSAGEKEY.unexpectedStatus, input.id);
                }
            }
        });
    });
}

//#region データ変換
/**itemList に　itemListData.json　から貰うデータの形を決める
 * @param {object} itemAllData - 全てのアイテムデータ
 * @return {object} 選択・並び替え後のアイテムデータ
 */
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
            others: (Ilist.others === "-") ? Ilist.others : STATUSELEMENTS.others_sign + Ilist.others,
            durationflg: Ilist.durationflg,
            duration: Ilist.duration,
            theoreticalflag: Ilist.theoreticalflag

        };
    })
    return selectedData;
}

/**gadgetList に　gadgetListData.json　から貰うデータの形を決める
 * @param {object} gadgetAllData - 全てのガジェットデータ
 * @return {object} 選択・並び替え後のガジェットデータ
 */
function organizeGadgetData(gadgetAllData) {
    const selectedData = gadgetAllData
    .map(Glist => {
        return {
            id: Glist.id,
            gadgetname: Glist.gadgetname,
            rarity: Glist.rarity,
            cost: Glist.cost,
            uniquehero: Glist.uniquehero,
            CT: Glist.CT,
            icon: Glist.icon,
            text: Glist.text,
            life: Glist.life,
            armor: Glist.armor,
            shield: Glist.shield,
            weaponpower: Glist.weaponpower,
            abilitypower: Glist.abilitypower,
            attackspeed: Glist.attackspeed,
            ctreducation: Glist.ctreducation,
            ammo: Glist.ammo,
            weaponlifesteal: Glist.weaponlifesteal,
            abilitylifesteal: Glist.abilitylifesteal,
            speed: Glist.speed,
            others: (Glist.others === "-") ? Glist.others : STATUSELEMENTS.others_sign + Glist.others,
            durationflg: Glist.durationflg,
            duration: Glist.duration,
            theoreticalflag: Glist.theoreticalflag
        };
    })
    return selectedData;
}

/**powerList に　powerListData.json　から貰うデータの形を決める
 * @param {object} powerAllData - 全てのパワーデータ
 * @return {object} 選択・並び替え後のパワーデータ
 */

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

/**
 * paramterData に　parameterData.json　から貰うデータの形を決める
 * @param {object} parameterData 読み込んだ全てのパラメータデータ
 * @return {object}　selectedData　整形後のパラメータデータ
 */
function organizeParameterData(parameterData) {
    const selectedData = parameterData
    .map(Plist => {
        return {
            id: Plist.id,
            name: Plist.name,
            value: Plist.value
        };
    })
    return selectedData;
}

/**英名キーを日本名キーへ変換処理
 * @param {object} dataArray - 選択・並び替え後のデータ
 * @param {object} keyMap - キー対応マッピング
 * @return {object} 日本名キーに変換後のデータ
 */
function convertKeys(dataArray, keyMap) {
    return dataArray.map(obj => {
        let newObj = {};
        for (let key in obj) {
            let newKey = keyMap[key] || key; // 対応がないキーはそのまま
            newObj[newKey] = obj[key];
        }
        return newObj;
    });
}
//#endregion データ変換

//#region タブ切り替え
/**アイテムタブへ移動 */
function changeTabItem() {
    tabItem.classList.add("tabItem-on");
    tabItem.classList.remove("tabItem-off");
    itemContent.style.display = "block";

    tabGadget.classList.add("tabGadget-off");
    tabGadget.classList.remove("tabGadget-on");
    gadgetContent.style.display = "none";

    tabPower.classList.add("tabPower-off");
    tabPower.classList.remove("tabPower-on");
    powerContent.style.display = "none";
}
/**ガジェットタブへ移動 */
function changeTabGadget() {
    tabGadget.classList.add("tabGadget-on");
    tabGadget.classList.remove("tabGadget-off");
    gadgetContent.style.display = "block";

    tabItem.classList.add("tabItem-off");
    tabItem.classList.remove("tabItem-on");
    itemContent.style.display = "none";

    tabPower.classList.add("tabPower-off");
    tabPower.classList.remove("tabPower-on");
    powerContent.style.display = "none";
}
/**パワータブへ移動 */
function changeTabPower() {
    if(document.getElementById("tabPower").classList.contains("tabPower-on")) {
        //すでにパワータブがONのときは何も処理しない
        return;
    }

    tabPower.classList.add("tabPower-on");
    tabPower.classList.remove("tabPower-off");
    powerContent.style.display = "block";

    tabItem.classList.add("tabItem-off");
    tabItem.classList.remove("tabItem-on");
    itemContent.style.display = "none";

    tabGadget.classList.add("tabGadget-off");
    tabGadget.classList.remove("tabGadget-on");
    gadgetContent.style.display = "none";

    //パワー一覧　D.VAアイコンをONにする
    let defaultHero = document.getElementById("D.VA-power");
    if(defaultHero.classList.contains("power-hero-icon-on")) {
        //すでにアイコンがONのときは何も処理しない
        return;
    }

    filterPowerTable(defaultHero);
}
//#endregion タブ切り替え

//#region 各テーブル紐づけ
/**アイテムリストをテーブルに紐づける関数
 * @param {object} itemList - アイテムデータの配列
 * @return {void}
 */
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
        let idText = "";

        // 各キーペアごとにループ
        Object.keys(itemList[i]).forEach(key => {

            // キー名がアイテム名キーの場合
            if(ITEMLISTKEY.item_nameKey == key) {

                // アイテム名用変数に値を代入
                itemNameText = itemList[i][key];
            }

            // キー名がアイコンキーの場合
            if(ITEMLISTKEY.item_iconKey == key) {

                // アイコン用変数に値を代入
                iconText = itemList[i][key];
            }

            // キー名がカテゴリーキーの場合
            if(ITEMLISTKEY.categoryKey == key) {

                // カテゴリー用変数に値を代入
                categoryText = itemList[i][key];
            }

            // キー名がレアリティキーの場合
            if(ITEMLISTKEY.rarityKey == key) {

                // レアリティ用変数に値を代入
                rarityText = itemList[i][key];
            }

             // キー名がコストキーの場合
            if(ITEMLISTKEY.costKey == key) {

                // コスト用変数に値を代入
                costText = itemList[i][key];
            }

             // キー名が固有ヒーローキーの場合
            if(ITEMLISTKEY.uniqueHeroKey == key) {

                // 固有ヒーロー用変数に値を代入
                uniqueHeroText = itemList[i][key];
            }

            // キー名がIDキーの場合
            if(ITEMLISTKEY.itemIdKey == key) {

                // ID用変数に値を代入
                idText = itemList[i][key];
            }

            // キー名がテキストキーの場合
            if(ITEMLISTKEY.item_textKey == key) {

                // テキスト用変数に値を代入
                textText = itemList[i][key];
            }

            // キー名がステータス関連のキーの場合
            if([ITEMLISTKEY.item_lifeKey, ITEMLISTKEY.item_armorKey, ITEMLISTKEY.item_shieldKey, ITEMLISTKEY.weaponPowerKey, ITEMLISTKEY.abilityPowerKey,
                ITEMLISTKEY.attackSpeedKey, ITEMLISTKEY.ctReducationKey, ITEMLISTKEY.ammoKey, ITEMLISTKEY.weapon_LifeStealKey,
                ITEMLISTKEY.ability_LifeStealKey, ITEMLISTKEY.speedKey, ITEMLISTKEY.reloadSpeedKey, ITEMLISTKEY.item_meleeDamageKey,
                ITEMLISTKEY.criticalKey].includes(key)) {

                // 値が0でない場合
                if(itemList[i][key] != 0) {
                    statusText = statusText + key + "+" + String(itemList[i][key]) + "\n";
                }
            }

            // キー名がその他キーの場合
            if(ITEMLISTKEY.othersKey == key) {

                // 値が"-"でない場合
                if(itemList[i][key] != "-") {
                    statusText = statusText + String(itemList[i][key]);
                    statusText = statusText.replaceAll(",", "\n");
                }
            }

            // キー名がテキストキーの場合
            if(ITEMLISTKEY.item_textKey == key) {

                // テキスト用変数に値を代入
                textText = itemList[i][key];
            }
        })

        //ステータスアイコン設定
        let statusIcons = [];
        let statusLists = (statusText || "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);

        statusLists.forEach((status, i) => {

            //アイコン付与
            switch(true) {
                case status.includes(STATUSELEMENTS.life_includes):
                    statusIcons.push(STATUSICON.life);
                    break;

                case status.includes(STATUSELEMENTS.armor):
                    statusIcons.push(STATUSICON.armor);
                    break;

                case status.includes(STATUSELEMENTS.shield):
                    statusIcons.push(STATUSICON.shield);
                    break;

                case status.includes(STATUSELEMENTS.weaponPower):
                    statusIcons.push(STATUSICON.weaponPower);
                    break;

                case status.includes(STATUSELEMENTS.abilityPower):
                    statusIcons.push(STATUSICON.abilityPower);
                    break;

                case status.includes(STATUSELEMENTS.attackSpeed):
                    statusIcons.push(STATUSICON.attackSpeed);
                    break;

                case status.includes(STATUSELEMENTS.ctReducation):
                    statusIcons.push(STATUSICON.ctReducation);
                    break;

                case status.includes(STATUSELEMENTS.ammo):
                    statusIcons.push(STATUSICON.ammo);
                    break;

                case status.includes(STATUSELEMENTS.weapon_LifeSteal):
                    statusIcons.push(STATUSICON.weapon_LifeSteal);
                    break;

                case status.includes(STATUSELEMENTS.ability_LifeSteal):
                    statusIcons.push(STATUSICON.ability_LifeSteal);
                    break;

                case status.includes(STATUSELEMENTS.speed):
                    statusIcons.push(STATUSICON.speed);
                    break;

                case status.includes(STATUSELEMENTS.reloadSpeed):
                    statusIcons.push(STATUSICON.reloadSpeed);
                    break;

                case status.includes(STATUSELEMENTS.meleeDamage):
                    statusIcons.push(STATUSICON.meleeDamage);
                    break;

                case status.includes(STATUSELEMENTS.critical):
                    statusIcons.push(STATUSICON.critical);
                    break;

                case status.includes(STATUSELEMENTS.others_sign):
                    statusIcons.push(STATUSICON.others);
                    //テキストから※を削除
                    statusLists[i] = status.replace(STATUSELEMENTS.others_sign,"");
                    break;

                default:
                    console.error(ERRORMESSAGEKEY.unexpectedStatus, status);
            }
        });

        //体力アップ系トレーサー専用アイテムの数値減算処理
        if(uniqueHeroText == HERONAME.tracer){
            statusLists.forEach((status, i) => {
                switch(true){

                    //ライフ+の場合
                    case status.includes(STATUSELEMENTS.life_includes):
                        //文字列→数値変換＆減算
                        status = Number(status.replace(STATUSELEMENTS.life_includes, "")) * tracerHPUPscalefactor;
                        //四捨五入
                        status = String(Math.round(status));
                        //文字列へ再結合
                        statusLists[i] = STATUSELEMENTS.life_includes + status;
                        break;
                    //アーマー
                    case status.includes(STATUSELEMENTS.armor):
                        //文字列→数値変換＆減算
                        status = Number(status.replace(STATUSELEMENTS.armor,"+", "")) * tracerHPUPscalefactor;
                        //四捨五入
                        status = String(Math.round(status));
                        //文字列へ再結合
                        statusLists[i] = STATUSELEMENTS.armor + "+" + status;
                        break;
                    //シールド
                    case status.includes(STATUSELEMENTS.shield):
                        //文字列→数値変換＆減算
                        status = Number(status.replace(STATUSELEMENTS.shield,"+", "")) * tracerHPUPscalefactor;
                        //四捨五入
                        status = String(Math.round(status));
                        //文字列へ再結合
                        statusLists[i] = STATUSELEMENTS.shield + "+" + status;
                        break;
                }
            });
        }

    tbody.appendChild(appendChildItemList(tr, itemNameText, iconText, categoryText, rarityText, costText, uniqueHeroText, textText, idText, statusLists, statusIcons));

    tr.classList.add("table-on");
    }
}

/**アイテムリスト用子要素作成関数
 * @param {object} tr - 行要素
 * @param {string} itemNameText - アイテム名
 * @param {string} iconText - アイコン
 * @param {string} categoryText - カテゴリー
 * @param {string} rarityText - レアリティ
 * @param {number} costText - コスト
 * @param {string} uniqueHeroText - 固有ヒーロー(非表示)
 * @param {string} textText - 説明文
 * @param {string} idText - アイテムID（非表示）
 * @param {Array} statusLists - ステータスリスト
 * @param {Array} statusIcons - ステータスアイコンリスト
 * @return {object} - 作成した行要素
 */
function appendChildItemList(tr, itemNameText, iconText, categoryText, rarityText, costText, uniqueHeroText, textText, idText, statusLists, statusIcons){

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

    for (let i = 0; i < statusLists.length; i++) {
        // ステータスごとのdiv
        let statusDiv = document.createElement("div");

        // アイコン作成
        let iconImg = document.createElement("img");
        iconImg.src = statusIcons[i];
        iconImg.classList.add("itemandpower-statusicon");

        // テキスト作成
        let textSpan = document.createElement("span");
        textSpan.innerText = statusLists[i];

        // まとめて追加
        statusDiv.appendChild(iconImg);
        statusDiv.appendChild(textSpan);

        // tdに追加
        td.appendChild(statusDiv);
    }

    td.classList.add("item-td");
    tr.appendChild(td);


    // テキスト列
    var td = document.createElement("td");
    td.textContent = textText;
    td.classList.add("item-td");
    tr.appendChild(td);

    // アイテムID列（非表示）
    var td = document.createElement("td");
    td.textContent = idText;
    td.classList.add("hidden-column");
    tr.appendChild(td);

    // 変更履歴列
    var td = document.createElement("td");
    td.classList.add("item-td", "itemandpower-history");
    tr.appendChild(td);

    return tr;
}

/**ガジェットリストをテーブルに紐づける関数
 * @param {object} gadgetList - ガジェットデータの配列
 * @return {void}
 */
function linkGadgetList(gadgetList) {
    let tbody = document.getElementById("gadget-table").querySelector("tbody");

    // 各ガジェットごとにループ
    for(let i=0; i<gadgetList.length; i++) {
        var tr = document.createElement("tr");

        // 必要な列ごとの変数を初期化
        let gadgetNameText = "";
        let iconText = "";
        let rarityText = "";
        let costText = "";
        let coolTimeText = "";
        let statusText = "";
        let textText = "";
        let idText = "";

        // 各キーペアごとにループ
        Object.keys(gadgetList[i]).forEach(key => {

            // キー名がガジェット名キーの場合
            if(GADGETLISTKEY.gadget_nameKey == key) {

                // ガジェット名用変数に値を代入
                gadgetNameText = gadgetList[i][key];
            }

            // キー名がアイコンキーの場合
            if(GADGETLISTKEY.gadget_iconKey == key) {
                // アイコン用変数に値を代入
                iconText = gadgetList[i][key];
            }

            // キー名がレアリティキーの場合
            if(GADGETLISTKEY.gadget_rarityKey == key) {

                // レアリティ用変数に値を代入
                rarityText = gadgetList[i][key];
            }

             // キー名がコストキーの場合
            if(GADGETLISTKEY.gadget_costKey == key) {
                // コスト用変数に値を代入
                costText = gadgetList[i][key];
            }

             // キー名が固有ヒーローキーの場合
            if(GADGETLISTKEY.gadget_uniqueHeroKey == key) {

                // 固有ヒーロー用変数に値を代入
                uniqueHeroText = gadgetList[i][key];
            }

             // キー名がクールタイムキーの場合
            if(GADGETLISTKEY.gadget_coolTimeKey == key) {

                // クールタイム用変数に値を代入
                coolTimeText = gadgetList[i][key];
            }

            // キー名がIDキーの場合
            if(GADGETLISTKEY.gadget_idKey == key) {
                // ID用変数に値を代入
                idText = gadgetList[i][key];
            }

            // キー名がテキストキーの場合
            if(GADGETLISTKEY.gadget_textKey == key) {

                // テキスト用変数に値を代入
                textText = gadgetList[i][key];
            }

            // キー名がステータス関連のキーの場合
            if([GADGETLISTKEY.gadget_lifeKey, GADGETLISTKEY.gadget_armorKey, GADGETLISTKEY.gadget_shieldKey, GADGETLISTKEY.gadget_weaponPowerKey, GADGETLISTKEY.gadget_abilityPowerKey,
                GADGETLISTKEY.gadget_attackSpeedKey, GADGETLISTKEY.gadget_ctReducationKey, GADGETLISTKEY.gadget_ammoKey, GADGETLISTKEY.gadget_weapon_LifeStealKey,
                GADGETLISTKEY.gadget_ability_LifeStealKey, GADGETLISTKEY.gadget_speedKey].includes(key)) {

                // 値が0でない場合
                if(gadgetList[i][key] != 0) {
                    statusText = statusText + key + "+" + String(gadgetList[i][key]) + "\n";
                }
            }

            // キー名がその他キーの場合
            if(GADGETLISTKEY.gadget_othersKey == key) {

                // 値が"-"でない場合
                if(gadgetList[i][key] != "-") {
                    statusText = statusText + String(gadgetList[i][key]);
                    statusText = statusText.replaceAll(",", "\n");
                }
            }

            // キー名がテキストキーの場合
            if(GADGETLISTKEY.gadget_textKey == key) {

                // テキスト用変数に値を代入
                textText = gadgetList[i][key];
            }
        })

        //ステータスアイコン設定
        let statusIcons = [];
        let statusLists = (statusText || "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);

        statusLists.forEach((status, i) => {

            //その他（特殊効果）以外のアイコン付与
            if(!status.includes(STATUSELEMENTS.others_sign)){
                switch(true) {
                    case status.includes(STATUSELEMENTS.life_includes):
                        statusIcons.push(STATUSICON.life);
                        break;

                    case status.includes(STATUSELEMENTS.armor):
                        statusIcons.push(STATUSICON.armor);
                        break;

                    case status.includes(STATUSELEMENTS.shield):
                        statusIcons.push(STATUSICON.shield);
                        break;

                    case status.includes(STATUSELEMENTS.weaponPower):
                        statusIcons.push(STATUSICON.weaponPower);
                        break;

                    case status.includes(STATUSELEMENTS.abilityPower):
                        statusIcons.push(STATUSICON.abilityPower);
                        break;

                    case status.includes(STATUSELEMENTS.attackSpeed):
                        statusIcons.push(STATUSICON.attackSpeed);
                        break;

                    case status.includes(STATUSELEMENTS.ctReducation):
                        statusIcons.push(STATUSICON.ctReducation);
                        break;

                    case status.includes(STATUSELEMENTS.ammo):
                        statusIcons.push(STATUSICON.ammo);
                        break;

                    case status.includes(STATUSELEMENTS.weapon_LifeSteal):
                        statusIcons.push(STATUSICON.weapon_LifeSteal);
                        break;

                    case status.includes(STATUSELEMENTS.ability_LifeSteal):
                        statusIcons.push(STATUSICON.ability_LifeSteal);
                        break;

                    case status.includes(STATUSELEMENTS.speed):
                        statusIcons.push(STATUSICON.speed);
                        break;

                    case status.includes(STATUSELEMENTS.reloadSpeed):
                        statusIcons.push(STATUSICON.reloadSpeed);
                        break;

                    case status.includes(STATUSELEMENTS.meleeDamage):
                        statusIcons.push(STATUSICON.meleeDamage);
                        break;

                    case status.includes(STATUSELEMENTS.critical):
                        statusIcons.push(STATUSICON.critical);
                        break;
                }

            //その他（特殊効果）の場合
            }else if(status.includes(STATUSELEMENTS.others_sign)){
                statusIcons.push(STATUSICON.others);

                //テキストから※を削除
                statusLists[i] = status.replace(STATUSELEMENTS.others_sign,"");
            }
        });

    tbody.appendChild(appendChildGadgetList(tr, gadgetNameText, iconText, rarityText, costText, uniqueHeroText, coolTimeText, textText, idText, statusLists, statusIcons));

    tr.classList.add("table-on");
    }
}

/**ガジェットリスト用子要素作成関数
 * @param {object} tr - 行要素
 * @param {string} gadgetNameText - ガジェット名
 * @param {string} iconText - アイコン
 * @param {string} rarityText - レアリティ
 * @param {number} costText - コスト
 * @param {string} uniqueHeroText - 固有ヒーロー(非表示)
 * @param {string} coolTimeText - クールタイム
 * @param {string} textText - 説明文
 * @param {string} idText - アイテムID（非表示）
 * @param {Array} statusLists - ステータスリスト
 * @param {Array} statusIcons - ステータスアイコンリスト
 * @return {object} - 作成した行要素
 */
function appendChildGadgetList(tr, gadgetNameText, iconText, rarityText, costText, uniqueHeroText, coolTimeText, textText, idText, statusLists, statusIcons){

    // ガジェット名列
    var td = document.createElement("td");
    var div = document.createElement("div");
    // 中のアイコン
    var iconImg = document.createElement("img");
    iconImg.src = "assets/images/icons/gadget/" + iconText;
    iconImg.classList.add("itemandpower-itemicon");
    // 中のガジェット名とヒーロー名
    var text = document.createElement("span");
    var textTmp = gadgetNameText + "\n\n" + "ヒーロー：" + uniqueHeroText;
    text.innerHTML = textTmp.replace(/\n/g, "<br>");;
    div.appendChild(iconImg);
    div.appendChild(text);
    div.classList.add("name-table");
    td.appendChild(div);
    td.classList.add("IGP_gadget-td");
    tr.appendChild(td);

    div.appendChild(iconImg);
    div.appendChild(text);
    div.classList.add("name-table");
    td.appendChild(div);
    td.classList.add("IGP_gadget-td");
    tr.appendChild(td);

    // レアリティ列
    var td = document.createElement("td");
    td.textContent = rarityText;
    td.classList.add("IGP_gadget-td");
    tr.appendChild(td);

    // コスト列
    var td = document.createElement("td");
    td.textContent = costText;
    td.classList.add("IGP_gadget-td");
    tr.appendChild(td);

    // 固有ヒーロー列（非表示）
    var td = document.createElement("td");
    td.classList.add("hidden-column");
    tr.appendChild(td);

    // クールタイム列
    var td = document.createElement("td");
    td.textContent = coolTimeText + "秒";
    td.classList.add("IGP_gadget-td");
    tr.appendChild(td);


    // ステータス列
    var td = document.createElement("td");

    for (let i = 0; i < statusLists.length; i++) {
        // ステータスごとのdiv
        let statusDiv = document.createElement("div");

        // アイコン作成
        let iconImg = document.createElement("img");
        iconImg.src = statusIcons[i];
        iconImg.classList.add("itemandpower-statusicon");

        // テキスト作成
        let textSpan = document.createElement("span");
        textSpan.innerText = statusLists[i];

        // まとめて追加
        statusDiv.appendChild(iconImg);
        statusDiv.appendChild(textSpan);

        // tdに追加
        td.appendChild(statusDiv);
    }

    td.classList.add("IGP_gadget-td");
    tr.appendChild(td);


    // テキスト列
    var td = document.createElement("td");
    td.textContent = textText;
    td.classList.add("IGP_gadget-td");
    tr.appendChild(td);

    // アイテムID列（非表示）
    var td = document.createElement("td");
    td.textContent = idText;
    td.classList.add("hidden-column");
    tr.appendChild(td);

    // 変更履歴列
    var td = document.createElement("td");
    td.classList.add("IGP_gadget-td", "itemandpower-history");
    tr.appendChild(td);

    return tr;
}

/** パワーリストをテーブルに紐づける関数
 * @param {object} powerList - パワーデータの配列
 * @return {void}
 */
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
            if(POWERLISTKEY.power_nameKey == key) {

                // パワー名用変数に値を代入
                powerNameText = powerList[i][key];
            }

            // キー名がアイコンキーの場合
            if(POWERLISTKEY.power_iconKey == key) {

                // アイコン用変数に値を代入
                iconText = powerList[i][key];
            }

            // キー名がヒーローキーの場合
            if(POWERLISTKEY.heroKey == key) {

                // ヒーロー用変数に値を代入
                heroText = powerList[i][key];
            }
            // キー名がテキストキーの場合
            if(POWERLISTKEY.power_textKey == key) {

                // テキスト用変数に値を代入
                textText = powerList[i][key];
            }
        })

    tbody.appendChild(appendChildPowerList(tr, powerNameText, iconText, heroText, textText));
    tr.classList.add("table-off"); //アイテムテーブルと違い、パワーテーブルは初期表示が非表示の為（D.VA以外）
    }
}

/** パワーリスト用子要素作成関数
 * @param {object} tr - 対象の行要素
 * @param {string} powerNameText - パワー名
 * @param {string} iconText - アイコン
 * @param {string} heroText - ヒーロー
 * @param {string} textText - 説明文
 * @return {object} - 作成した行要素
 */
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

    // 変更履歴列
    var td = document.createElement("td");
    td.classList.add("item-td", "itemandpower-history");
    tr.appendChild(td);

    return tr;
}
//#endregion 各テーブル紐づけ

// #region 絞り込み
/** 絞り込み条件を更新する関数（アイテム）
 * @param {HTMLElement} elem - 変更対象の要素(押されたボタンやアイコン)
 * @return {void}
 */
function filterItemTable(elem){

    try {
        // 絞り込みボタンのON/OFF切り替え
        const tag = elem.tagName.toLowerCase();
        let isNowOn;
        if (tag === "button") {
            isNowOn = elem.classList.contains("button-on");
            elem.classList.toggle("button-on", !isNowOn);
            elem.classList.toggle("button-off", isNowOn);
        } else if (tag === "img") {
            isNowOn = elem.classList.contains("item-hero-icon-on");
            elem.classList.toggle("item-hero-icon-on", !isNowOn);
            elem.classList.toggle("item-hero-icon-off", isNowOn);
        }

        // 各絞り込み一覧を取得
        const buttons_category = document.querySelectorAll("#button-category button");
        const buttons_rarity = document.querySelectorAll("#item_button-rarity button");
        const buttons_status = document.querySelectorAll("#item_button-status button");
        const buttons_hero = document.querySelectorAll("#button-hero img");

        // テーブルのヘッダー行（<tr>）を取得
        const headerRow = document.querySelector("#item-table thead tr");

        // 各 <th> 要素を配列として取得
        const headers = Array.from(headerRow.querySelectorAll("th"));

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

            let shouldShow = true;  // 表示判定フラグ （カテゴリー・レアリティ・ヒーローは単一選択のため共通管理）
            let shouldShowStatus = false;  // ステータス判定用フラグ （ステータスは複数選択可能なため別途管理）

            // ヒーロー関連
            buttons_hero.forEach(button =>{
                // アイコンがOFFの場合
                if(button.className == "item-hero-icon-off" && shouldShow){
                    shouldShow = !(cells[ITEMTHINDEX.uniqueHero]?.innerText + "-item" == button.id);
                }
            });

            // カテゴリー関連
            buttons_category.forEach(button =>{
                // ボタンがOFFの場合
                if(button.className == "button-off" && shouldShow){
                    shouldShow = !(cells[ITEMTHINDEX.category]?.innerText == button.innerText);
                }
            });

            // レアリティ関連
            buttons_rarity.forEach(button =>{

                // ボタンがOFFの場合
                if(button.className == "button-off" && shouldShow){
                    shouldShow = !(cells[ITEMTHINDEX.rarity]?.innerText == button.innerText);
                }
            });

            // ステータス関連
            buttons_status.forEach(button => {
                const statusList = cells[ITEMTHINDEX.status]?.innerText.split("\n").map(s => s.trim());

                // ボタンがONの場合
                if(button.className == "button-on" && !shouldShowStatus){

                    // ライフはライフ吸収と重複するので専用処理
                    if(button.innerText == "ライフ"){
                        shouldShowStatus = statusList.some(status => status.includes("ライフ+"));
                    // その他専用処理
                    }else if(button.innerText == "その他"){
                        const imgs = cells[ITEMTHINDEX.status].querySelectorAll("img");
                        const otherImg = Array.from(imgs).map(img => decodeURIComponent(img.src.split('/').pop()));

                        if (otherImg.some(src => src.includes(STATUSICON.sort_others))) {
                            shouldShowStatus = true;
                        } else {
                            shouldShowStatus = false;
                        }
                        // ステータスのセルになにもないアイテムはその他ボタンと連動
                        if(cells[ITEMTHINDEX.status].innerText === "" || cells[ITEMTHINDEX.status].innerText === null
                            || cells[ITEMTHINDEX.status].innerText === undefined){
                            shouldShowStatus = true;
                        }
                    }else{
                        shouldShowStatus = statusList.some(status => status.includes(button.innerText));
                    }
                    //体力系割合アップ系(MEKA Zシリーズなど)専用処理
                    if((cells[ITEMTHINDEX.id]?.innerText == mekaZID || cells[ITEMTHINDEX.id]?.innerText == hukutuID)
                    && (button.innerText == "ライフ" || button.innerText == "アーマー" || button.innerText == "シールド")){
                        shouldShowStatus = true;
                    }

                }
            });

            if(shouldShow && shouldShowStatus){
                tr.classList.add("table-on");
            }else{
                tr.classList.add("table-off");
            }
        });
    } catch (error) {
        console.error(ERRORMESSAGEKEY.dataFilterError + " : item : " + elem.id, error);
    }
}

/** 絞り込み条件を更新する関数（ガジェット）
 * @param {HTMLElement} elem - 変更対象の要素(押されたボタン)
 * @return {void}
 */
function filterGadgetTable(elem){

    try {
        // 絞り込みボタンのON/OFF切り替え
        let isNowOn;
        isNowOn = elem.classList.contains("button-on");
        elem.classList.toggle("button-on", !isNowOn);
        elem.classList.toggle("button-off", isNowOn);

        // 各絞り込み一覧を取得
        const buttons_rarity = document.querySelectorAll("#gadget_button-rarity button");
        const buttons_status = document.querySelectorAll("#gadget_button-status button");

        // テーブルのヘッダー行（<tr>）を取得
        const headerRow = document.querySelector("#gadget-table thead tr");

        // 各 <th> 要素を配列として取得
        const headers = Array.from(headerRow.querySelectorAll("th"));

        //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_gadget に配列のように格納。各行を1つのガジェットとする。
        var tbody_gadget = document.getElementById("gadget-table").querySelector("tbody");
        var rows_gadget = tbody_gadget.querySelectorAll("tr");

        // 行ごとの絞り込み
        // ガジェット行をループ
        rows_gadget.forEach(tr => {
            const cells = tr.querySelectorAll("td");

            // 毎回クラスを初期化
            tr.classList.remove("table-on");
            tr.classList.remove("table-off");

            let shouldShow = true;  // 表示判定フラグ (レアリティ)
            let shouldShowStatus = false;  // ステータス判定用フラグ （ステータスは複数選択可能なため別途管理）

            // レアリティ関連
            buttons_rarity.forEach(button =>{

                // ボタンがOFFの場合
                if(button.className == "button-off" && shouldShow){
                    shouldShow = !(cells[GADGETTHINDEX.rarity]?.innerText == button.innerText);
                }
            });

            // ステータス関連
            buttons_status.forEach(button => {
                const statusList = cells[GADGETTHINDEX.status]?.innerText.split("\n").map(s => s.trim());

                // ボタンがONの場合
                if(button.className == "button-on" && !shouldShowStatus){

                    // ライフはライフ吸収と重複するので専用処理
                    if(button.innerText == "ライフ"){
                        shouldShowStatus = statusList.some(status => status.includes("ライフ+"));
                    // その他専用処理
                    }else if(button.innerText == "その他"){
                        const imgs = cells[GADGETTHINDEX.status].querySelectorAll("img");
                        const otherImg = Array.from(imgs).map(img => decodeURIComponent(img.src.split('/').pop()));

                        if (otherImg.some(src => src.includes(STATUSICON.sort_others))) {
                            shouldShowStatus = true;
                        } else {
                            shouldShowStatus = false;
                        }
                        // ステータスのセルになにもないアイテムはその他ボタンと連動
                        if(cells[GADGETTHINDEX.status].innerText === "" || cells[GADGETTHINDEX.status].innerText === null
                            || cells[GADGETTHINDEX.status].innerText === undefined){
                            shouldShowStatus = true;
                        }
                    }else{
                        shouldShowStatus = statusList.some(status => status.includes(button.innerText));
                    }
                }
            });

            if(shouldShow && shouldShowStatus){
                tr.classList.add("table-on");
            }else{
                tr.classList.add("table-off");
            }
        });
    } catch (error) {
        console.error(ERRORMESSAGEKEY.dataFilterError + " : gadget : " + elem.id, error);
    }
}

/** 絞り込み条件を更新する関数（パワー）
 * @param {HTMLElement} elem - 対象の要素(押されたヒーローアイコン)
 * @return {void}
 */
function filterPowerTable(elem){

    try {
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
                    shouldShow = !(cells[POWERTHINDEX.hero]?.innerText + "-power" == img.id);
                }
            });

            //ダメージ
            heroes_damage.forEach(img =>{

                // ボタンがOFFの場合
                if(img.className == "power-hero-icon-off" && shouldShow){
                    shouldShow = !(cells[POWERTHINDEX.hero]?.innerText + "-power" == img.id);
                }
            });

            //サポート
            heroes_support.forEach(img => {
                // ボタンがOFFの場合
                if(img.className == "power-hero-icon-off" && shouldShow){
                    shouldShow = !(cells[POWERTHINDEX.hero]?.innerText + "-power" == img.id);
                }
            });

            // 非表示対応
            if(shouldShow == true){
                tr.classList.add("table-on");
            }else{
                tr.classList.add("table-off");
            }
        });
    } catch (error) {
        console.error(ERRORMESSAGEKEY.dataFilterError + " : power : " + elem.id, error);
    }
}
// #endregion 絞り込み

// #region キーワード検索
/** 検索ボックスで絞り込み（アイテム）
 * @return {void}
 */
function item_searchWords() {

    try {
        // 検索ワードを取得
        const keyword = document.getElementById("item_search-input").value.trim();

        //検索ワードなしなら何もしない
        if(keyword === "" || keyword === null || keyword === undefined){
            return;
        }

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

            const itemName = cells[ITEMTHINDEX.itemName]?.textContent.trim() || "";
            const textColumn = cells[ITEMTHINDEX.text]?.textContent.trim() || "";

            // 非表示フラグ　keywordが空の場合は全て非表示、
            const shouldShow = keyword !== "" && (itemName.includes(keyword) || textColumn.includes(keyword));

            // 非表示対応
            if(shouldShow == true){
                tr.classList.add("table-on");
            }else{
                tr.classList.add("table-off");
            }
        });
    } catch (error) {
        console.error(ERRORMESSAGEKEY.keywordSearchError + " : item", error);
    }
}

    /** 検索ボックスで絞り込み（ガジェット）
     * @return {void}
     */
    function gadget_searchWords() {

    try {
        // 検索ワードを取得
        const keyword = document.getElementById("gadget_search-input").value.trim();

        //検索ワードなしなら何もしない
        if(keyword === "" || keyword === null || keyword === undefined){
            return;
        }

        //ボタンを全てOFFにした状態に
        let activeButtons = document.querySelectorAll("button.button-on");
        activeButtons.forEach(btn => filterGadgetTable(btn));

        //データ行を全て読み込み、<tbody> 内のすべての行を取得して、rows_gadget に配列のように格納。各行を1つのガジェットとする。
        var tbody_gadget = document.getElementById("gadget-table").querySelector("tbody");
        var rows_gadget = tbody_gadget.querySelectorAll("tr");

        // 行ごとの絞り込み
        // ガジェット行をループ
        rows_gadget.forEach(tr => {
            const cells = tr.querySelectorAll("td");

            // 毎回クラスを初期化
            tr.classList.remove("table-on");
            tr.classList.remove("table-off");

            // 非表示にするガジェットを探す

            const gadgetName = cells[GADGETTHINDEX.gadgetName]?.textContent.trim() || "";
            const textColumn = cells[GADGETTHINDEX.text]?.textContent.trim() || "";

            // 非表示フラグ　keywordが空の場合は全て非表示、
            const shouldShow = keyword !== "" && (gadgetName.includes(keyword) || textColumn.includes(keyword));
            // 非表示対応
            if(shouldShow == true){
                tr.classList.add("table-on");
            }else{
                tr.classList.add("table-off");
            }
        });
    } catch (error) {
        console.error(ERRORMESSAGEKEY.keywordSearchError + " : gadget", error);
    }
}

/** 検索ボックスで絞り込み（パワー）
 * @return {void}
 */
function power_searchWords() {

    try {
        // 検索ワードを取得
        const keyword = document.getElementById("power_search-input").value.trim();

        //検索ワードなしなら何もしない
        if(keyword === "" || keyword === null || keyword === undefined){
            return;
        }

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

            const powerName = cells[POWERTHINDEX.powerName]?.textContent.trim() || "";
            const textColumn = cells[POWERTHINDEX.text]?.textContent.trim() || "";

            // 非表示フラグ　keywordが空の場合は全て非表示、
            const shouldShow = keyword !== "" && (powerName.includes(keyword) || textColumn.includes(keyword));

            // 非表示対応
            if(shouldShow == true){
                tr.classList.add("table-on");
            }else{
                tr.classList.add("table-off");
            }
        });
    } catch (error) {
        console.error(ERRORMESSAGEKEY.keywordSearchError + " : power", error);
    }
}
// #endregion キーワード検索

// #region ソート
/**アイテムテーブルソートの前提準備
 * @param {string} id - ソート対象の列ID
 * @return {void}
 */
function itemSortClick(id){

    try {
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
            itemName: THTEXT.itemName,
            rarity: THTEXT.rarity,
            cost: THTEXT.cost
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

        if(id == "cost"){
            let cost_itemTh = document.querySelector("th#cost.item-th");
            addCostDivAndSpan(cost_itemTh);
            document.getElementById("span-cost").innerText = labelMap[id];
            document.getElementById("span-costArrow").innerText = arrows;
        }else{
            // ソート結果に応じた列名に更新
            document.getElementById(id).innerText = labelMap[id] + arrows;
        }
    } catch (error) {
        console.error(ERRORMESSAGEKEY.dataSortError + " : item : " + id, error);
    }
}

/** アイテムテーブルをソートする関数
 * @param {object} headers - テーブルヘッダー要素
 * @param {object} tbody - テーブルボディ要素
 * @param {Object} sortingCriteria - ソート基準
 * @param {number} index - ソート対象の列インデックス
 * @param {boolean} sorting - 昇順か降順か
 * @return {void}
 */
function itemTableSort(headers, tbody, sortingCriteria,index,sorting) {

    //レア度の並び替えの基準を設定
    const rarityOrder = [RARITYELEMENTS.common, RARITYELEMENTS.rare, RARITYELEMENTS.epic]

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

/**ガジェットテーブルソートの前提準備
 * @param {string} id - ソート対象の列ID
 * @return {void}
 */
function gadgetSortClick(id){

    try {
    const tHeader=document.getElementById("gadget-table").querySelectorAll("th");
    const tBody = document.getElementById("gadget-table").querySelector("tbody");
    const criteria = Array.from(sortingCriteria.entries()).find(([key,row]) => row.column === id);
    const columnIndex = Array.from(tHeader).findIndex(th => th.dataset.column == id);
    const currentDirection = sortDirection[columnIndex] == true ? false:true;
    sortDirection = new Array(8).fill(null);
    sortDirection[columnIndex] = currentDirection

    gadgetTableSort(tHeader,tBody,criteria[1],columnIndex,currentDirection);

    // 表示テキスト更新
    const labelMap = {
        gadgetName: THTEXT.gadgetName,
        rarity: THTEXT.rarity,
        cost: THTEXT.cost
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

    if(id == "cost"){
        let cost_gadgetTh = document.querySelector("th#cost.IGP_gadget-th");
        addCostDivAndSpan(cost_gadgetTh);
        document.getElementById("span-cost").innerText = labelMap[id];
        document.getElementById("span-costArrow").innerText = arrows;
    }else{
        // ソート結果に応じた列名に更新
        document.getElementById(id).innerText = labelMap[id] + arrows;
    }
    } catch (error) {
        console.error(ERRORMESSAGEKEY.dataSortError + " : gadget : " + id, error);
    }
}

/** ガジェットテーブルをソートする関数
 * @param {object} headers - テーブルヘッダー要素
 * @param {object} tbody - テーブルボディ要素
 * @param {Object} sortingCriteria - ソート基準
 * @param {number} index - ソート対象の列インデックス
 * @param {boolean} sorting - 昇順か降順か
 * @return {void}
 */
function gadgetTableSort(headers, tbody, sortingCriteria,index,sorting) {

    //レア度の並び替えの基準を設定
    const rarityOrder = [RARITYELEMENTS.common, RARITYELEMENTS.rare, RARITYELEMENTS.epic]

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

/** パワーテーブルソートの前提準備
 * @param {string} id - ソート対象の列ID
 * @return {void}
 */
function powerSortClick(id){

    try {
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
        powerName: THTEXT.powerName,
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
    } catch (error) {
        console.error(ERRORMESSAGEKEY.dataSortError + " : power : " + id, error);
    }
}

/** パワーテーブルをソートする関数
 * @param {object} headers - テーブルヘッダー要素の配列
 * @param {object} tbody - テーブルボディ要素
 * @param {object} sortingCriteria - ソート基準
 * @param {number} index - ソート対象の列インデックス
 * @param {boolean} sorting - 昇順か降順か
 * @return {void}
 */
function powerTableSort(headers, tbody, sortingCriteria,index,sorting) {

    //レア度の並び替えの基準を設定
    const rarityOrder = [RARITYELEMENTS.common, RARITYELEMENTS.rare, RARITYELEMENTS.epic]

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
//#endregion ソート

/**コスト列のth内に、キャッシュアイコンとspan要素を追加する関数
 * @param {HTMLElement} cost_Th - コスト列の<th>要素
 * @return {void}
 */
function addCostDivAndSpan(cost_Th) {

    //costのth内innerTextはいらないので消去
    cost_Th.innerText = "";

    // div を作成
    const cost_div = document.createElement("div");
    cost_div.id = "div-cost";

    // img要素を作成
    let img = document.createElement("img");
    img.src = "assets/images/icons/status/キャッシュアイコン.png";
    img.classList.add("itemandpower-statusicon");

    // divの中に追加
    cost_div.appendChild(img);

    // th の子要素として追加
    cost_Th.appendChild(cost_div);

    //span を作成
    const cost_span = document.createElement("span");
    cost_span.innerText = "コスト";
    cost_span.id = "span-cost";

    const costArrow_span = document.createElement("span");
    costArrow_span.id = "span-costArrow";

    // div の子要素として追加
    cost_div.appendChild(cost_span);
    cost_div.appendChild(costArrow_span);
}

// #region パッチノート関係
/** パッチノートが適用可能か確認し、適用する関数
 * @return {void}
 */
function applyPatchNotesIfReady() {
    // 一度適用したら再実行しない
    if (patchNotesApplied) return;

    // 必要なテーブルとデータが揃っているかを確認
    const itemTableTr = document.getElementById("item-table")?.querySelector("tbody").querySelectorAll('tr');
    const gadgetTableTr = document.getElementById("gadget-table")?.querySelector("tbody").querySelectorAll('tr');
    const powerTableTr = document.getElementById("power-table")?.querySelector("tbody").querySelectorAll('tr');

    // アイテム、ガジェット、パワーのテーブルが存在し、かつパッチノートデータが読み込まれていれば実行
    if (itemTableTr.length > 0 && gadgetTableTr.length > 0 && powerTableTr.length > 0 && patchNoteAllData.length > 0) {
        applyPatchNotesToTables();
        patchNotesApplied = true;
    }
}

/** パッチノートを処理し、変更点をマップに整理する関数
 * @return {Map} - アイテム名をキーとした変更点のマップ
 */
function processPatchNotes() {
    const changesMap = new Map();

    patchNoteAllData.forEach(note => {
        if (note.category != "アイテム" &&note.category != "ガジェット" && note.category != "パワー") return;

        const name = note.name;
        if (!name || name == "-") return;

        const changeEntry = {
            category: note.category,
            hero: note.hero,
            date: note.date,
            content: note.content.replaceAll("/", "<br>・"),
            updatecategory: note.updatecategory
        };

        if (!changesMap.has(name)) {
            changesMap.set(name, []);
        }
        changesMap.get(name).push(changeEntry);
    });

    // 日付の新しい順（降順）にソート
    changesMap.forEach(changes => {
        changes.sort((a, b) => b.date.localeCompare(a.date));
    });

    return changesMap;
}

/** 変更履歴のHTMLを生成する関数
 * @param {object} changes - 変更点の配列
 * @return {string} - 生成したHTML文字列
 */
function createHistoryHtml(changes) {

    let html = "";

    changes.forEach(change => {
        html += `<div class="patch-date"><strong>${change.date}</strong></div>`;
        html += `<div class="patch-content">・${change.content}</div>`;
    });

    return `<div class="history-content-wrapper">${html}</div>`;
}

/** パッチノートをアイテム・パワーテーブルに適用する関数
 * @return {void}
 */
function applyPatchNotesToTables() {

    const changesMap = processPatchNotes();

    // アイテムテーブルへの適用
    applyChangesToTable("item-table", 0, changesMap);

    // ガジェットテーブルへの適用
    applyChangesToTable("gadget-table", 0, changesMap);

    // パワーテーブルへの適用
    applyChangesToTable("power-table", 0, changesMap);

    patchNotesApplied = true;
}

/** テーブルにパッチノートの変更を適用する関数
 * @param {string} tableId - テーブルのID
 * @param {number} nameColIndex - 名前列のインデックス
 * @param {Map} changesMap - 変更点のマップ
 * @return {void}
 */
function applyChangesToTable(tableId, nameColIndex, changesMap) {
    const tableElement = document.getElementById(tableId);
    const tbody = tableElement?.querySelector("tbody");
    if (!tbody) return;

    const rows = tbody.querySelectorAll("tr");
    const HISTORY_COLUMN_INDEX = rows.length > 0 ? rows[0].cells.length - 1 : -1;

    if (HISTORY_COLUMN_INDEX == -1) {
        console.warn(ERRORMESSAGEKEY.dataRoadError + " : " + tableId);
        return;
    }

    rows.forEach(tr => {
        const nameCell = tr.cells[nameColIndex];

        // テーブルのアイテム/パワー名を取得
        const itemNameText = nameCell.textContent.trim().split('\n')[0].trim().replace("ヒーロー：", "/");
        const itemName = itemNameText.substring(0,itemNameText.indexOf("/"));
        const heroName = itemNameText.substring(itemNameText.indexOf("/") + 1,itemNameText.length);

        const changes = changesMap.get(itemName);
        let filteredChanges = changes;

        if (changes) {
            filteredChanges = changes.filter(change => {
                // 更新カテゴリが更新のデータの絞り込み実施
                if (heroName != "-"){
                    return change.updatecategory && change.updatecategory == UPDATECATEGORY.update && change.hero && change.hero == heroName;
                }else{
                    return change.updatecategory && change.updatecategory == UPDATECATEGORY.update;
                }

            });
        }

        // 描画済み最終列の「変更履歴」セルを取得
        const historyCell = tr.cells[HISTORY_COLUMN_INDEX];
        historyCell.classList.add("patch-history-content");

        if (filteredChanges && filteredChanges.length > 0) {
            // 変更履歴の内容をHTMLでセルに書き込む
            historyCell.innerHTML = createHistoryHtml(filteredChanges);
            // 変更があった行に目印のクラスを追加
            tr.classList.add("row-patchnote");
        } else {
            // 変更がない場合
            historyCell.textContent = "-";
        }
    });
}
// #endregion パッチノート関係