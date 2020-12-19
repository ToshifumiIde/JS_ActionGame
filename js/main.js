"use strict";

{
  //基本のスクリーンサイズ//
  const SCREEN_SIZE_W = 256;
  const SCREEN_SIZE_H = 224;

  const GAME_FPS = 1000/60; //1000msの1/60(秒間60回)

  //時間管理の変数//
  let frameCount = 0;//画面上のタイマー
  let startTime  = 0;//requestAnimationFrame()の正確な更新を制御する
  
  //virtualCanvasの生成（倍率制御）
  let vcan = document.createElement("canvas");
  let vcon = vcan.getContext("2d");
  //canvasの描画準備(下記)//
  let  can = document.getElementById("can");
  let  con = can.getContext("2d");
  //画面の生成//
  vcan.width  = SCREEN_SIZE_W;
  vcan.height = SCREEN_SIZE_H;
  can.width   = SCREEN_SIZE_W * 2;
  can.height  = SCREEN_SIZE_H * 2;
  // canvasのボヤけを修正
  con.mozimageSmoothingEnabled    = false;
  con.msimageSmoothingEnabled     = false;
  con.webkitimageSmoothingEnabled = false;
  con.imageSmoothingEnabled       = false;

  //キャラクターの生成//
  let chImg = new Image();
  chImg.src = "sprite.png";
  chImg.onload = draw;
  
  //marioの情報
  let mario_x = 100;
  let mario_y = 150;
  let mario_vx = 0;

  //更新処理
  function update(){
    if(keyb.Left ){
      if(mario_vx > -1) mario_vx -= 1/10;
    } else if(keyb.Right){
      if(mario_vx < 1 ) mario_vx += 1/10;
    } else {
      if(mario_vx > 0)mario_vx -= 1/10;
      if(mario_vx < 0)mario_vx += 1/10;
    }
    console.log(mario_vx);
    mario_x += mario_vx;
  }
  
  //描画処理(仮想環境に描画後、実描画に再描画)//
  function draw(){
    //背景画像を表示
    vcon.fillStyle = "#66AAFF";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);
    //キャラを表示
    vcon.drawImage(chImg,  0, 0, 16, 32,  mario_x, mario_y, 16, 32);
    //drawImageメソッド
    //前半が描画の始点と、始点からの描画読み取り範囲
    //後半がcanvasの開始地点とcanvasの表示領域

    //時間経過
    vcon.font = "16px 'Impact'";
    vcon.fillStyle ="white";
    vcon.fillText(`Frame:${frameCount}`,10,20);
    //仮想描画から実描画へ拡大転送
    con.drawImage(vcan,0,0,vcan.width,vcan.height,  0,0,can.width,can.height);
  }

  //メインループ//
  function mainLoop(){
    let nowTime = performance.now();
    let nowFrame = (nowTime - startTime) /GAME_FPS;
    //ゲームの経過時間がframeCountを上回った際、更新処理を実行
    if(nowFrame > frameCount){
      //処理落ちした際に一定時間で更新を止める
      let count = 0;
      while(nowFrame > frameCount){
        count ++;
        frameCount++;
        update();
        if(++count >= 4)break;
      }
      draw();
    }
    requestAnimationFrame(mainLoop);
    //アニメ更新（但し、更新の瞬間を厳密に制御不可）
    //上記if文にて、更新関数の実行を制御
  }

  //windowの描画が完了後、            //
  //ループ処理を開始（実行・呼び出し）//
  window.onload = function(){
    startTime = performance.now();
    mainLoop();
  }

  //キーボードの処理(連想配列を用意)
  let keyb = [];

  window.addEventListener("keydown" , (e) => {
    if(e.key === "ArrowRight") keyb.Right = true;
    if(e.key === "ArrowLeft") keyb.Left = true;
  });
  window.addEventListener("keyup" , (e) => {
    if(e.key === "ArrowRight"){
      keyb.Right = false;
    };
    if(e.key === "ArrowLeft"){
      keyb.Left = false;
    };
});
}