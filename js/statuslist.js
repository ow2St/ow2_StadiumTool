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
// var mainHSKey = "メインHS";
var mainCalculationKey = "メイン計算式";
var mainReloadKey = "メインリロード速度";
var mainAmmoKey = "メイン弾薬数";
var subWeaponNameKey = "サブ武器名";
var subWeaponKey = "サブ武器";
// var subHSKey = "サブHS";
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

// ステータスリスト定義（初期値）
var initStatusList = [];

addStatusList("DVA（メック）",375,0,325,"フュージョンキャノン",22,"2*11",0,0,"なし",0,"-",0,0,"ブースター",0,"-",2,3.5,"ディフェンスマトリックス",0,"-",3,6,"マイクロミサイル",153,"8.5*18",1.6,7,"自爆",1000,"-",3);
addStatusList("DVA（人）",175,0,0,"ライトガン",14,"-",1.4,20,"なし",0,"-",0,0,"なし",0,"-",0,0,"なし",0,"-",0,0,"なし",0,"-",0,0,"メック召喚",250,"-",0);
addStatusList("オリーサ",300,0,325,"フュージョンドライバー改",14,"-",3,49,"なし",0,"-",0,0,"エネルギージャベリン",110,"70+40(壁)",0,6,"フォーティファイ",0,"-",0,0,"ジャベリンスピン",100,"20+5.33…*15",1.75,8,"テラサージ",571.4,"1.5*2+3.6*19+500",4);
addStatusList("ザリア",325,225,0,"パーティクルキャノン・ビーム",18.24,"-",1.5,100,"パーティクルキャノン・弾",55,"-",1.5,100,"パーティクルパリア",0,"-",2.25,11,"バリアショット",0,"-",2.25,9,"なし",0,"-",0,0,"グラビトンサージ",24.12,"5+1.84+1.92*9",4);
addStatusList("ジャンカー・クイーン",525,0,0,"スキャッターガン",80,"8*10",1.5,8,"なし",0,"-",0,0,"ギザギザブレード",35.08,"5+2.4+1.92*14+0.8",3,6,"コマンディングシャウト",0,"-",5,12,"カーネイジ","144.89","105+3.2+2.56*14+0.85",3,8,"ランペイジ",129.92,"3.84*33+3.2",4.5);
addStatusList("ラインハルト",400,0,300,"ロケットハンマー",100,"-",0,0,"なし",0,"-",0,0,"チャージ",300,"-",3,7,"ファイアストライク",120,"-",0,6,"バリアフィールド",1500,"-",0,5,"アースシャター",200,"150+50",3);
addStatusList("アッシュ",250,0,0,"ザヴァイパー・ADS",75,"-",0.25,12,"ザヴァイパー・腰撃ち",35,"-",0.25,12,"コーチガン",60,"6*15",0,10,"ダイナマイト",150,"50+3.84*26+0.16",5,12,"なし",0,"-",0,0,"BOB",1446,"120+17*78",10);
addStatusList("キャスディ",275,0,0,"ピースキーパー・単発",70,"-",1.5,6,"ピースキーパー・連射",50,"-",1.5,6,"コンバットロール",0,"-",0.4,6,"フラッシュバン",75,"-",0.9,12,"なし",0,"-",0,0,"デッドアイ",0,"-",7);
addStatusList("ゲンジ",250,0,0,"手裏剣・バースト",27,"-",1.5,24,"手裏剣・散弾",27,"-",1.5,24,"木の葉返し",0,"-",2,8,"風斬り",50,"-",0.4,6,"なし",0,"-",0,0,"竜撃剣",110,"-",6);
addStatusList("ソルジャー76",250,0,0,"ヘビーパルスライフル",19,"-",1.5,30,"なし",0,"-",0,0,"スプリント",0,"-",0,0,"バイオティックフィールド",202.35,"-",5,15,"ヘリックスロケット",120,"-",0,6,"タクティカルバイザー",19,"-",6);
addStatusList("フレイヤ",225,0,0,"リバースドロークロスボウ",30,"-",1.5,12,"テイクエイム",130,"40+90",1,1,"クイックダッシュ",0,"-",0,4.5,"アップドラフト",0,"-",0,12,"なし",0,"-",0,0,"ボーラショット",200,"1*2+6*33",0);
addStatusList("メイ",250,0,0,"凍結ブラスター・スプレー",5,"-",1.5,140,"凍結ブラスター・つらら",85,"-",1.5,140,"クリオフリーズ",250,"-",4,12,"アイスウォール",0,"-",5,12,"なし",0,"-",0,0,"ブリザード",85.12,"4.48+3.84*21",4.25);
addStatusList("リーパー",300,0,0,"ヘルファイアショットガン",108,"21.6*5",1.5,8,"なし",0,"-",0,0,"シャドウステップ",0,"-",0,10,"レイスフォーム",0,"-",3,8,"なし",0,"-",0,0,"デスブロッサム",555,"37*15",3);
addStatusList("アナ",250,0,0,"バイオティックライフル",75,"2.4+7.2+28.8*2+7.8",1.5,15,"なし",0,"-",0,0,"スリープダーツ",5,"-",5,14,"バイオティックグレネード",75,"-",3,14,"なし",0,"-",0,0,"ナノブースト",250,"-",8);
addStatusList();
addStatusList();
addStatusList();
addStatusList();
addStatusList();

// ------------------------------
// 関数部
// ------------------------------

// ステータスリストに各ヒーローの情報を追加する関数　TODO:RIN 攻撃速度
function addStatusList(heroName, life, armor, shield, 
                       mainWeaponName, mainWeapon, /*mainHS,*/ mainCalculation, mainReload, mainAmmo,
                       subWeaponName, subWeapon, /*subHS,*/ subCalculation, subReload, subAmmo,
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
    //statusData[mainHSKey] = mainHS;
    statusData[mainCalculationKey] = mainCalculation;
    statusData[mainReloadKey] = mainReload;
    statusData[mainAmmoKey] = mainAmmo;
    statusData[subWeaponNameKey] = subWeaponName;
    statusData[subWeaponKey] = subWeapon;
    //statusData[subHSKey] = subHS;
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

    // ステータス情報をステータスリストに追加
    initStatusList.push(statusData);
}
