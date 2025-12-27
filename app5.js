"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

//Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number - 1 ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});
app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

// app.get("/keiyo2", (req, res) => {
//   // 本来ならここにDBとのやり取りが入る
//   res.render('db2', { data: station });
// });


let samochara = [
  { id:1, name:"シャケ",kind:'雑魚シャケ',attack:'近づいて殴ってくる',deth:'インクショットを与える',power:'なし'},
  { id:2, name:"コジャケ",kind:'雑魚シャケ',attack:'近づいて殴ってくる',deth:'インクショットを与える',power:'なし'},
  { id:3, name:"ドスコイ",kind:'雑魚シャケ',attack:'近づいて殴ってくる',deth:'インクショットを与える',power:'なし'},
  { id:4, name:"バクダン",kind:'オオモノシャケ',attack:'頭部から爆弾を生成し標的に投げてくる',deth:'生成されている爆弾にインクショットを与え爆発させる',power:'装甲貫通武器で本体を直接攻撃する'},
  { id:5, name:"テッパン",kind:'オオモノシャケ',attack:'標的に突進してくる',deth:'インクショットを与え装甲を破壊し後ろから攻撃',power:'装甲貫通武器で本体を直接攻撃する'},
  { id:6, name:"ヘビ",kind:'オオモノシャケ',attack:'標的に突進してくる',deth:'一番後ろにいる操縦士にインクショットを与える',power:'なし'},
  { id:7, name:"モグラ",kind:'オオモノシャケ',attack:'標的を追いかけ地面から捕食する',deth:'捕食のタイミングでボムを投げて食べさせる',power:'出てきたタイミングで直接攻撃する'},
  { id:8, name:"タワー",kind:'オオモノシャケ',attack:'標的を遠くからハイパープレッサー(貫通遠距離砲)によって攻撃',deth:'積まれている鍋を全て飛ばす',power:'なし'},
  { id:9, name:"コウモリ",kind:'オオモノシャケ',attack:'標的にアメフラシの弾を打ちアメフラシを生成',deth:'弾をインクショットで跳ね返す',power:'装甲貫通武器で本体を攻撃する'},
  { id:10, name:"カタパッド",kind:'オオモノシャケ',attack:'標的に計八発のミサイルを発射',deth:'ミサイル発射口が開いたらそれぞれにボムを投げ込み破壊する',power:'貫通武器で真ん中の操縦士を直接攻撃する'},
  { id:11, name:"ハシラ",kind:'オオモノシャケ',attack:'柱を設置し上からインクを撒き散らす',deth:'うえの撒き散らすシャケを全員倒す',power:'なし'},
  { id:12, name:"ダイバー",kind:'オオモノシャケ',attack:'標的の周りにエリアを生成しその中にいる標的をすべて倒す',deth:'エリアをインクショットによって塗り替えし装甲が剥がれたところを攻撃する',power:'飛び込む準備をしている間に直接攻撃する'},
  { id:13, name:"テッキュウ",kind:'オオモノシャケ',attack:'海辺に設置した発射台から鉄球を投げ，鉄球の着地と同時に2回波を発生させる',deth:'本体を直接攻撃する',power:'なし'},
  { id:14, name:"ナベブタ",kind:'オオモノシャケ',attack:'自身の下からシャケを生成するのと同時に真下に標的がいたら上から潰す',deth:'上から頭を出している操縦士を攻撃する',power:'なし'},
  { id:15, name:"グリル",kind:'オオモノシャケ',attack:'標的に突進してくる',deth:'後ろの弱点を攻撃したあとさらに出てきた弱点を攻撃し続け倒す',power:'装甲貫通武器によって直接攻撃する'},
  { id:16, name:"キンシャケ",kind:'オオモノシャケ',attack:'近づいて殴ってくる',deth:'インクショットを与える',power:'なし'},
  { id:17, name:"ヨコヅナ",kind:'オカシラシャケ',attack:'標的に突進，スーパーチャクチをして攻撃',deth:'インクショットを与える',power:'ジョーがいる場合はジョーに何度も食べさせる'},
  { id:18, name:"タツ",kind:'オカシラシャケ',attack:'口から超巨大爆弾を生成し投げてくる',deth:'生成されている爆弾にインクショットを与え爆発させる',power:'ジョーがいる場合はジョーに爆弾を爆発させる，もしくは本体を直接攻撃する'},
  { id:19, name:"ジョー",kind:'オカシラシャケ',attack:'標的を追いかけ味方諸共すべて地面から捕食する',deth:'後ろにあるたんこぶ（弱点）を攻撃する',power:'本体を直接攻撃する'},
  { id:20, name:"オカシラ連合",kind:'オカシラシャケ',attack:'ヨコヅナ，タツ，ジョーが同時に出てきてそれぞれの攻撃を行う',deth:'それぞれのオカシラシャケをそれぞれの方法で討伐する',power:'ジョーの攻撃でヨコヅナとタツの爆弾を巻き込むことで二つを倒し，ジョーは弱点を攻撃し続けて三体目も倒す'},
];

app.get("/samoran",(req,res) =>{
  res.render('samoran',{data:samochara});
});

app.get("/samoran/create",(req,res)=>{
  res.redirect('/public/samoran_new.html');
});

app.get("/samoran/:number",(req,res)=>{
  const number = req.params.number;
  const detail = samochara[number];
  res.render('samoran_detail',{id:number,data:detail});
});

app.get("/samoran/delete/:number",(req,res)=>{
  samochara.splice( req.params.number, 1 );
  res.redirect('/samoran');
});

app.post("/samoran",(req,res)=>{
  const id = samochara.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const kind = req.body.kind;
  const attack = req.body.attack;
  const deth = req.body.deth;
  const power = req.body.power;
  let new_id = 1;
  new_id = samochara[samochara - 1].id + 1;
  samochara.push({ id: id, code: code, name: name, kind: kind, attack: attack, deth: deth, power: power});
  console.log(samochara);
  res.render('samoran',{data: samochara});
});

app.get("/samoran/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = samochara[number];
  res.render('samoran_edit', { number: number, data: detail });
});

app.post("/samoran/update/:number", (req, res) => {
  const number = req.params.number;
  if (samochara[number]) {
    samochara[number].id = req.body.code;
    samochara[number].name = req.body.name;
    samochara[number].kind = req.body.kind;
    samochara[number].attack = req.body.attack;
    samochara[number].deth = req.body.deth;
    samochara[number].power = req.body.power;
  }
  res.redirect('/samoran');
});



let hunter = [
  {id:1, name:"復讐者",real: "レオ",birth: "12/21",weapon:"サメ人形",subw:"恨みの力",str:"救助狩り",less:"チェイス",dif:1.5},
  {id:2, name:"道化師",real: "ジョーカー",birth: "8/4",weapon:"ドリル",subw:"なし",str:"チェイス",less:"チェイス粘着",dif:1.0},
  {id:3, name:"断罪狩人",real: "ベイン",birth: "5/21",weapon:"チェーンクロウ",subw:"罠",str:"単体チェイス",less:"複数人チェイス",dif:2.0},
  {id:4, name:"リッパー",real: "ジャック",birth: "8/7",weapon:"刃",subw:"霧の刃",str:"壁打ち抜き",less:"粘着対処",dif:1.0},
  {id:5, name:"結魂者",real: "ヴィオレッタ",birth: "1/2",weapon:"義手",subw:"蜘蛛糸",str:"ぐるぐるチェイス",less:"スタン",dif:1.5},
  {id:6, name:"芸者",real: "美智子",birth: "2/28",weapon:"扇子",subw:"なし",str:"単体チェイス",less:"複数人チェイス",dif:1.5},
  {id:7, name:"白黒無常",real: "謝必安/范無咎",birth: "旧暦7/15",weapon:"傘",subw:"なし",str:"暗号機守り",less:"風船粘着対処",dif:2.0},
  {id:8, name:"写真家",real: "ジョゼフ",birth: "3/11",weapon:"剣",subw:"写真世界",str:"暗号機守り",less:"回復",dif:2.5},
  {id:9, name:"狂眼",real: "バルク",birth: "11/27",weapon:"杖",subw:"仕掛け壁",str:"暗号機守り，救助阻止",less:"チェイス力",dif:3.0},
  {id:10, name:"黄衣の王",real: "ハスター",birth: "1/24",weapon:"触手",subw:"なし",str:"救助狩り",less:"複数人チェイス",dif:1.5},
  {id:11, name:"夢の魔女",real: "イドーラ/信徒",birth: "10/2",weapon:"信徒のツルハシ",subw:"なし",str:"暗号機守り",less:"回復",dif:3.0},
  {id:12, name:"泣き虫",real: "ロビー",birth: "4/25",weapon:"斧",subw:"魂",str:"チェイス，粘着対処",less:"暗号機守り",dif:2.0},
  {id:13, name:"魔トカゲ",real: "ルキノ・ドゥルギ",birth: "11/13",weapon:"ナイフ",subw:"ヒップドロップ",str:"救助狩り",less:"粘着対処",dif:2.0},
  {id:14, name:"血の女王",real: "マリー",birth: "11/2",weapon:"ガラスの破片",subw:"鏡像",str:"単体チェイス，暗号機守り",less:"複数人チェイス",dif:2.0},
  {id:15, name:"ガードNo.26",real: "ボンボン",birth: "8/8",weapon:"鉄棍棒",subw:"爆弾",str:"救助狩り",less:"距離チェイス",dif:2.0},
  {id:16, name:"「使徒」",real: "アン",birth: "8/11",weapon:"十字架",subw:"なし",str:"ぐるぐるチェイス",less:"距離チェイス",dif:2.0},
  {id:17, name:"ヴァイオリニスト",real: "アントニオ",birth: "10/27",weapon:"ヴァイオリン",subw:"弦",str:"救助狩り",less:"距離チェイス",dif:1.5},
  {id:18, name:"彫刻師",real: "ガラテア",birth: "11/17",weapon:"彫刻刀",subw:"石像",str:"救助狩り，暗号機守り",less:"チェイス粘着",dif:2.5},
  {id:19, name:"「アンデット」",real: "ペルシー",birth: "5/18",weapon:"大剣",subw:"なし",str:"距離チェイス",less:"回復，ぐるぐるチェイス",dif:1.5},
  {id:20, name:"破輪",real: "ウィル三兄弟",birth: "11/25",weapon:"鉄の車輪",subw:"刺",str:"チェイス，暗号機守り",less:"救助狩り",dif:3.0},
  {id:21, name:"漁師",real: "グレイス",birth: "4/2",weapon:"銛",subw:"湿気",str:"救助狩り",less:"チェイス粘着",dif:2.0},
  {id:22, name:"蝋人形師",real: "フィリップ",birth: "4/16",weapon:"蝋の発射口",subw:"熱蝋",str:"粘着対処",less:"壁粘着",dif:2.0},
  {id:23, name:"「悪夢」",real: "「オルフェウス」",birth: "4/2",weapon:"爪",subw:"なし",str:"チェイス，粘着対処",less:"壁粘着",dif:1.5},
  {id:24, name:"書記官",real: "キーガン",birth: "1/21",weapon:"杖",subw:"記録",str:"暗号機守り",less:"粘着対処",dif:3.0},
  {id:25, name:"隠者",real: "アルヴァ・ロレンツ",birth: "4/20",weapon:"杖",subw:"なし",str:"暗号機負荷，粘着対処",less:"回復",dif:2.0},
  {id:26, name:"夜の番人",real: "イタカ",birth: "12/7",weapon:"斧と杖が一体化したもの",subw:"なし",str:"チェイス",less:"暗号機守り，粘着対処",dif:1.5},
  {id:27, name:"オペラ歌手",real: "サングリア",birth: "9/28",weapon:"サメ人形",subw:"恨みの力",str:"チェイス，暗号機守り",less:"ぐるぐるチェイス",dif:2.5},
  {id:28, name:"「フールズ・ゴールド」",real: "ノートン・キャンベル",birth: "3/19",weapon:"ツルハシ",subw:"なし",str:"暗号機負荷",less:"粘着対処",dif:1.5},
  {id:29, name:"時空の影",real: "アイヴィ",birth: "10/21",weapon:"杖",subw:"なし",str:"粘着対処，暗号機負荷",less:"回復",dif:3.0},
  {id:30, name:"「足萎えの羊」",real: "ジェフリー・ボナビータ",birth: "10/4",weapon:"鎌",subw:"なし",str:"単体チェイス",less:"複数人チェイス",dif:2.5},
  {id:31, name:"「フラバルー」",real: "マイク・モートン",birth: "6/1",weapon:"曲芸玉",subw:"なし",str:"チェイス",less:"粘着対処",dif:2.0},
  {id:32, name:"雑貨賞",real: "バレンティナ・ヤガ・ヴァシーリエヴァ",birth: "不明",weapon:"杖",subw:"砕石売買",str:"チェイス，救助狩り",less:"複数人チェイス",dif:2.0},
  {id:33, name:"「ビリヤード・プレイヤー」",real: "マーカス・ソーン",birth: "不明",weapon:"キュー",subw:"なし",str:"暗号機負荷",less:"高低差チェイス",dif:2.5},
  {id:34, name:"「女王蜂」",real: "メリー・プリニウス",birth: "12/22",weapon:"素手",subw:"毒針",str:"チェイス，救助狩り",less:"高低差チェイス",dif:2.0},
];

app.get("/daigo",(req,res)=>{
  res.render('daigo',{data:hunter});
});

app.get("/daigo/create",(req,res)=>{
  res.redirect('/public/daigo_new.html');
});

app.get("/daigo/:number",(req,res)=>{
  const number = req.params.number;
  const detail = hunter[number];
  res.render('daigo_detail',{id:number,data:detail});
});

app.get("/daigo/delete/:number",(req,res)=>{
  hunter.splice(req.params.number,1);
  res.redirect('/daigo');
});

app.post("/daigo",(req,res)=>{
  const id = hunter.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const real = req.body.real;
  const birth = req.body.birth;
  const weapon = req.body.weapon;
  const subw = req.body.subw;
  const str = req.body.str;
  const less = req.body.less;
  const dif = req.body.dif;
  let new_id = 1;
  new_id = hunter[hunter - 1].id + 1;
  hunter.push({ id: id, code: code, name: name, real:real, birth: birth, weapon: weapon, subw:subw,str: str,less:less,dif: dif});
  console.log(hunter);
  res.render('daigo',{data: hunter});
});

app.get("/daigo/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = hunter[number];
  res.render('daigo_edit', { number: number, data: detail });
});

app.post("/daigo/update/:number", (req, res) => {
  const number = req.params.number;
  if (hunter[number]) {
    hunter[number].id = req.body.code;
    hunter[number].name = req.body.name;
    hunter[number].real = req.body.real;
    hunter[number].birth = req.body.birth;
    hunter[number].weapon = req.body.weapon;
    hunter[number].subw = req.body.subw; 
    hunter[number].str = req.body.str;
    hunter[number].less = req.body.less;
    hunter[number].dif = req.body.dif;
  }
  res.redirect('/daigo');
});


let teams= [
  {id:1, name: "avex ROYALBRATS",join:"20-21Season",main:"Hiphop",people:"13人",win:"20-21Season Champion",url:"https://home.dleague.co.jp/teams/tah0/"},
  {id:2, name: "Benefit one MONOLIZ",join:"20-21Season",main:"VOUGE",people:"13人",win:"なし",url:"https://home.dleague.co.jp/teams/tbvh/"},
  {id:3, name: "CHANGE RAPTURES",join:"25-26Season(20-21Season〜24-25SeasonまでSEPTENI RAPTURESとして活動)",main:"Hiphop",people:"15人",win:"なし",url:"https://home.dleague.co.jp/teams/tqog/"},
  {id:4, name: "Cyber Agent Legit",join:"20-21Season",main:"poppin,lockin",people:"13人",win:"22-23Season〜24-25Season Regular Campion,24-25Season Champion",url:"http://home.dleague.co.jp/teams/t0m9/"},
  {id:5, name: "dip BATTLES",join:"20-21Season",main:"poppin,lockin",people:"18人",win:"なし",url:"https://home.dleague.co.jp/teams/t2ls/"},
  {id:6, name: "DYM MESSENGERS",join:"23-24Season",main:"R&B",people:"14人",win:"なし",url:"https://home.dleague.co.jp/teams/t5fa/"},
  {id:7, name: "FULLCAST RAISERZ",join:"20-21Season",main:"Krump",people:"13人",win:"20-21Season Regular Champion",url:"https://home.dleague.co.jp/teams/ttr7/"},
  {id:8, name: "KADOKAWA DREAMS",join:"20-21Season",main:"Hiphop",people:"15人",win:"22-23Season〜23-24Season Champion",url:"https://home.dleague.co.jp/teams/twme/"},
  {id:9, name: "KOSE 8ROCKS",join:"20-21Season",main:"Breakin",people:"13人",win:"21-22Season Champion",url:"https://home.dleague.co.jp/teams/tmbp/"},
  {id:10, name: "LDH SCREAM",join:"25-26Season",main:"Hiphop",people:"11人",win:"なし",url:"https://home.dleague.co.jp/teams/sng6/"},
  {id:11, name: "LIFUL ALT-RHYTHM",join:"20-21Season",main:"Hiphop,lockin,Wack",people:"11人",win:"なし",url:"https://home.dleague.co.jp/teams/tl6e/"},
  {id:12, name: "List:X",join:"24-25Season",main:"Hiphop",people:"16人",win:"なし",url:"https://home.dleague.co.jp/teams/h7x3/"},
  {id:13, name: "Medial Concierge I'moon",join:"23-24Season(20-21Season〜22-23Seasonまで U-SEN NEXT I'moonとして活動)",main:"Girls",people:"15人",win:"なし",url:"https://home.dleague.co.jp/teams/thrd/"},
  {id:14, name: "M&A SOUKEN QUANTS",join:"25-26Season",main:"Animation",people:"13人",win:"なし",url:"https://home.dleague.co.jp/teams/tv2x/"},
  {id:15, name: "SEGA SUMMY LUX",join:"20-21Season",main:"Hiphop",people:"15人",win:"21-22Season Regular Champion",url:"https://home.dleague.co.jp/teams/t1kf/"},
  {id:16, name: "Valuence INFINITIES",join:"22-23Season",main:"Hiphop,breakin,popin",people:"14人",win:"なし",url:"https://home.dleague.co.jp/teams/t2ui/"},
];

app.get("/dleague",(req,res)=>{
  res.render('dleague',{data:teams});
});

app.get("/dleague/create",(req,res)=>{
  res.redirect('/public/dleague_new.html');
});

app.get("/dleague/:number",(req,res)=>{
  const number = req.params.number;
  const detail = teams[number];
  res.render('dleague_detail',{id:number,data:detail});
});

app.get("/dleague/delete/:number",(req,res)=>{
  teams.splice(req.params.number,1);
  res.redirect('/dleague');
});

app.post("/dleague",(req,res)=>{
  const id = teams.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const join = req.body.join;
  const main = req.body.main;
  const people= req.body.people;
  const win = req.body.win;
  const url= req.body.url;
  let new_id = 1;
  new_id = teams[teams - 1].id + 1;
  teams.push({ id: id, code: code, name: name, join:join, main: main, people: people, win:win,url: url});
  console.log(teams);
  res.render('dleague',{data: teams});
});

app.get("/dleague/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = teams[number];
  res.render('dleague_edit', { number: number, data: detail });
});

app.post("/dleague/update/:number", (req, res) => {
  const number = req.params.number;
  if (temas[number]) {
    teams[number].id = req.body.code;
    teams[number].name = req.body.name;
    teams[number].join = req.body.join;
    teams[number].main = req.body.main;
    teams[number].people = req.body.people;
    teams[number].win = req.body.win; 
    teams[number].url = req.body.url;
  }
  res.redirect('/dleague');
});
app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push( newdata );
  res.render('db1', { data: station });

});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
 {
    judgement = '勝ち';
    win += 1;
    total += 1;
  }
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});
app.get("/janstay", (req, res) => {
  res.render('janken2', {
    your: '（まだ出していません）',
    cpu: '（待機中）',
    judgement: '勝負してください！',
    win: 0,
    total: 0
  })
});
app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  total += 1;
  if (hand === cpu){
    judgement = 'あいこ'
  } else if (
    (hand === 'グー'&& cpu ==='チョキ') ||
    (hand === 'チョキ'&& cpu ==='パー') ||
    (hand === 'パー'&& cpu ==='グー') 
  ){
    judgement = '勝ち';
    win += 1;
  }else{
    judgement = '負け';
  }
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
