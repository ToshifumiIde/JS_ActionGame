"use strict";

{
  //スクリーンサイズ//
  const SCREEN_SIZE_WIDTH = 256;
  const SCREEN_SIZE_HEIGHT = 224;
  const GAME_FPS = 1000/60; //1000msの1/60(秒間60回)

  //canvasの描画準備//
  let can = document.getElementById("can");
  let con = can.getContext("2d");

  //時間管理の変数//
  let frameCount = 0;//画面上のタイマー
  let startTime = 0;//requestAnimationFrame()の正確な更新を制御する


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
    con.drawImage(chImg,  80, 0, 16, 32,  16, 32, 16, 32);
    //drawImageメソッド
    //前半が描画の始点と、始点からの描画読み取り範囲
    //後半がcanvasの開始地点とcanvasの表示領域
    con.font = "16px 'Impact'";
    con.fillStyle ="white";
    con.fillText(`Frame:${frameCount}`,10,20)
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
        // count ++;
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
}