window.onload = function() {
    var i = 1, j = 1;   // 初始化控制循环的变量
    var consoleResult = "";     // 存储每一行结果的变量（在控制台输出，下称控制台变量）
    var windowResult = "";      // 存储每一行结果的变量（在页面中输出，下称页面变量）

    function count() {
        // 业务逻辑
        for (; i < 10; i++) {
            for (; j <= i; j++) {
                consoleResult = consoleResult + " " + i * j;    // 将结果存放在控制台变量中
            }
            j = 1;
            console.log(consoleResult);     // 输出控制台变量
            windowResult = windowResult + consoleResult + "<br/>";     // 在控制台变量后添加换行符，替换到页面中时就能得到和控制台中相同的输出
            consoleResult = "";     // 将控制台变量清空
        }
        document.getElementById("result").innerHTML = windowResult;     // 在页面中输出页面变量
    }
    
    count();
}