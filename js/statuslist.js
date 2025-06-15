// ------------------------------
// 処理部
// ------------------------------

// ステータスリストのキー
var heroNameKey = "ヒーロー名";
var lifeKey = "ライフ";
var armorKey = "アーマー";
var shieldKey = "シールド";
var mainWeaponKey = "メイン武器";
var subWeaponKey = "サブ武器";
var ability1Key = "アビリティ１";
var ability2Key = "アビリティ２";
var ability3Key = "アビリティ３";
var ultKey = "ULT";
var addPowerKey = "追加効果";

// ステータスリスト定義（初期化）
var statusList = [];

addStatusList("DVA",375,0,325,2,0,0,0,8.5,1000);
addStatusList("オリーサ",300,0,325,14,0,70,100,571,4);

// ------------------------------
// 関数部
// ------------------------------

// ステータスリストに各ヒーローの情報を追加する関数
function addStatusList(heroName, life, armor, shield, mainWeapon, subWeapon, 
                       ability1, ability2, ability3, ult) {
    
    // ステータス情報を連想配列にする
    let statusData = {};
    statusData[heroNameKey] = heroName;
    statusData[lifeKey] = life;
    statusData[armorKey] = armor;
    statusData[shieldKey] = shield;
    statusData[mainWeaponKey] = mainWeapon;
    statusData[subWeaponKey] = subWeapon;
    statusData[ability1Key] = ability1;
    statusData[ability2Key] = ability2;
    statusData[ability3Key] = ability3;
    statusData[ultKey] = ult;
    statusData[addPowerKey] = "";  // 追加効果は初期値はないので空文字

    // ステータス情報をステータスリストに追加
    statusList.push(statusData);
}
