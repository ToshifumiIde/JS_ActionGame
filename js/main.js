"use strict";

{
  //スクリーンサイズ//
  const SCREEN_SIZE_WIDTH = 256;
  const SCREEN_SIZE_HEIGHT = 224;

  //canvasの描画準備//
  let can = document.getElementById("can");
  let con = can.getContext("2d");

  //画面の生成//
  can.width = SCREEN_SIZE_WIDTH;
  can.height = SCREEN_SIZE_HEIGHT;
  con.fillStyle = "#66AAFF";
  con.fillRect(0, 0, SCREEN_SIZE_WIDTH, SCREEN_SIZE_HEIGHT);

  //キャラクターの生成//
  let chImg = new Image();
  chImg.src = "sprite.png";
  chImg.onload = draw;
  function draw(){
    con.drawImage(chImg,  16, 0, 16, 32,  0, 0, 16, 32);
    //drawImageメソッド
  }

}