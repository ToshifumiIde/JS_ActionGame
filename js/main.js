"use strict";

{
  //スクリーンサイズ//
  const SCREEN_SIZE_WIDTH = 256;
  const SCREEN_SIZE_HEIGHT = 224;

  //canvasの描画準備//
  let can = document.getElementById("can");
  let con = can.getContext("2d");
  let frameCount = 0;

  //画面の生成//
  can.width = SCREEN_SIZE_WIDTH;
  can.height = SCREEN_SIZE_HEIGHT;
  
  //キャラクターの生成//
  let chImg = new Image();
  chImg.src = "sprite.png";
  chImg.onload = draw;
  

  function update(){
  }
  
  //画面描画処理//
  function draw(){
    //背景
    con.fillStyle = "#66AAFF";
    con.fillRect(0, 0, SCREEN_SIZE_WIDTH, SCREEN_SIZE_HEIGHT);
    //キャラクター
    con.drawImage(chImg,  0, 48, 16, 32,  16, 32, 16, 32);
    //drawImageメソッド
    //前半が描画の始点とそこからの描画読み取り範囲
    //後半がcanvasの開始地点とcanvasの表示領域
    frameCount++;
    con.fillStyle ="white";
    con.fillText("Frame:"+frameCount,10,10)
  }

  //メインループ//
  function mainLoop(){
    update();
    draw();
    // setTimeout(mainLoop,1000/60);
  }

  setInterval(mainLoop,1000/60);
  // mainLoop();
}