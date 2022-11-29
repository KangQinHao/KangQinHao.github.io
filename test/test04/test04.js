window.onload = function() {
    const timer = document.getElementById("timer");   // 获取计时器元素
    const countDown = document.getElementById("countDown");   // 获取倒计时元素
    const windowTime = document.getElementById("windowTime");     // 获取页面中显示时间的元素
    const windowDate = document.getElementById("windowDate");     // 获取页面中显示日期的元素
    var toolTimer;  // 存储工具类中计时器的循环事件
    var toolCountDown;      // 存储工具类中倒计时的循环事件
    var alertColor;     // 存储屏幕闪烁的循环事件
    var timerFlag = false;  // 计时器的工作状态
    var countDownFlag = false;      // 倒计时的工作状态
    var timerCount = 0;     // 计时器计数，以秒为单位
    var countDownCount;     // 倒计时计数
    var countH = 0, countM = 20, countS = 0;     // 倒计时时、分、秒预设值
    var customH = 0, customM = 20, customS = 0;     // 用户设定的倒计时时、分、秒值
    var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];     // 存储星期的数组
    var refDate;    // 存储参考时间的变量

    window.addEventListener("selectstart", function(e) {e.preventDefault();})  // 整个页面禁止选中，提升使用体验
    windowTime.addEventListener("click", clearTimer)    // 单击日期重置计时器
    windowDate.addEventListener("click", clearCountDown)    // 单击日期重置倒计时
    timer.addEventListener("click", setTimer);          // 给计时器添加鼠标点击事件监听器
    countDown.addEventListener("click", startCountDown);     // 给倒计时添加鼠标点击事件监听器
    controlMouseWheel(true);    // 调用函数为倒计时的时、分、秒span添加事件监听器

    // 设定页面中显示时间的元素
    function setTime() {
        refDate = new Date();
        windowTime.innerText = fullTime(refDate.getHours()) + ":" + fullTime(refDate.getMinutes()) + ":" + fullTime(refDate.getSeconds());
        /* windowTime.innerText = refDate.toLocaleTimeString();
        windowTime.style.fontSize = "12.7vw"; */
        setDate();
    }

    // 设定页面中显示日期的元素
    function setDate() {
        refDate = new Date();
        windowDate.innerText = refDate.getFullYear() + "年" + (refDate.getMonth() + 1) + "月"+ refDate.getDate() + "日" + "  " + weekArray[refDate.getDay()];
        // windowDate.innerText = refDate.toLocaleDateString() + "  " + weekArray[refDate.getDay()];
    }

    // 计时器的函数：开始和暂停
    function setTimer() {
        timerFlag = !timerFlag;     // 改变计时器状态
        var h = 0, m = 0, s = 0;
        if (timerFlag) {
            toolTimer = setInterval(() => {
                timerCount += 1;    // 以秒为单位
                h = fullTime(Math.floor(timerCount / 3600));
                if (h == 100) {     // 超过计时范围，计时器归零
                    timerCount = 0;
                    alert("超出计时器的范围了！！！");
                }
                m = fullTime(Math.floor((timerCount - (h * 3600)) / 60));
                s = fullTime(Math.floor(timerCount - (h * 3600) - (m * 60)));
                timer.innerHTML = h + ":" + m + ":" + s;
            }, 1000);
        } else {
            clearInterval(toolTimer);
        }
    }

    // 计时器的函数：清空
    function clearTimer() {
        timerFlag = false;
        clearInterval(toolTimer);
        timerCount = 0;     // 清空计时器计数
        timer.innerHTML = "00:00:00";
    }

    // 设定倒计时的“时”
    function setCountH() {
        countH = parseInt(setCountDown(countH));    // 将其转换为数字
        document.getElementById("countH").innerText = fullTime(countH);     // 格式化之后替换到界面中
    }

    // 设定倒计时的“分”
    function setCountM() {
        countM = parseInt(setCountDown(countM));    // 将其转换为数字
        document.getElementById("countM").innerText = fullTime(countM);     // 格式化之后替换到界面中
    }

    // 设定倒计时的“秒”
    function setCountS() {
        countS = parseInt(setCountDown(countS));    // 将其转换为数字
        document.getElementById("countS").innerText = fullTime(countS);     // 格式化之后替换到界面中
    }

    // 设定倒计时的三个参数（时、分、秒）
    function setCountDown(data) {
        var e = e || window.event;
        if (e.detail > 0 || e.wheelDelta < 0) {     // 鼠标滚轮向下滚动，减少
            --data;
            if (data < 0) {     // 低于0时
                data = 59;
            }
        }
        if (e.detail < 0 || e.wheelDelta > 0) {     // 鼠标滚轮向上滚动，增加
            ++data;
            if (data > 59) {     // 超过59时
                data = 0;
            }
        }
        return data;
    }

    // 倒计时的函数：开始与暂停
    function startCountDown() {
        countDownFlag = !countDownFlag;     // 改变倒计时的状态
        countDownCount = countH * 3600 + countM * 60 + countS;     // 以秒为单位，计算总的秒数
        if (countDownCount == 0) {  // 当设定的时、分、秒都等于0时，退出函数
            return null;
        }
        controlMouseWheel(false);   // 当倒计时启动后，移除倒计时时、分、秒span的事件监听器，禁止在此期间修改倒计时的时、分、秒
        if (countDownFlag) {
            customH = countH, customM = countM, customS = countS;   // 将用户设定的值保存起来
            toolCountDown = setInterval(() => {
                countDownCount -= 1;
                if (countDownCount == 0) {
                    alertCountDown(true);   // 调用计时结束后闪烁屏幕的函数
                    clearInterval(toolCountDown);   // 停止倒计时
                }
                countH = fullTime(Math.floor(countDownCount / 3600));
                countM = fullTime(Math.floor((countDownCount - (countH * 3600)) / 60));
                countS = fullTime(Math.floor(countDownCount - (countH * 3600) - (countM * 60)));
                document.getElementById("countH").innerText = countH;
                document.getElementById("countM").innerText = countM;
                document.getElementById("countS").innerText = countS;
            }, 1000);
        } else {
            clearInterval(toolCountDown);
        }
    }

    // 倒计时的函数：清空
    function clearCountDown() {
        countDownFlag = false;  // 修改倒计时的工作状态
        clearInterval(toolCountDown);   // 停止倒计时
        alertCountDown(false);   // 调用计时结束后闪烁屏幕的函数
        controlMouseWheel(true);   // 调用函数为倒计时的时、分、秒span添加鼠标滚轮事件监听器
        // 恢复默认值
        countH = customH, countM = customM, countS = customS;   // 将时、分、秒恢复为用户设定的值
        document.getElementById("countH").innerText = fullTime(countH);     // 页面中的“时”
        document.getElementById("countM").innerText = fullTime(countM);     // 页面中的“分”
        document.getElementById("countS").innerText = fullTime(countS);     // 页面中的“秒”
    }

    // 当倒计时计时结束，闪烁屏幕以提示
    function alertCountDown(alertFlag) {
        var count = 0;
        if (alertFlag) {
            alertColor = setInterval(() => {
                count += 1;
                if (count % 2 == 0) {
                    document.body.style.background = "black";   // 设置背景颜色
                    document.body.style.setProperty("--font-color", "red");     // windowDate的hover字体颜色
                    document.body.style.setProperty("--window-color", "black");   // 其他元素的字体颜色
                    windowDate.style.color = "red";     // windowDate的字体颜色
                    countDown.style.color = "red";  // countDown的字体颜色
                } else {
                    document.body.style.background = "red";   // 设置背景颜色
                    document.body.style.setProperty("--font-color", "black");     // windowDate的hover字体颜色
                    document.body.style.setProperty("--window-color", "red");   // 其他元素的字体颜色
                    windowDate.style.color = "black";     // windowDate的字体颜色
                    countDown.style.color = "black";    // countDown的字体颜色
                }
            }, 500);
        } else {
            clearInterval(alertColor);  // 点击windowDate时，停止闪烁
            document.body.style.background = "black";   // 设置背景颜色
            document.body.style.setProperty("--font-color", "red");     // windowDate的hover字体颜色
            document.body.style.setProperty("--window-color", "white");   // 其他元素的字体颜色
            windowDate.style.color = "white";     // windowDate的字体颜色
            countDown.style.color = "white";    // countDown的字体颜色
        }
    }

    // 补全（格式化）时、分、秒
    function fullTime(data) {
        data = parseInt(data);
        if (data / 10 < 1) {    // 为一位数时
            return "0" + data;
        } else {    // 为两位数时
            return data;
        }
    }

    function controlMouseWheel(flag) {
        if (flag) {
            // 给倒计时添加鼠标滚轮事件监听器，火狐比较特殊
            document.getElementById("countH").addEventListener("mousewheel", setCountH);         // 非火狐
            document.getElementById("countH").addEventListener("DOMMouseScroll", setCountH);     // 火狐
            document.getElementById("countM").addEventListener("mousewheel", setCountM);         // 非火狐
            document.getElementById("countM").addEventListener("DOMMouseScroll", setCountM);     // 火狐
            document.getElementById("countS").addEventListener("mousewheel", setCountS);         // 非火狐
            document.getElementById("countS").addEventListener("DOMMouseScroll", setCountS);     // 火狐
        } else {
            // 给倒计时添加鼠标滚轮事件监听器，火狐比较特殊
            document.getElementById("countH").removeEventListener("mousewheel", setCountH);         // 非火狐
            document.getElementById("countH").removeEventListener("DOMMouseScroll", setCountH);     // 火狐
            document.getElementById("countM").removeEventListener("mousewheel", setCountM);         // 非火狐
            document.getElementById("countM").removeEventListener("DOMMouseScroll", setCountM);     // 火狐
            document.getElementById("countS").removeEventListener("mousewheel", setCountS);         // 非火狐
            document.getElementById("countS").removeEventListener("DOMMouseScroll", setCountS);     // 火狐
        }
    }

    setInterval(setTime, 100);  // 设定自动刷新时间
}
