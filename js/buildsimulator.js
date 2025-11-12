// ------------------------------
// 処理部
// ------------------------------

// 選択中ヒーロー変数
var selectedHero = "D.VA（メック）"  // 初期値はD.VA
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

// パワーリストのキー
var power_nameKey = "パワー名";
var heroKey = "ヒーロー";
var power_iconKey = "アイコン";
var power_textKey = "テキスト";

// パワーキー対応マッピング（英語 → 日本語）
const powerKeyMap = {
    powername: power_nameKey,
    hero: heroKey,
    icon: power_iconKey,
    text: power_textKey,
};

// 理論値アイテムリストのキー
var theoreticalItem_IDKey = "アイテムID";
var theoreticalItem_LifeKey = "ライフ";
var theoreticalItem_ArmorKey = "アーマー";
var theoreticalItem_ShieldKey = "シールド";
var theoreticalItem_WeaponPowerKey = "武器パワー";
var theoreticalItem_AbilityPowerKey = "アビリティパワー";
var theoreticalItem_CTReducationKey = "CT短縮";
var theoreticalItem_AmmoKey = "弾薬";
var theoreticalItem_WeaponLifeStealKey = "武器（ライフ吸収）";
var theoreticalItem_AbilityLifeStealKey = "アビリティ（ライフ吸収）";
var theoreticalItem_ReloadSpeedKey = "リロード速度";
var theoreticalItem_MeleeDamageKey = "近接ダメージ";
var theoreticalItem_CriticalKey = "クリティカル";
var theoreticalItem_SpecialFlgKey = "特別フラグ";
var theoreticalItem_AdditionDamageFlgKey = "追加ダメージフラグ";
var theoreticalItem_HealDamageUpFlgKey = "ヒールダメージ上昇フラグ";
var theoreticalItem_WeaponAbilityUpFlgKey = "武器アビリティ上昇フラグ";
var theoreticalItem_HealDamageUpKey = "ヒールダメージ上昇量";

// 理論値アイテムキー対応マッピング（英語 → 日本語）
const theoreticalItemKeyMap = {
    life: theoreticalItem_LifeKey,
    armor: theoreticalItem_ArmorKey,
    shield: theoreticalItem_ShieldKey,
    weaponpower: theoreticalItem_WeaponPowerKey,
    abilitypower: theoreticalItem_AbilityPowerKey,
    ctreducation: theoreticalItem_CTReducationKey,
    ammo: theoreticalItem_AmmoKey,
    weaponlifesteal: theoreticalItem_WeaponLifeStealKey,
    abilitylifesteal: theoreticalItem_AbilityLifeStealKey,
    reloadspeed: theoreticalItem_ReloadSpeedKey,
    meleedamage: theoreticalItem_MeleeDamageKey,
    critical: theoreticalItem_CriticalKey,
    itemid: theoreticalItem_IDKey,
    specialflg: theoreticalItem_SpecialFlgKey,
    additiondamageflg: theoreticalItem_AdditionDamageFlgKey,
    healdamageupflg: theoreticalItem_HealDamageUpFlgKey,
    weaponabilityupflg: theoreticalItem_WeaponAbilityUpFlgKey,
    healdamageup: theoreticalItem_HealDamageUpKey
};

// ステータスリストのキー
var heroNameKey = "ヒーロー名";
var status_lifeKey = "ライフ";
var status_armorKey = "アーマー";
var status_shieldKey = "シールド";
var mainWeaponNameKey = "メイン武器名";
var mainDamageKey = "メイン武器";
var mainCalculationKey = "メイン計算式";
var mainReloadKey = "メインリロード速度";
var mainAmmoKey = "メイン弾薬数";
var mainHSRateKey = "メインHS倍率";
var mainLifeStealRateKey = "メインライフ吸収";
var subWeaponNameKey = "サブ武器名";
var subDamageKey = "サブ武器";
var subCalculationKey = "サブ計算式";
var subReloadKey = "サブリロード速度";
var subAmmoKey = "サブ弾薬数";
var subHSRateKey = "サブHS倍率";
var subLifeStealRateKey = "サブライフ吸収";
var ability1NameKey = "アビリティ１名";
var ability1DamageKey = "アビリティ１";
var ability1CalculationKey = "アビリティ１計算式";
var ability1DurationKey = "アビリティ１継続時間";
var ability1CTKey = "アビリティ1CT";
var ability1LifeStealRateKey = "アビリティ1ライフ吸収";
var ability2NameKey = "アビリティ２名";
var ability2DamageKey = "アビリティ２";
var ability2CalculationKey = "アビリティ２計算式";
var ability2DurationKey = "アビリティ２継続時間";
var ability2CTKey = "アビリティ2CT";
var ability2LifeStealRateKey = "アビリティ2ライフ吸収";
var ability3NameKey = "アビリティ３名";
var ability3DamageKey = "アビリティ３";
var ability3CalculationKey = "アビリティ３計算式";
var ability3DurationKey = "アビリティ３継続時間";
var ability3CTKey = "アビリティ3CT";
var ability3LifeStealRateKey = "アビリティ3ライフ吸収";
var ultNameKey = "ULT名";
var ultDamageKey = "ULT";
var ultCalculationKey = "ULT計算式";
var ultDurationKey = "ULT継続時間";
var ultLifeStealRateKey = "ULTライフ吸収";
var status_meleeDamageKey = "近接ダメージ";
var mainSpeedKey = "メイン攻撃速度";
var subSpeedKey = "サブ攻撃速度";
var moveSpeedKey = "移動速度";
var mainHealDamageUpFlg = "メイン上昇フラグ";
var subHealDamageUpFlg = "サブ上昇フラグ";
var ability1HealDamageUpFlg = "アビリティ１上昇フラグ";
var ability2HealDamageUpFlg = "アビリティ２上昇フラグ";
var ability3HealDamageUpFlg = "アビリティ３上昇フラグ";
var ultHealDamageUpFlg = "ULT上昇フラグ";

// ステータスキー対応マッピング（英語 → 日本語）
const statusKeyMap = {
    heroname: heroNameKey,
    life: status_lifeKey,
    shield: status_shieldKey,
    armor: status_armorKey,
    mainweaponname: mainWeaponNameKey,
    maindamage: mainDamageKey,
    mainreload: mainReloadKey,
    mainammo: mainAmmoKey,
    mainhsrate: mainHSRateKey,
    mainlifesteal: mainLifeStealRateKey,
    subweaponname: subWeaponNameKey,
    subdamage: subDamageKey,
    subreload: subReloadKey,
    subammo: subAmmoKey,
    subhsrate: subHSRateKey,
    sublifesteal: subLifeStealRateKey,
    ability1name: ability1NameKey,
    ability1damage: ability1DamageKey,
    ability1duration: ability1DurationKey,
    ability1ct: ability1CTKey,
    ability1lifesteal: ability1LifeStealRateKey,
    ability2name: ability2NameKey,
    ability2damage: ability2DamageKey,
    ability2duration: ability2DurationKey,
    ability2ct: ability2CTKey,
    ability2lifesteal: ability2LifeStealRateKey,
    ability3name: ability3NameKey,
    ability3damage: ability3DamageKey,
    ability3duration: ability3DurationKey,
    ability3ct: ability3CTKey,
    ability3lifesteal: ability3LifeStealRateKey,
    ultname: ultNameKey,
    ultdamage: ultDamageKey,
    ultduration: ultDurationKey,
    ultlifesteal: ultLifeStealRateKey,
    meleedamage: status_meleeDamageKey,
    mainspeed: mainSpeedKey,
    subspeed: subSpeedKey,
    movespeed: moveSpeedKey,
    mainhealdamageupflg: mainHealDamageUpFlg,
    subhealdamageupflg: subHealDamageUpFlg,
    ability1healdamageupflg: ability1HealDamageUpFlg,
    ability2healdamageupflg: ability2HealDamageUpFlg,
    ability3healdamageupflg: ability3HealDamageUpFlg,
    ulthealdamageupflg: ultHealDamageUpFlg
};

const accordionContainer = document.getElementById("accordion-container");

let itemAllData = []; // 全てのアイテムデータを保持
var itemList = {};  // 整形後

let powerAllData = []; // 全てのアイテムデータを保持
var powerList = {};  // 整形後

let theoreticalItem = []; // 全ての理論値アイテムデータを保持
var theoreticalItemList = {}; // 整形後

// チェックされた行のデータを格納する配列
var selectedItemRowsData = [];
var selectedPowerRowsData = [];
var selectedTheoreticalItemData = [];

// チェックボックス
var itemCheckboxes = [];
var powerCheckboxes = [];
var theoreticalItemCheckboxes = [];

loadAndInitBuildData();

// ------------------------------
// 関数部
// ------------------------------

//ビルド関連データの読み込みと初期化
async function loadAndInitBuildData() {
    try {
        const [itemData, powerData, statusData, theoreticalItemData] = await Promise.all([
            // データの読み込み(itemList)
            fetch("itemListData.json").then(response => response.json()),

            // データの読み込み(powerList)
            fetch("powerListData.json").then(response => response.json()),

            // データの読み込み(powerList)
            fetch("statusListData.json").then(response => response.json()),

            // データの読み込み(theoreticalItem)
            fetch("theoreticalItemData.json").then(response => response.json())
        ]);

        itemAllData = itemData;

        // 整形 → キー変換
        itemList = convertItemKeys(organizeItemData(itemAllData));

        // アイテムリストをテーブルに紐付け
        linkItemList(itemList, selectedHero);

        powerAllData = powerData;

        // 整形 → キー変換
        powerList = convertPowerKeys(organizePowerData(powerAllData));

        // パワーリストをテーブルに紐付け
        linkPowerList(powerList, selectedHero);

        theoreticalItem = theoreticalItemData;

        // 整形 → キー変換
        theoreticalItemList = convertTheoreticalItemKeys(organizeTheoreticalItemData(theoreticalItem));

        statusAllData = statusData;

        // 整形 → キー変換
        initStatusList = convertStatusKeys(organizeStatusData(statusAllData));

        // ステータスボックス設定
        initStatus(selectedHero);

        // 各イベント発生対象取得
        itemCheckboxes = document.querySelectorAll(".item-checkbox");
        powerCheckboxes = document.querySelectorAll(".power-checkbox");

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

    } catch(error){
        console.error("データの読み込み中にエラーが発生しました:", error);
    }
}

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

//英名キーを日本名キーへ変換処理(itemList)
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

// 英名キーを日本名キーへ変換処理(powerList)
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

//theoreticalItemList に　theoreticalItemData.json　から貰うデータの形を決める
function organizeTheoreticalItemData(theoreticalItemAllData) {
    const selectedData = theoreticalItemAllData
    .map(TIlist => {
        return {
            life: TIlist.life,
            armor: TIlist.armor,
            shield: TIlist.shield,
            weaponpower: TIlist.weaponpower,
            abilitypower: TIlist.abilitypower,
            ctreducation: TIlist.ctreducation,
            ammo: TIlist.ammo,
            weaponlifesteal: TIlist.weaponlifesteal,
            abilitylifesteal: TIlist.abilitylifesteal,
            reloadspeed: TIlist.reloadspeed,
            meleedamage: TIlist.meleedamage,
            critical: TIlist.critical,
            itemid: TIlist.itemid,
            specialflg: TIlist.specialflg,
            additiondamageflg: TIlist.additiondamageflg,
            healdamageupflg: TIlist.healdamageupflg,
            weaponabilityupflg: TIlist.weaponabilityupflg,
            healdamageup: TIlist.healdamageup
        };
    })
    return selectedData;
}

//英名キーを日本名キーへ変換処理(theoreticalitemList)
function convertTheoreticalItemKeys(dataArray) {
    return dataArray.map(obj => {
        let newObj = {};
        for (let key in obj) {
            let newKey = theoreticalItemKeyMap[key] || key; // 対応がないキーはそのまま
            newObj[newKey] = obj[key];
        }
        return newObj;
    });
}

//initStatusList に　statusListData.json　から貰うデータの形を決める
function organizeStatusData(statusAllData) {
    const selectedData = statusAllData
    .map(Slist => {
        return {
            heroname: Slist.heroname,
            life: Slist.life,
            shield: Slist.shield,
            armor: Slist.armor,
            mainweaponname: Slist.mainweaponname,
            maindamage: Slist.maindamage,
            mainreload: Slist.mainreload,
            mainammo: Slist.mainammo,
            mainhsrate: Slist.mainhsrate,
            mainlifesteal: Slist.mainlifesteal,
            subweaponname: Slist.subweaponname,
            subdamage: Slist.subdamage,
            subreload: Slist.subreload,
            subammo: Slist.subammo,
            subhsrate: Slist.subhsrate,
            sublifesteal: Slist.sublifesteal,
            ability1name: Slist.ability1name,
            ability1damage: Slist.ability1damage,
            ability1duration: Slist.ability1duration,
            ability1ct: Slist.ability1ct,
            ability1lifesteal: Slist.ability1lifesteal,
            ability2name: Slist.ability2name,
            ability2damage: Slist.ability2damage,
            ability2duration: Slist.ability2duration,
            ability2ct: Slist.ability2ct,
            ability2lifesteal: Slist.ability2lifesteal,
            ability3name: Slist.ability3name,
            ability3damage: Slist.ability3damage,
            ability3duration: Slist.ability3duration,
            ability3ct: Slist.ability3ct,
            ability3lifesteal: Slist.ability3lifesteal,
            ultname: Slist.ultname,
            ultdamage: Slist.ultdamage,
            ultduration: Slist.ultduration,
            ultlifesteal: Slist.ultlifesteal,
            meleedamage: Slist.meleedamage,
            mainspeed: Slist.mainspeed,
            subspeed: Slist.subspeed,
            movespeed: Slist.movespeed,
            mainhealdamageupflg: Slist.mainhealdamageupflg,
            subhealdamageupflg: Slist.subhealdamageupflg,
            ability1healdamageupflg: Slist.ability1healdamageupflg,
            ability2healdamageupflg: Slist.ability2healdamageupflg,
            ability3healdamageupflg: Slist.ability3healdamageupflg,
            ulthealdamageupflg: Slist.ulthealdamageupflg
        };
    })
    return selectedData;
}

// 英名キーを日本名キーへ変換処理(initStatusList)
function convertStatusKeys(dataArray) {
    return dataArray.map(obj => {
        let newObj = {};
        for (let key in obj) {
            let newKey = statusKeyMap[key] || key; // 対応がないキーはそのまま
            newObj[newKey] = obj[key];
        }
        return newObj;
    });
}


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
    // D.VAチェック
    if(id == "D.VA（メック）" || id == "D.VA（人）"){
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

    if(id == "D.VA（メック）" || id == "D.VA（人）"){
        heroName = "D.VA";
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
            if(selectedHero == "D.VA（メック）" || selectedHero == "D.VA（人）"){
                
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
    document.getElementById("life").innerText = status_lifeKey + " :" + statuslist[status_lifeKey];
    document.getElementById("armor").innerText = status_armorKey + " :" + statuslist[status_armorKey];
    document.getElementById("shield").innerText = status_shieldKey + " :" + statuslist[status_shieldKey];
    
    const container = document.getElementById('status-container');
    container.innerHTML = '';

    // 武器キーをまとめておく配列
    const weapons = [
        {
            nameKey: mainWeaponNameKey,
            attackPointKey: mainDamageKey,
            HSRateKey: mainHSRateKey,
            reloadKey: mainReloadKey,
            ammoKey: mainAmmoKey,
            lifeStealRateKey: mainLifeStealRateKey
        },
        {
            nameKey: subWeaponNameKey,
            attackPointKey: subDamageKey,
            HSRateKey: subHSRateKey,
            reloadKey: subReloadKey,
            ammoKey: subAmmoKey,
            lifeStealRateKey: subLifeStealRateKey
        },
        {
            nameKey: status_meleeDamageKey,
            attackPointKey: status_meleeDamageKey,
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
            attackPointKey: ability1DamageKey,
            CTKey: ability1CTKey,
            durationKey: ability1DurationKey,
            lifeStealRateKey: ability1LifeStealRateKey
        },
        {
            nameKey: ability2NameKey,
            attackPointKey: ability2DamageKey,
            CTKey: ability2CTKey,
            durationKey: ability2DurationKey,
            lifeStealRateKey: ability2LifeStealRateKey
        },
        {
            nameKey: ability3NameKey,
            attackPointKey: ability3DamageKey,
            CTKey: ability3CTKey,
            durationKey: ability3DurationKey,
            lifeStealRateKey: ability3LifeStealRateKey
        },
        {
            nameKey: ultNameKey,
            attackPointKey: ultDamageKey,
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
    // その他・テキストに記載がある場合
    else if(addItemText != "-"){

        // 追加効果欄に羅列
        document.getElementById("additem").innerText = document.getElementById("additem").innerText + addItemText;
        document.getElementById("additem").innerText = document.getElementById("additem").innerText + addItemOthers;
    }    
}

function processWeapon(statuslist,weaponNameKey,attackPointKey,HSRateKey,reloadKey,ammoKey,lifeStealRateKey){
    // 武器が存在しない場合は何もしない
    if(statuslist[weaponNameKey] == "-") {
        return;
    }

    let weaponValue = statuslist[attackPointKey];
    let HSValue = 0;
    let reloadValue = 0;
    let ammoValue = 0;
    let lifeStealValue = 0;
    
    if(weaponNameKey == status_meleeDamageKey){
        if(selectedHero == "ジャンカー・クイーン"){
            weaponValue =  statuslist[attackPointKey] + queenScratch;
        }
    }else{
        if(selectedHero == "ジュノ" && junoFlg == "ヒール") {
            weaponValue = Math.round((statuslist[attackPointKey] * 0.8 * 10 ** 2) / 10 ** 2);
        }else if(selectedHero == "ザリア" && zariaFlg == "エネルギー100%") {
            weaponValue = Math.round(statuslist[attackPointKey] * 2 * 10 ** 2) / 10 ** 2;
        }
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
    if(lifeStealRateKey != "" &&  statuslist[lifeStealRateKey] != 0){
        lifeStealValue = Math.round(statuslist[attackPointKey] * statuslist[lifeStealRateKey]);
    }

    // 武器の情報を追加
    if(weaponNameKey == status_meleeDamageKey){
        addStatusDiv_Weapon(weaponNameKey,weaponValue,HSValue,reloadValue,ammoValue,lifeStealValue);
    }else{
        addStatusDiv_Weapon(statuslist[weaponNameKey],weaponValue,HSValue,reloadValue,ammoValue,lifeStealValue);
    }
    
}

function addStatusDiv_Weapon(name,value,hsValue,reload,ammo,lifeSteal){
    const container = document.getElementById('status-container');
    const div = document.createElement('div');
    div.classList.add('status-div');

    // HS表示用文字列を生成
    const hsView = hsValue > 0 ? "（HS" + hsValue + "）" : "";
    // リロード、弾薬、L吸収の表示用文字列を生成
    let detailParts = [];

    if(reload != 0) {
        detailParts.push(`<span><strong>リロード</strong>：${reload}秒</span>`);
    }
    if(ammo != 0) {
        detailParts.push(`<span><strong>弾薬</strong>：${ammo}発</span>`);
    }
    if(lifeSteal != 0) {
        detailParts.push(`<span><strong>L吸収</strong>：${lifeSteal}</span>`);
    }

    // 詳細部分を結合（項目がない場合は空文字）
    const detailsHtml = detailParts.length > 0 ? `<p class="status-detail">${detailParts.join("　")}</p>` : "";

    // 内容を生成
    if(name == status_meleeDamageKey){
        div.innerHTML = `
        <p><strong>${name}</strong>：${value}${hsView}</p>
        ${detailsHtml}
        `;
    }else{
        div.innerHTML = `
        <p><strong class="weapon">${name}</strong>：${value}${hsView}</p>
        ${detailsHtml}
        `;
    }
    

    container.appendChild(div);
}

function processAnother(statuslist,nameKey,attackPointKey,CTKey,durationKey,lifeStealRateKey){
    // アビリティが存在しない場合は何もしない
    if(statuslist[nameKey] == "-") {
        return;
    }

    let attackValue = statuslist[attackPointKey];
    let durationValue = 0;
    let CTValue = 0;
    let lifeStealValue = 0;
    
    if(attackPointKey == ability1DamageKey){
        if(selectedHero == "ジュノ" && junoFlg == "ヒール"){
            attackValue = Number(statuslist[attackPointKey]) + 50;
        }else if(selectedHero == "モイラ" && moiraFlg == 'ヒール'){
            attackValue = Math.round((statuslist[attackPointKey] * 1.5 * 10 ** 2) / 10 ** 2);
        }
    }

    if(attackPointKey == ultDamageKey){
        if(selectedHero == "モイラ" && moiraFlg == 'ヒール'){
            attackValue = Math.round((statuslist[ultDamageKey] / 18 * 27 * 10 ** 2) / 10 ** 2);
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
    if(statuslist[lifeStealRateKey] != 0){
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

    if(ct != 0) {
        detailParts.push(`<span><strong>CT</strong>：${ct}秒</span>`);
    }
    if(duration != 0) {
        detailParts.push(`<span><strong>継続時間</strong>：${duration}秒</span>`);
    }
    if(lifeSteal != 0) {
        detailParts.push(`<span><strong>L吸収</strong>：${lifeSteal}</span>`);
    }

    // 詳細部分を結合（項目がない場合は空文字）
    const detailsHtml = detailParts.length > 0 ? `<p class="status-detail">${detailParts.join("　")}</p>` : "";

    // 内容を生成
    div.innerHTML = `
        <p><strong class="ability">${name}</strong>：${value}</p>
        ${detailsHtml}
    `;

    container.appendChild(div);
}

// メック人切り替え
function dvaButtonClick(){

    // 選択ヒーロー切り替え
    if(selectedHero == "D.VA（メック）"){
        selectedHero = "D.VA（人）";
    }else if(selectedHero == "D.VA（人）"){
        selectedHero = "D.VA（メック）";
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
    if(id == "D.VA（メック）" || id == "D.VA（人）"){
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
            if(ITEMLISTKEY.item_nameKey == key) {

                // アイテム名用変数に値を代入
                itemNameText = itemList[i][key];
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

            // キー名がアイコンキーの場合
            if(ITEMLISTKEY.item_iconKey == key) {

                // アイコン用変数に値を代入
                iconText = itemList[i][key];
            }

            // キー名がテキストキーの場合
            if(ITEMLISTKEY.item_textKey == key) {

                // テキスト用変数に値を代入
                textText = itemList[i][key];
            }

            // キー名がカテゴリーキーの場合
            if(ITEMLISTKEY.categoryKey == key) {

                // カテゴリー判定用変数に値を代入
                categoryCheck = itemList[i][key];
            }
            
            // キー名がレア度キーの場合
            if(ITEMLISTKEY.rarityKey == key) {

                // レア度用変数に値を代入
                rarityText = itemList[i][key];
            }

            // キー名がコストキーの場合
            if(ITEMLISTKEY.costKey == key) {

                //コスト用変数に値を代入
                costText = itemList[i][key];
            }

            // キー名が固有ヒーローキーの場合
            if(ITEMLISTKEY.uniqueHeroKey == key){

                // 固有ヒーロー用変数に値を代入
                uniqueHeroText = itemList[i][key];
            }

        })

                //ステータスアイコン設定
        let statusIcons = [];
        let statusLists = (statusText || "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);

        statusLists.forEach((status, i) => {

            //その他（特殊効果）以外のアイコン付与
            if(!status.includes("※")){
                switch(true) {
                    case status.includes("ライフ+"):
                        statusIcons.push("assets/images/icons/status/ライフアイコン.png");
                        break;

                    case status.includes("アーマー"):
                        statusIcons.push("assets/images/icons/status/アーマーアイコン.png");
                        break;

                    case status.includes("シールド"):
                        statusIcons.push("assets/images/icons/status/シールドアイコン.png");
                        break;

                    case status.includes("武器パワー"):
                        statusIcons.push("assets/images/icons/status/武器パワーアイコン.png");
                        break;

                    case status.includes("アビリティパワー"):
                        statusIcons.push("assets/images/icons/status/アビリティパワーアイコン.png");
                        break;

                    case status.includes("攻撃速度"):
                        statusIcons.push("assets/images/icons/status/攻撃速度アイコン.png");
                        break;

                    case status.includes("CT短縮"):
                        statusIcons.push("assets/images/icons/status/クールダウンアイコン.png");
                        break;

                    case status.includes("弾薬"):
                        statusIcons.push("assets/images/icons/status/最大弾薬数アイコン.png");
                        break;

                    case status.includes("ライフ吸収（武器）"):
                        statusIcons.push("assets/images/icons/status/ライフ吸収(武器)アイコン.png");
                        break;

                    case status.includes("ライフ吸収（アビリティ）"):
                        statusIcons.push("assets/images/icons/status/ライフ吸収(アビリティ)アイコン.png");
                        break;

                    case status.includes("移動速度"):
                        statusIcons.push("assets/images/icons/status/移動速度アイコン.png");
                        break;

                    case status.includes("リロード速度"):
                        statusIcons.push("assets/images/icons/status/リロード速度アイコン.png");
                        break;

                    case status.includes("近接ダメージ"):
                        statusIcons.push("assets/images/icons/status/近接攻撃ダメージアイコン.png");
                        break;

                    case status.includes("クリティカル"):
                        statusIcons.push("assets/images/icons/status/クリティカル・ダメージアイコン.png");
                        break;
                }
            
            //その他（特殊効果）の場合
            }else if(status.includes("※")){
                statusIcons.push("assets/images/icons/status/特殊効果アイコン.png");

                //テキストから※を削除
                statusLists[i] = status.replace("※","");
            }            
        });           


        // 取得した各値をテーブルに紐付け
        // カテゴリー別に紐付け先のテーブルを分ける
        if(categoryCheck == "武器"){
            tbody_weapon.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, textText, rarityText, costText, uniqueHeroText, id, statusLists, statusIcons));
        }else if(categoryCheck == "アビリティ"){
            tbody_ability.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, textText, rarityText, costText, uniqueHeroText, id, statusLists, statusIcons));
        }else if(categoryCheck == "サバイバル"){
            tbody_survival.appendChild(appendChildItemList(tr, isCheck, itemNameText, iconText, textText, rarityText, costText, uniqueHeroText, id, statusLists, statusIcons));
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
function appendChildItemList(tr, isCheck, itemNameText, iconText, textText, rarityText, costText, uniqueHeroText, id, statusLists, statusIcons){
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
    if(id == "D.VA（メック）" || id == "D.VA（人）"){
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
            if(power_nameKey == key) {

                // パワー名用変数に値を代入
                powerNameText = powerList[i][key];
            }

            // キー名がアイコンキーの場合
            if(power_iconKey == key) {

                // アイコン用変数に値を代入
                iconText = powerList[i][key];
            }

            // キー名がテキストキーの場合
            if(power_textKey == key) {

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
                
                if(itemList[i][ITEMLISTKEY.item_nameKey] == itemName){
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
                
                if(powerList[i][power_nameKey] == powerName){
                    selectedPowerRows.push(powerList[i]);
                }
            }
        }
    });
    return selectedPowerRows;
}

// 理論値アイテムでステータスを反映
function updateStatusForTheoreticalItem() {

    var selectedTheoreticalItemRows = [];

    
    return selectedTheoreticalItemRows;
}

//ビルド欄のアイテムを更新する関数
function updateBuild_Item(selectedItemRows){

    for(let i=0; i<6; i++) {
        // 親要素を指定
        const targetDiv = document.getElementById("item" + String(i + 1));
        let checkDiv = document.getElementById("theoreticalitem" + String(i + 1));

        // 指定した要素内に子要素がある場合は削除する
        if(targetDiv.children.length != 0){
            const image = document.getElementById("item-image" + String(i + 1));
            const span = document.getElementById("delete-item" + String(i + 1));
            const check = document.getElementById("item-check" + String(i + 1));
            targetDiv.removeChild(image);
            targetDiv.removeChild(span);
            checkDiv.removeChild(check);
        }
        
        // 選択されたアイテムのアイコンと✖ボタンと理論値チェックボックスを追加する
        if(i < selectedItemRows.length){
            // アイコン追加部分
            var iconImg = document.createElement("img");
            iconImg.src = "assets/images/icons/item/" + selectedItemRows[i][ITEMLISTKEY.item_iconKey];
            iconImg.classList.add("selectedbuild-item-icon");
            iconImg.id = "item-image" + String(i + 1)
            targetDiv.appendChild(iconImg);
            
            // ✖ボタン追加部分
            var span = document.createElement("span");
            span.textContent = "✖︎";
            span.classList.add("selectedbuild-delete-button");
            span.id = "delete-item" + String(i + 1);
            targetDiv.appendChild(span);

            // 理論値チェックボックス追加部分
            var input = document.createElement("input");
            input.type = "checkbox";
            input.checked = false;
            input.classList.add("theoretical-item-checkbox");
            // 理論値フラグがfalseなら表示はするが非活性にする
            if(!selectedItemRows[i][ITEMLISTKEY.theoreticalFlgKey]){
                input.disabled = true;
            }
            input.classList.add("selectedbuild-theoretical-checkbox");
            input.id = "item-check" + String(i + 1);
            checkDiv.appendChild(input);
        }
    }

    // 理論値チェックボックス
    theoreticalItemCheckboxes = document.querySelectorAll(".theoretical-item-checkbox");

    // 各アイテムの理論値チェックボックスにイベントリスナーを追加
        theoreticalItemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                
                // ステータスを更新
                updateStatus_Item(selectedItemRowsData, true);
            });
        });
}

//ステータスにアイテムの内容を反映する関数
/**
 * 
 * @param {Object} selectedItemRows - 選択中アイテム（連想配列）
 * @param {boolean} theoreticalFlag - 理論値フラグ
 */
function updateStatus_Item(selectedItemRows, theoreticalFlag = false){

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
    let text = "";
    let others = "";

    // #region 選択中のアイテムごとにアイテムの効果をステータスリストに反映
    for(let i=0; i<selectedItemRows.length; i++) {

        // 各パラメータを抽出
        let nameTmp = selectedItemRows[i][ITEMLISTKEY.item_nameKey];
        let lifeTmp = selectedItemRows[i][ITEMLISTKEY.item_lifeKey];
        let armorTmp = selectedItemRows[i][ITEMLISTKEY.item_armorKey];
        let shieldTmp = selectedItemRows[i][ITEMLISTKEY.item_shieldKey];
        let weaponPowerTmp = selectedItemRows[i][ITEMLISTKEY.weaponPowerKey];
        let abilityPowerTmp = selectedItemRows[i][ITEMLISTKEY.abilityPowerKey];
        let attackSpeedTmp = selectedItemRows[i][ITEMLISTKEY.attackSpeedKey];
        let ctReducationTmp = selectedItemRows[i][ITEMLISTKEY.ctReducationKey];
        let ammoTmp = selectedItemRows[i][ITEMLISTKEY.ammoKey];
        let weapon_LifeStealTmp = selectedItemRows[i][ITEMLISTKEY.weapon_LifeStealKey];
        let ability_LifeStealTmp = selectedItemRows[i][ITEMLISTKEY.ability_LifeStealKey];
        let speedTmp = selectedItemRows[i][ITEMLISTKEY.speedKey];
        let reloadSpeedTmp = selectedItemRows[i][ITEMLISTKEY.reloadSpeedKey];
        let meleeDamageTmp = selectedItemRows[i][ITEMLISTKEY.item_meleeDamageKey];
        let criticalTmp = selectedItemRows[i][ITEMLISTKEY.criticalKey];
        let othersTmp = selectedItemRows[i][ITEMLISTKEY.othersKey];
        let textTmp = selectedItemRows[i][ITEMLISTKEY.item_textKey];
        let durationFlgTmp = selectedItemRows[i][ITEMLISTKEY.durationFlgKey];
        let durationTmp = selectedItemRows[i][ITEMLISTKEY.durationKey];

        // 理論値計算時は理論値チェックがONか確認
        if(theoreticalFlag && selectedItemRows[i][ITEMLISTKEY.theoreticalFlgKey]){
            theoreticalItemCheckboxes.forEach(checkbox => {
                const div = checkbox.closest('div');
            
                //アイテムの番号からアイコンのアイテム名を抜き出す
                const itemNumber = div.id.slice(-1);
                const img = document.getElementById("item-image" + itemNumber);
                const imgSRC = decodeURIComponent(img.src.split('/').pop());

                // アイテム名が一致かつチェックがONの時はアイテムIDを抜き出す
                if(selectedItemRows[i][ITEMLISTKEY.item_iconKey] == imgSRC && checkbox.checked){
                    const itemID = selectedItemRows[i][ITEMLISTKEY.itemIdKey];

                    // アイテムIDから理論値リストのデータを検索
                    for(let j=0; j<theoreticalItemList.length; j++){
                        const thItemID = theoreticalItemList[j][theoreticalItem_IDKey];
                        if(thItemID == itemID){
                            
                            // 特別フラグがOFFの場合そのままステータスに反映
                            if(!theoreticalItemList[j][theoreticalItem_SpecialFlgKey]){
                                // 各パラメータを抽出
                                const thLifeTmp = theoreticalItemList[j][theoreticalItem_LifeKey];
                                const thArmorTmp = theoreticalItemList[j][theoreticalItem_ArmorKey];
                                const thShieldTmp = theoreticalItemList[j][theoreticalItem_ShieldKey];
                                const thWeaponPowerTmp = theoreticalItemList[j][theoreticalItem_WeaponPowerKey];
                                const thAbilityPowerTmp = theoreticalItemList[j][theoreticalItem_AbilityPowerKey];
                                const thCtReducationTmp = theoreticalItemList[j][theoreticalItem_CTReducationKey];
                                const thAmmoTmp = theoreticalItemList[j][theoreticalItem_AmmoKey];
                                const thWeapon_LifeStealTmp = theoreticalItemList[j][theoreticalItem_WeaponLifeStealKey];
                                const thAbility_LifeStealTmp = theoreticalItemList[j][theoreticalItem_AbilityLifeStealKey];
                                const thReloadSpeedTmp = theoreticalItemList[j][theoreticalItem_ReloadSpeedKey];
                                const thMeleeDamageTmp = theoreticalItemList[j][theoreticalItem_MeleeDamageKey];
                                const thCriticalTmp = theoreticalItemList[j][theoreticalItem_CriticalKey];

                                // 通常の計算変数に加算
                                lifeTmp += thLifeTmp;
                                armorTmp += thArmorTmp;
                                shieldTmp += thShieldTmp;
                                weaponPowerTmp += thWeaponPowerTmp;
                                abilityPowerTmp += thAbilityPowerTmp;
                                ctReducationTmp += thCtReducationTmp;
                                ammoTmp += thAmmoTmp;
                                weapon_LifeStealTmp += thWeapon_LifeStealTmp;
                                ability_LifeStealTmp += thAbility_LifeStealTmp;
                                reloadSpeedTmp += thReloadSpeedTmp;
                                meleeDamageTmp += thMeleeDamageTmp;
                                criticalTmp += thCriticalTmp;
                            }
                            else
                            {
                                // 武器アビリティ上昇フラグから上昇する対象を決定
                                switch(theoreticalItemList[j][theoreticalItem_WeaponAbilityUpFlgKey]){
                                    
                                    // アビリティ１の場合
                                    case 1:

                                        // 掛け算の場合
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                            // 表示用ステータスリストに反映
                                            showStatusList[ability1DamageKey] = Math.round(showStatusList[ability1DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                        }
                                        break;
                                    
                                    // アビリティ２の場合
                                    case 2:

                                        // 掛け算の場合
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                            // 表示用ステータスリストに反映
                                            showStatusList[ability2DamageKey] = Math.round(showStatusList[ability2DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                        }
                                        break;

                                    // アビリティ３の場合
                                    case 3:

                                        // 掛け算の場合
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                            // 表示用ステータスリストに反映
                                            showStatusList[ability3DamageKey] = Math.round(showStatusList[ability3DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                        }
                                        break;

                                    // ULTの場合
                                    case 4:

                                        // 掛け算の場合
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                            // 表示用ステータスリストに反映
                                            showStatusList[ultDamageKey] = Math.round(showStatusList[ultDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                        }
                                        break;

                                    // メイン武器の場合
                                    case 5:
                                        // 掛け算の場合
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){
                                            // 表示用ステータスリストに反映
                                            showStatusList[mainDamageKey] = Math.round(showStatusList[mainDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                        }
                                        break;

                                    // サブ武器の場合
                                    case 6:

                                        // 掛け算の場合
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                            // 表示用ステータスリストに反映
                                            showStatusList[subDamageKey] = Math.round(showStatusList[subDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                        }
                                        break;

                                    // メイン武器とサブ武器の場合
                                    case 7:

                                        // 掛け算の場合
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                            // 表示用ステータスリストに反映
                                            showStatusList[mainDamageKey] = Math.round(showStatusList[mainDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                            showStatusList[subDamageKey] = Math.round(showStatusList[subDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                        }
                                        break;

                                    // その他の場合
                                    case 8:
                                        break;

                                    // 未設定の場合
                                    default:

                                        // 上昇種別フラグが１なら全ての回復量を上昇
                                        if(theoreticalItemList[j][theoreticalItem_HealDamageUpFlgKey] == 1){
                                            if(showStatusList[mainHealDamageUpFlg] == 1){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[mainDamageKey] = Math.round(showStatusList[mainDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[subHealDamageUpFlg] == 1){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[subDamageKey] = Math.round(showStatusList[subDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ability1HealDamageUpFlg] == 1){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ability1DamageKey] = Math.round(showStatusList[ability1DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ability2HealDamageUpFlg] == 1){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ability2DamageKey] = Math.round(showStatusList[ability2DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ability3HealDamageUpFlg] == 1){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ability3DamageKey] = Math.round(showStatusList[ability3DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ultHealDamageUpFlg] == 1){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ultDamageKey] = Math.round(showStatusList[ultDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                        }
                                        else if(theoreticalItemList[j][theoreticalItem_HealDamageUpFlgKey] == 2)
                                        {
                                            // 上昇種別フラグが2なら全てのダメージを上昇
                                            if(showStatusList[mainHealDamageUpFlg] == 2){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[mainDamageKey] = Math.round(showStatusList[mainDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[subHealDamageUpFlg] == 2){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[subDamageKey] = Math.round(showStatusList[subDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ability1HealDamageUpFlg] == 2){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ability1DamageKey] = Math.round(showStatusList[ability1DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ability2HealDamageUpFlg] == 2){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ability2DamageKey] = Math.round(showStatusList[ability2DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ability3HealDamageUpFlg] == 2){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ability3DamageKey] = Math.round(showStatusList[ability3DamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                            if(showStatusList[ultHealDamageUpFlg] == 2){
                                            
                                                // 掛け算の場合
                                                if(theoreticalItemList[j][theoreticalItem_HealDamageUpKey][0] == "*"){

                                                    // 表示用ステータスリストに反映
                                                    showStatusList[ultDamageKey] = Math.round(showStatusList[ultDamageKey] * theoreticalItemList[j][theoreticalItem_HealDamageUpKey].slice(1) * 10 ** 2) / 10 ** 2;
                                                }
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                    }
                }
            });
        }

        // ライフに記載がある場合
        if(lifeTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[status_lifeKey] = showStatusList[status_lifeKey] + lifeTmp;
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
            showStatusList[status_armorKey] = showStatusList[status_armorKey] + armorTmp;
        }

        // シールドに記載がある場合
        if(shieldTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[status_shieldKey] = showStatusList[status_shieldKey] + shieldTmp;
        }

        // 武器パワーに記載がある場合
        if(weaponPowerTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[mainDamageKey] = Math.round(showStatusList[mainDamageKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            showStatusList[subDamageKey] = Math.round(showStatusList[subDamageKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            
            // ラインハルトは近接ダメージにも武器パワーが乗るので対応
            if(showStatusList[heroNameKey] == "ラインハルト"){
                showStatusList[status_meleeDamageKey] = Math.round(showStatusList[status_meleeDamageKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }

            // ゲンジ・ソルジャーの場合はULTにも武器パワーが乗るので対応
            if(showStatusList[heroNameKey] == "ゲンジ" || showStatusList[heroNameKey] == "ソルジャー76"){
                showStatusList[ultDamageKey] = Math.round(showStatusList[ultDamageKey] * (weaponPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }
        }

        // アビリティパワーに記載がある場合
        if(abilityPowerTmp != 0){

            // 表示用ステータスリストに反映
            showStatusList[ability1DamageKey] = Math.round(showStatusList[ability1DamageKey] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            showStatusList[ability2DamageKey] = Math.round(showStatusList[ability2DamageKey] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;

            // ラインハルトとシグマの盾は除外
            if(showStatusList[heroNameKey] != "ラインハルト" && showStatusList[heroNameKey] != "シグマ"){
                showStatusList[ability3DamageKey] = Math.round(showStatusList[ability3DamageKey] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
            }

            // ゲンジとソルジャーのULTは除外
            if(showStatusList[heroNameKey] != "ゲンジ" && showStatusList[heroNameKey] != "ソルジャー76"){
                showStatusList[ultDamageKey] = Math.round(showStatusList[ultDamageKey] * (abilityPowerTmp/100 + 1) * 10 ** 2) / 10 ** 2;
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
            if(showStatusList[mainDamageKey] != 0){
                showStatusList[mainLifeStealRateKey] = showStatusList[mainLifeStealRateKey] + weapon_LifeStealTmp / 100;
            }
            if(showStatusList[subDamageKey] != 0){
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
            if(showStatusList[ability1DamageKey] != 0){
                showStatusList[ability1LifeStealRateKey] = showStatusList[ability1LifeStealRateKey] + ability_LifeStealTmp / 100;
            }
            if(showStatusList[ability2DamageKey] != 0){
                showStatusList[ability2LifeStealRateKey] = showStatusList[ability2LifeStealRateKey] + ability_LifeStealTmp / 100;
            }

            // ラインハルトとシグマの盾は除外
            if(showStatusList[heroNameKey] != "ラインハルト" && showStatusList[heroNameKey] != "シグマ"){
                if(showStatusList[ability3DamageKey] != 0){
                    showStatusList[ability3LifeStealRateKey] = showStatusList[ability3LifeStealRateKey] + ability_LifeStealTmp / 100;
                }
            }

            // ゲンジとソルジャーのULTは除外
            if(showStatusList[heroNameKey] != "ゲンジ" && showStatusList[heroNameKey] != "ソルジャー76"){
                if(showStatusList[ultDamageKey] != 0){
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
            showStatusList[status_meleeDamageKey] = Math.round(showStatusList[status_meleeDamageKey] * (meleeDamageTmp / 100 + 1) * 10 ** 2) / 10 ** 2;

            // ラインハルトはメイン武器にも近接ダメージが乗るので対応
            if(showStatusList[heroNameKey] == "ラインハルト"){
                showStatusList[mainDamageKey] = Math.round(showStatusList[mainDamageKey] * (meleeDamageTmp/100 + 1) * 10 ** 2) / 10 ** 2;
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

        // 持続時間に記載がある場合
        if(durationFlgTmp != 0){
            
            // アビリティ１の場合
            if(durationFlgTmp == 1){
                if(durationTmp.charAt(0) == "+"){
                    showStatusList[ability1DurationKey] = showStatusList[ability1DurationKey] + durationTmp.slice(1);
                }else{
                    showStatusList[ability1DurationKey] = (showStatusList[ability1DurationKey] * durationTmp.slice(1) * 10 ** 2) / 10 ** 2;
                }
            }
            
            // アビリティ２の場合
            if(durationFlgTmp == 2){
                if(durationTmp.charAt(0) == "+"){
                    showStatusList[ability2DurationKey] = showStatusList[ability2DurationKey] + durationTmp.slice(1);
                }else{
                    showStatusList[ability2DurationKey] = (showStatusList[ability2DurationKey] * durationTmp.slice(1)* 10 ** 2) / 10 ** 2;
                }
            }

            // アビリティ３の場合
            if(durationFlgTmp == 3){
                if(durationTmp.charAt(0) == "+"){
                    showStatusList[ability3DurationKey] = showStatusList[ability3DurationKey] + durationTmp.slice(1);
                }else{
                    showStatusList[ability3DurationKey] = (showStatusList[ability3DurationKey] * durationTmp.slice(1)* 10 ** 2) / 10 ** 2;
                }
            }

            // ULTの場合
            if(durationFlgTmp == 4){
                if(durationTmp.charAt(0) == "+"){
                    showStatusList[ultDurationKey] = showStatusList[ultDurationKey] + durationTmp.slice(1);
                }else{
                    showStatusList[ultDurationKey] = (showStatusList[ultDurationKey] * durationTmp.slice(1)* 10 ** 2) / 10 ** 2;
                }
            }
        }

        // ラインハルトの盾増強
        if(nameTmp == "オーバークロック・バリア"){
            showStatusList[ability3DamageKey] = Math.round(showStatusList[ability3DamageKey] * 1.2 * 10 ** 2) / 10 ** 2;
            othersTmp = "20%[バリア・フィールド]サイズ";
        }
        

        // 最後に計算するものがある場合
        if(i + 1 == selectedItemRows.length){

            // ライフ
            if(lifeRate != 1){

                // 表示用ステータスリストに反映
                showStatusList[status_lifeKey] = Math.round(showStatusList[status_lifeKey] * lifeRate);
            }

            // アーマー
            if(armorRate != 1){

                // 表示用ステータスリストに反映
                showStatusList[status_armorKey] = Math.round(showStatusList[status_armorKey] * armorRate);
            }

            // シールド
            if(shieldRate != 1){

                // 表示用ステータスリストに反映
                showStatusList[status_shieldKey] = Math.round(showStatusList[status_shieldKey] * shieldRate);
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

        // テキストとその他をまとめる
        if(textTmp != "-"){
            text = text + textTmp + "\n";
        }
        if(othersTmp != "-"){
            others = others + othersTmp + "\n";
        }
    }
    // #endregion

    // ステータス表に反映
    initStatusValue(showStatusList, text, others);
}

//ビルド欄のパワーを更新する関数
function updateBuild_Power(selectedPowerRows){

    for(let i=0; i<4; i++) {
        // 親要素を指定
        let targetDiv = document.getElementById("power" + String(i + 1));
        let checkDiv = document.getElementById("theoreticalpower" + String(i + 1));

        // 指定した要素内に子要素がある場合は削除する
        if(targetDiv.children.length != 0){
            const image = document.getElementById("power-image" + String(i + 1));
            const span = document.getElementById("delete-power" + String(i + 1));
            const check = document.getElementById("power-check" + String(i + 1));
            targetDiv.removeChild(image);
            targetDiv.removeChild(span);
            checkDiv.removeChild(check);
        }
        
        // 選択されたパワーのアイコンと✖ボタンと理論値チェックボックスを追加する
        if(i < selectedPowerRows.length){
            // アイコン追加部分
            var iconImg = document.createElement("img");
            iconImg.src = "assets/images/icons/power/" + selectedPowerRows[i][power_iconKey];
            iconImg.classList.add("selectedbuild-power-icon");
            iconImg.id = "power-image" + String(i + 1)
            targetDiv.appendChild(iconImg);
            
            // ✖ボタン追加部分
            var span = document.createElement("span");
            span.textContent = "✖︎";
            span.classList.add("selectedbuild-delete-button");
            span.id = "delete-power" + String(i + 1);
            targetDiv.appendChild(span);

            // 理論値チェックボックス追加部分
            var input = document.createElement("input");
            input.type = "checkbox";
            input.checked = false;
            input.classList.add("selectedbuild-theoretical-checkbox");
            input.id = "power-check" + String(i + 1);
            checkDiv.appendChild(input);
        }
    }
}

//ステータスにパワーの内容を反映する関数
function updateStatus_Power(selectedPowerRows){

    // 追加効果欄を初期化
    document.getElementById("addpower").innerText = "追加効果(パワー):";
    
    for(let i=0; i<4; i++) {

        // テキストを抽出
        const textTmp = selectedPowerRows[i][power_textKey];

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
        
        const itemName = selectedRows[index][ITEMLISTKEY.item_nameKey];
        const category = selectedRows[index][ITEMLISTKEY.categoryKey];
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

        const powerName = selectedRows[index][power_nameKey];
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
    if(id == "D.VA（メック）" || id == "D.VA（人）"){
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

// 理論値ON/OFF切り替え
function theoreticalValueClick(){
    const theoreticalValueButton = document.getElementById("theoreticalvalue-button");

    // エネルギー表示を入れ替える
    if(theoreticalValueButton.innerText == "理論値OFF"){
        theoreticalValueButton.innerText = "理論値ON";
    }else if(theoreticalValueButton.innerText == "理論値ON"){
        theoreticalValueButton.innerText = "理論値OFF";
    }
}