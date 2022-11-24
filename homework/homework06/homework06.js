window.onload = function() {
    const data = document.getElementById("data");   // 获取用户输入数据的input标签
    const result = document.getElementById("result");     // 获取显示结果的元素
    var aa;     // 存储input标签里的值
    var reward = 0;     // 结果值，初始化为0
    
    // document.getElementById("btn").addEventListener("click", count);     // 添加事件监听器，当点击按钮时计算结果

    function count() {
        aa = data.value;    // 获取input标签里的值

        // 业务逻辑
        if (aa >= 0 && aa <= 100000) {   // 第一种情况
            reward = aa * 0.1;
        } else if (aa >= 100000 && aa < 200000) {   // 第二种情况
            reward = (100000 * 0.1) + ((aa - 100000) * 0.075);
        } else if (aa >= 200000 && aa < 400000) {   // 第三种情况
            reward = (100000 * 0.1) + (100000 * 0.075) + ((aa - 200000) * 0.05);
        } else if (aa >= 400000 && aa < 600000) {   // 第四种情况
            reward = (100000 * 0.1) + (100000 * 0.075) + (200000 * 0.05) + ((aa - 400000) * 0.03);
        } else if (aa >= 600000 && aa < 1000000) {  // 第五种情况
            reward = (100000 * 0.1) + (100000 * 0.075) + (200000 * 0.05) + (200000 * 0.03) + ((aa - 600000) * 0.015);
        } else if (aa > 1000000) {      // 第六种情况
            reward = (100000 * 0.1) + (100000 * 0.075) + (200000 * 0.05) + (200000 * 0.03) + (400000 * 0.015) + ((aa - 600000) * 0.01);
        } else {    // 非法输入
            reward = "输入错误"
        }

        console.log(reward);    // 在控制台输出

        if (isNaN(reward)) {
            result.innerHTML = reward;  // 当输入非法时，显示错误信息
        } else {
            // 不四舍五入
            // result.innerText = reward + "元";     // 输入合法，替换页面中的结果值

            // 四舍五入
            result.innerHTML = reward.toFixed(2) + "元";     // 输入合法，替换页面中的结果值
        }
    }

    setInterval(count, 500);    // 设定自动执行
}
