window._AMapSecurityConfig = {
    securityJsCode: "1c8827856ff38902b747fb0b1fff9d7f",
};

let map = null;
let trafficLayer = null;
let satelliteLayer = null;

let geolocation = null;
let driving = null;

AMapLoader.load({
    key: "5f7e68bb9f0896551871961a5fc5f090", //申请好的Web端开发者 key ，调用 load 时必填
    version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
})
    .then((AMap) => {
        // 初始化地图
        map = new AMap.Map("mapContainer", {
            viewMode: "2D", //默认使用 2D 模式
            zoom: 12, //地图级别
            // mapStyle: "amap://styles/dark",
        });

        // 添加交通状况图层
        trafficLayer = new AMap.TileLayer.Traffic({
            visible: false,
            autoRefresh: true, // 是否自动刷新，默认为 false
            interval: 180, // 刷新间隔，默认 180ms
        });

        // 添加卫星图层
        satelliteLayer = new AMap.TileLayer.Satellite({
            visible: false,
        });

        // 将图层添加到 map
        map.add(trafficLayer);
        map.add(satelliteLayer);

        AMap.plugin("AMap.Geolocation", function () {
            //
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位，默认：true
                GeoLocationFirst: true,     // 是否使用浏览器定位，默认：false
                timeout: 10000, // 设置定位超时时间，默认：无穷大
                offset: [20, 20], // 定位按钮的停靠位置的偏移量
                panToLocation: true,    // 定位成功后将定位位置作为地图中心点
                zoomToAccuracy: true,   // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                position: "RB",     // 定位按钮的排放位置,  RB表示右下
                showMarker: true,
                needAddress: true
            });

            map.addControl(geolocation);

            geolocation.getCurrentPosition();
        })
        
        // AMap.plugin("AMap.Driving", function () {
        //     driving = new AMap.Driving({
        //         policy: 0,
        //         map: map,
        //         panel: "panel"
        //     });

        //     var points = [
        //         { keyword: "北京市地震局（公交站）", city: "北京" },
        //         { keyword: "亦庄文化园（地铁站）", city: "北京" },
        //     ];

        //     driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function (status, result) {
        //         // 未出错时，result即是对应的路线规划方案
        //     })
        // })
    })
    .catch((e) => {
        console.error(e); // 加载错误提示
    });

const switchBox = document.querySelectorAll("button[name=choice]");
let flag = null;

// 控制显示图层
switchBox.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        flag = e.target.value == "false" ? true : false;
        switch (e.target.id) {
            case "Traffic":
                flag ? trafficLayer.show() : trafficLayer.hide();
                break;
            case "Satellite":
                flag ? satelliteLayer.show() : satelliteLayer.hide();
                break;
        }
        e.target.value = flag ? "true" : "false"; // 改变按钮的 value
    });
});
