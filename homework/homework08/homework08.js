window.onload = function() {
    var data = document.getElementById("data");     // 获取用户输入数据的input标签
    var i, j;   // 控制循环的变量
    var n;
    var consoleResult = "";     // 存储每一行结果的变量（在控制台输出，下称控制台变量）
    var windowResult = "";      // 存储每一行结果的变量（在页面中输出，下称页面变量）

    // document.getElementById("btn").addEventListener("click", count);     // 添加事件监听器，当点击按钮时计算结果

    // 业务逻辑
    function count() {
        // 当data为奇数时，中间一层不重复
        if (data.value % 2 == 1) {
            n = Math.ceil(data.value / 2);
            // 打印上层
            for (i = 1; i <= n; i++) {
                // 打印上层空格
                for (j = 0; j < n - i; j++) {
                    consoleResult = consoleResult + " ";
                    windowResult = windowResult + "&nbsp;";
                }
                // 打印上层"*"
                for (j = 1; j <= 2 * i - 1; j++) {
                    consoleResult = consoleResult + "*";
                    windowResult = windowResult + "*";
                }
                windowResult = windowResult + "<br/>";      // 添加换行
                console.log(consoleResult);     // 输出控制台变量
                consoleResult = "";     // 将控制台变量清空
            }
            // 打印下层
            for (i = n - 1; i >= 1; i--) {
                // 打印下层空格
                for (j = 1; j <= n - i; j++) {
                    consoleResult = consoleResult + " ";
                    windowResult = windowResult + "&nbsp;";
                }
                // 打印下层层"*"
                for (j = 2 * i - 1; j >= 1; j--) {
                    consoleResult = consoleResult + "*";
                    windowResult = windowResult + "*";
                }
                windowResult = windowResult + "<br/>";      // 添加换行
                console.log(consoleResult);     // 输出控制台变量
                consoleResult = "";     // 将控制台变量清空
            }
        } else {    // 当data为偶数时，中间一层重复
            n = data.value / 2;
            // 打印上层
            for (i = 1; i <= n; i++) {
                // 打印上层空格
                for (j = 0; j < n - i; j++) {
                    consoleResult = consoleResult + " ";
                    windowResult = windowResult + "&nbsp;";
                }
                // 打印上层"*"
                for (j = 1; j <= 2 * i - 1; j++) {
                    consoleResult = consoleResult + "*";
                    windowResult = windowResult + "*";
                }
                windowResult = windowResult + "<br/>";      // 添加换行
                console.log(consoleResult);     // 输出控制台变量
                consoleResult = "";     // 将控制台变量清空
            }
            // 打印下层
            for (i = n; i >= 1; i--) {
                // 打印上层空格
                for (j = 1; j <= n - i; j++) {
                    consoleResult = consoleResult + " ";
                    windowResult = windowResult + "&nbsp;";
                }
                // 打印上层"*"
                for (j = 2 * i - 1; j >= 1; j--) {
                    consoleResult = consoleResult + "*";
                    windowResult = windowResult + "*";
                }
                windowResult = windowResult + "<br/>";      // 添加换行
                console.log(consoleResult);     // 输出控制台变量
                consoleResult = "";     // 将控制台变量清空
            }
        }

        document.getElementById("result").innerHTML = windowResult;     // 在页面中输出页面变量
        windowResult = "";  // 清空页面变量
    }

    setInterval(count, 500);    // 设定自动执行
}