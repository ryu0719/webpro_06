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

app.get("/samoran",(req,res) =>{
  res.render('samoran',{data:samochara});
});

app.get("/samoran/:number",(req,res)=>{
  const number = req.params.number;
  const detail = samochara[number];
  res.render('samoran_detail',{data:detail});
});

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
