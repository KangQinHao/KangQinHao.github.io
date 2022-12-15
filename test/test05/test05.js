window.onload = function() {
    var flag = false;
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    var sampleImage = document.getElementById("heart");

    function controlCanvas() {
        if (flag) {
            ctx.clearRect(0, 0, 250, 250);
        } else {
            ctx.drawImage(sampleImage, 0, 0, 250, 250);
        }
        flag = !flag;
    }

    setInterval(controlCanvas, 750);
}