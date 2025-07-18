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
var mainHSRateKey = "メインHS倍率";
var mainLifeStealRateKey = "メインライフ吸収";
var subWeaponNameKey = "サブ武器名";
var subWeaponKey = "サブ武器";
var subCalculationKey = "サブ計算式";
var subReloadKey = "サブリロード速度";
var subAmmoKey = "サブ弾薬数";
var subHSRateKey = "サブHS倍率";
var subLifeStealRateKey = "サブライフ吸収";
var ability1NameKey = "アビリティ１名";
var ability1Key = "アビリティ１";
var ability1CalculationKey = "アビリティ１計算式";
var ability1DurationKey = "アビリティ１継続時間";
var ability1CTKey = "アビリティ1CT";
var ability1LifeStealRateKey = "アビリティ1ライフ吸収";
var ability2NameKey = "アビリティ２名";
var ability2Key = "アビリティ２";
var ability2CalculationKey = "アビリティ２計算式";
var ability2DurationKey = "アビリティ２継続時間";
var ability2CTKey = "アビリティ2CT";
var ability2LifeStealRateKey = "アビリティ2ライフ吸収";
var ability3NameKey = "アビリティ３名";
var ability3Key = "アビリティ３";
var ability3CalculationKey = "アビリティ３計算式";
var ability3DurationKey = "アビリティ３継続時間";
var ability3CTKey = "アビリティ3CT";
var ability3LifeStealRateKey = "アビリティ3ライフ吸収";
var ultNameKey = "ULT名";
var ultKey = "ULT";
var ultCalculationKey = "ULT計算式";
var ultDurationKey = "ULT継続時間";
var ultLifeStealRateKey = "ULT2ライフ吸収";
var meleeDamageKey = "近接ダメージ";

// ステータスリスト定義（初期値）
var initStatusList = [];

addStatusList("DVA（メック）",375,0,325,"フュージョンキャノン",22,"2*11",0,0,2,"なし",0,"-",0,0,1,"ブースター",25,"-",2,3.5,"ディフェンスマトリックス",0,"-",3,6,"マイクロミサイル",153,"8.5*18",1.6,7,"自爆",1000,"-",3,40);
addStatusList("DVA（人）",175,0,0,"ライトガン",14,"-",1.4,20,2,"なし",0,"-",0,0,1,"なし",0,"-",0,0,"なし",0,"-",0,0,"なし",0,"-",0,0,"メック召喚",250,"-",0,40);
addStatusList("オリーサ",300,0,325,"フュージョンドライバー改",14,"-",3,49,2,"なし",0,"-",0,0,1,"エネルギージャベリン",110,"70+40(壁)",0,6,"フォーティファイ",100,"-",4,0,"ジャベリンスピン",100,"20+5.33…*15",1.75,8,"テラサージ",571.1,"1.5*2+3.6*19+500",4,40);
addStatusList("ザリア",325,225,0,"パーティクルキャノン・ビーム",18.24,"-",1.5,100,1,"パーティクルキャノン・弾",55,"-",1.5,100,1,"パーティクルパリア",0,"-",2.25,11,"バリアショット",0,"-",2.25,9,"なし",0,"-",0,0,"グラビトンサージ",24.12,"5+1.84+1.92*9",4,40);
addStatusList("ジャンカー・クイーン",525,0,0,"スキャッターガン",80,"8*10",1.5,8,2,"なし",0,"-",0,0,1,"ギザギザブレード",95.08,"5+2.4+1.92*14+0.8",3,6,"コマンディングシャウト",200,"-",4,12,"カーネイジ","144.89","105+3.2+2.56*14+0.85",3,8,"ランペイジ",129.92,"3.84*33+3.2",4.5,54.96);
addStatusList("ラインハルト",400,0,300,"ロケットハンマー",100,"-",0,0,1,"なし",0,"-",0,0,1,"チャージ",300,"-",3,7,"ファイアストライク",120,"-",0,6,"バリアフィールド",1500,"-",0,5,"アースシャター",200,"150+50",3,100);
addStatusList("シグマ",350,275,0,"ハイパースフィア",55,"-",0,0,1,"なし",0,"-",0,0,1,"キネティックグラスプ",400,"X*0.6",2,12,"アクリーション",120,"-",1.1,10,"エクスペリメンタルバリア",700,"-",0,5,"グラビティフラックス",50,"50+HP50%",7,40);
addStatusList("アッシュ",250,0,0,"ザヴァイパー・ADS",75,"-",0.25,12,2,"ザヴァイパー・腰撃ち",35,"-",0.25,12,2,"コーチガン",90,"6*15",0,10,"ダイナマイト",150,"50+3.84*26+0.16",5,12,"なし",0,"-",0,0,"BOB",1326,"120+17*78",10,40);
addStatusList("キャスディ",275,0,0,"ピースキーパー・単発",70,"-",1.5,6,2,"ピースキーパー・連射",50,"-",1.5,6,1,"コンバットロール",0,"-",0.4,6,"フラッシュバン",75,"-",0.9,12,"なし",0,"-",0,0,"デッドアイ",1800,"150*2+300*5",7,40);
addStatusList("ゲンジ",250,0,0,"手裏剣・バースト",27,"-",1.5,24,2,"手裏剣・散弾",27,"-",1.5,24,2,"木の葉返し",0,"-",2,8,"風斬り",50,"-",0.4,6,"なし",0,"-",0,0,"竜撃剣",110,"-",6,40);
addStatusList("ソルジャー76",250,0,0,"ヘビーパルスライフル",19,"-",1.5,30,2,"なし",0,"-",0,0,1,"スプリント",0,"-",0,0,"バイオティックフィールド",200,"40*5",5,15,"ヘリックスロケット",120,"-",0,6,"タクティカルバイザー",19,"-",6,40);
addStatusList("フレイヤ",225,0,0,"リバースドロークロスボウ",30,"-",1.5,12,2,"テイクエイム",130,"40+90",1,1,2,"クイックダッシュ",0,"-",0,4.5,"アップドラフト",0,"-",0,12,"なし",0,"-",0,0,"ボーラショット",200,"1*2+6*33",0,40);
addStatusList("メイ",250,0,0,"凍結ブラスター・スプレー",5,"-",1.5,140,1,"凍結ブラスター・つらら",85,"-",1.5,140,2,"クリオフリーズ",250,"62.5*4",4,12,"アイスウォール",250,"-",5,12,"なし",0,"-",0,0,"ブリザード",85.12,"4.48+3.84*21",4.25,40);
addStatusList("リーパー",300,0,0,"ヘルファイアショットガン",115,"23*5",1.5,8,2,"なし",0,"-",0,0,1,"シャドウステップ",0,"-",0,10,"レイスフォーム",0,"-",3,8,"なし",0,"-",0,0,"デスブロッサム",555,"37*15",3,40);
addStatusList("ジャンクラット",250,0,0,"フラグランチャー",125,"-",1.5,5,1,"なし",0,"-",0,0,1,"コンカッションマイン",120,"-",0,7,"スティールトラップ",100,"-",2.5,10,"なし",0,"-",0,0,"RIPタイヤ",600,"-",10,40);
addStatusList("アナ",250,0,0,"バイオティックライフル",75,"2.4+7.2+28.8*2+7.8",1.5,15,1,"なし",0,"-",0,0,1,"スリープダーツ",5,"-",5,14,"バイオティックグレネード",75,"-",3,14,"なし",0,"-",0,0,"ナノブースト",250,"-",8,40);
addStatusList("キリコ",225,0,0,"快気の御札",26,"-",0.9,10,1,"クナイ",60,"-",1,15,2,"神出鬼没",0,"-",0.25,8,"鈴のご加護",80,"-",0.65,15,"なし",0,"-",0,0,"狐走り",0,"-",10,40);
addStatusList("ジュノ",75,150,0,"メディブラスター",90,"7.5*12",1.5,180,1,"なし",0,"-",0,0,1,"パルサートーピード",85,"-",0,10,"グライドブースト",0,"-",5,6,"ハイパーリング",0,"-",3.5,14,"オービタルレイ",680,"85*8",8,40);
addStatusList("マーシー",225,0,0,"カデュケウススタッフ",60,"-",0,0,1,"カデュケウスブラスター",20,"-",1.4,25,2,"ガーディアンエンジェル",0,"-",0,1.5,"リザレクト",0,"-",1.75,30,"なし",0,"-",0,0,"ヴァルキリー",65,"-",15,40);
addStatusList("モイラ",225,0,0,"バイオティックグラスプ・回復",70,"-",0,0,1,"バイオティックグラスプ・吸収",65,"-",0,0,1,"バイオティックオーブ",200,"-",7,8,"フェード",0,"-",1,6,"なし",0,"-",0,0,"コアレッセンス",680,"-",8,40);
addStatusList("ルシオ",225,0,0,"ソニックアンプリファイア",88,"22*4",1.25,20,2,"なし",0,"-",0,0,1,"クロスフェード",16,"-",0,0,"アンプイットアップ",52,"-",3,12,"サウンドウェーブ",45,"-",0,4,"サウンドバリア",3740,"-",7,40);
addStatusList("ゼニヤッタ",75,175,0,"破滅のオーブ・単発",50,"-",1.5,25,2,"破滅のオーブ・溜め",250,"50*5",1.5,25,2,"不和のオーブ",0,"-",1.5,6,"調和のオーブ",30,"-",5,0,"なし",0,"-",0,0,"心頭滅却",300,"-",6,40);

// ------------------------------
// 関数部
// ------------------------------

// ステータスリストに各ヒーローの情報を追加する関数　TODO:RIN 攻撃速度
function addStatusList(heroName, life, shield, armor, 
                       mainWeaponName, mainWeapon, mainCalculation, mainReload, mainAmmo, mainHSRate,
                       subWeaponName, subWeapon, subCalculation, subReload, subAmmo, subHSRate,
                       ability1Name, ability1, ability1Calculation, ability1Duration, ability1CT,
                       ability2Name, ability2, ability2Calculation, ability2Duration, ability2CT,
                       ability3Name, ability3, ability3Calculation, ability3Duration, ability3CT,
                       ultName, ult, ultCalculation, ultDuration,
                       meleeDamage) {
    
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
    statusData[mainHSRateKey] = mainHSRate;
    statusData[mainLifeStealRateKey] = 0;
    statusData[subWeaponNameKey] = subWeaponName;
    statusData[subWeaponKey] = subWeapon;
    statusData[subCalculationKey] = subCalculation;
    statusData[subReloadKey] = subReload;
    statusData[subAmmoKey] = subAmmo;
    statusData[subHSRateKey] = subHSRate;
    statusData[subLifeStealRateKey] = 0;
    statusData[ability1NameKey] = ability1Name;
    statusData[ability1Key] = ability1;
    statusData[ability1CalculationKey] = ability1Calculation;
    statusData[ability1DurationKey] = ability1Duration;
    statusData[ability1CTKey] = ability1CT;
    statusData[ability1LifeStealRateKey] = 0;
    statusData[ability2NameKey] = ability2Name;
    statusData[ability2Key] = ability2;
    statusData[ability2CalculationKey] = ability2Calculation;
    statusData[ability2DurationKey] = ability2Duration;
    statusData[ability2CTKey] = ability2CT;
    statusData[ability2LifeStealRateKey] = 0;
    statusData[ability3NameKey] = ability3Name;
    statusData[ability3Key] = ability3;
    statusData[ability3CalculationKey] = ability3Calculation;
    statusData[ability3DurationKey] = ability3Duration;
    statusData[ability3CTKey] = ability3CT;
    statusData[ability3LifeStealRateKey] = 0;
    statusData[ultNameKey] = ultName;
    statusData[ultKey] = ult;
    statusData[ultCalculationKey] = ultCalculation;
    statusData[ultDurationKey] = ultDuration;
    statusData[ultLifeStealRateKey] = 0;
    statusData[meleeDamageKey] = meleeDamage;

    // ステータス情報をステータスリストに追加
    initStatusList.push(statusData);
}
