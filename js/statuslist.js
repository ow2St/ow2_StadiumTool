// ------------------------------
// 処理部
// ------------------------------

// ステータスリストのキー
var heroNameKey = "ヒーロー名";
var lifeKey = "ライフ";
var armorKey = "アーマー";
var shieldKey = "シールド";
var mainWeaponNameKey = "メイン武器名";
var mainWeaponKey = "メイン武器";
var mainCalculationKey = "メイン計算式";
var mainReloadKey = "メインリロード速度";
var mainAmmoKey = "メイン弾薬数";
var subWeaponNameKey = "サブ武器名";
var subWeaponKey = "サブ武器";
var subCalculationKey = "サブ計算式";
var subReloadKey = "サブリロード速度";
var subAmmoKey = "サブ弾薬数";
var ability1NameKey = "アビリティ１名";
var ability1Key = "アビリティ１";
var ability1CalculationKey = "アビリティ１計算式";
var ability1DurationKey = "アビリティ１継続時間";
var ability1CTKey = "アビリティ１CT";
var ability2NameKey = "アビリティ２名";
var ability2Key = "アビリティ２";
var ability2CalculationKey = "アビリティ２計算式";
var ability2DurationKey = "アビリティ２継続時間";
var ability2CTKey = "アビリティ２CT";
var ability3NameKey = "アビリティ３名";
var ability3Key = "アビリティ３";
var ability3CalculationKey = "アビリティ３計算式";
var ability3DurationKey = "アビリティ３継続時間";
var ability3CTKey = "アビリティ３CT";
var ultNameKey = "ULT名";
var ultKey = "ULT";
var ultCalculationKey = "ULT計算式";
var ultDurationKey = "ULT継続時間";
var addPowerKey = "追加効果";

// ステータスリスト定義（初期化）
var statusList = [];

addStatusList("DVA（メック）",375,0,325,"フュージョンキャノン",22,"2*11",0,0,"なし",0,"-",0,0,"ブースター",0,"-",2,3.5,"ディフェンスマトリックス",0,"-",3,0.75,"マイクロミサイル",153,"8.5*18",1.6,7,"自爆",1000,"-",3);
addStatusList("DVA（人）",175,0,0,"ライトガン",14,"-",1.4,20,"なし",0,"-",0,0,"なし",0,"-",0,0,"なし",0,"-",0,0,"なし",0,"-",0,0,"メック召喚",250,"-",0);
addStatusList("オリーサ",300,0,325,"フュージョンドライバー改",14,"-",3,49,"なし",0,"-",0,0,"エネルギージャベリン",110,"70+40(壁)",0,6,"フォーティファイ",0,"-",0,0,"ジャベリンスピン",100,"20+5.33…*15",1.75,8,"テラサージ",571.4,"1.5*2+3.6*19+500",4);

// ------------------------------
// 関数部
// ------------------------------

// ステータスリストに各ヒーローの情報を追加する関数　TODO:RIN 攻撃速度
function addStatusList(heroName, life, armor, shield, 
                       mainWeaponName, mainWeapon, mainCalculation, mainReload, mainAmmo,
                       subWeaponName, subWeapon, subCalculation, subReload, subAmmo,
                       ability1Name, ability1, ability1Calculation, ability1Duration, ability1CT,
                       ability2Name, ability2, ability2Calculation, ability2Duration, ability2CT,
                       ability3Name, ability3, ability3Calculation, ability3Duration, ability3CT,
                       ultName, ult, ultCalculation, ultDuration) {
    
    // ステータス情報を連想配列にする
    let statusData = {};
    statusData[heroNameKey] = heroName;
    statusData[lifeKey] = life;
    statusData[armorKey] = armor;
    statusData[shieldKey] = shield;
    statusData[mainWeaponNameKey] = mainWeaponName;
    statusData[mainWeaponKey] = mainWeapon;
    statusData[mainCalculationKey] = mainCalculation;
    statusData[mainReloadKey] = mainReload;
    statusData[mainAmmoKey] = mainAmmo;
    statusData[subWeaponNameKey] = subWeaponName;
    statusData[subWeaponKey] = subWeapon;
    statusData[subCalculationKey] = subCalculation;
    statusData[subReloadKey] = subReload;
    statusData[subAmmoKey] = subAmmo;
    statusData[ability1NameKey] = ability1Name;
    statusData[ability1Key] = ability1;
    statusData[ability1CalculationKey] = ability1Calculation;
    statusData[ability1DurationKey] = ability1Duration;
    statusData[ability1CTKey] = ability1CT;
    statusData[ability2NameKey] = ability2Name;
    statusData[ability2Key] = ability2;
    statusData[ability2CalculationKey] = ability2Calculation;
    statusData[ability2DurationKey] = ability2Duration;
    statusData[ability2CTKey] = ability2CT;
    statusData[ability3NameKey] = ability3Name;
    statusData[ability3Key] = ability3;
    statusData[ability3CalculationKey] = ability3Calculation;
    statusData[ability3DurationKey] = ability3Duration;
    statusData[ability3CTKey] = ability3CT;
    statusData[ultNameKey] = ultName;
    statusData[ultKey] = ult;
    statusData[ultCalculationKey] = ultCalculation;
    statusData[ultDurationKey] = ultDuration;
    statusData[addPowerKey] = "";  // 追加効果は初期値はないので空文字

    // ステータス情報をステータスリストに追加
    statusList.push(statusData);
}
