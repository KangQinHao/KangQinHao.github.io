window.onload = function() {
  var flag = false;
  var myCanvas = document.getElementById("myCanvas");
  var ctx = myCanvas.getContext("2d");
  var sampleImage = document.getElementById("heart");

  function controlCanvas() {
      ctx.drawImage(sampleImage, 25, 25, 200, 200);
      if (flag) {
          ctx.clearRect(0, 0, 250, 250);
          ctx.drawImage(sampleImage, 25, 25, 200, 200);
      } else {
          ctx.clearRect(25, 25, 200, 200);
          ctx.drawImage(sampleImage, 0, 0, 250, 250);
      }
      flag = !flag;
  }

  setInterval(controlCanvas, 750);
}
