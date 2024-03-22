window._AMapSecurityConfig = {
    securityJsCode: "1c8827856ff38902b747fb0b1fff9d7f",
};

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.querySelector(".loading").style.display = "none";
    }
};

let map = null; // 常规地图实例
let scale = null; // 比例尺实例
let trafficLayer = null; // 交通地图实例
let satelliteLayer = null; // 卫星地图实例

let geolocation = null; // 定位实例
let driving = null; // 路线规划实例
let endPoint = null; // 路线规划的终点
let autoComplete = null; // 搜索

AMapLoader.load({
    key: "5f7e68bb9f0896551871961a5fc5f090", //申请好的Web端开发者 key ，调用 load 时必填
    version: "2.0",
})
    .then((AMap) => {
        // 初始化地图
        map = new AMap.Map("mapContainer", {
            viewMode: "2D", //默认使用 2D 模式
            zoom: 12, //地图级别
            showMarker: true,
            // mapStyle: "amap://styles/dark",
        });

        // 添加交通状况图层
        map.add(
            (trafficLayer = new AMap.TileLayer.Traffic({
                visible: false,
                autoRefresh: true, // 是否自动刷新，默认为 false
                interval: 180, // 刷新间隔，默认 180ms
            }))
        );

        // 添加卫星图层
        map.add(
            (satelliteLayer = new AMap.TileLayer.Satellite({
                visible: false,
            }))
        );

        // 添加比例尺
        AMap.plugin("AMap.Scale", function () {
            scale = new AMap.Scale({
                position: "LB",
            });

            map.addControl(scale);
        });

        // 定位
        AMap.plugin("AMap.Geolocation", function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位，默认：true
                GeoLocationFirst: true, // 是否使用浏览器定位，默认：false
                timeout: 10000, // 设置定位超时时间，默认：无穷大
                offset: [20, 20], // 定位按钮的停靠位置的偏移量
                panToLocation: true, // 定位成功后将定位位置作为地图中心点
                zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                position: "RB", // 定位按钮的排放位置,  RB表示右下
                showMarker: true, // 定位标点
                showCircle: false,
                noIpLocate: 0, // 允许使用 IP 定位
                needAddress: true, // 精确位置
            });

            map.addControl(geolocation);

            geolocation.getCurrentPosition();
        });

        // 路线规划
        // AMap.plugin("AMap.Driving", function () {
        //     driving = new AMap.Driving({
        //         policy: 0,
        //         map: map,
        //         panel: "drivingResult"
        //     });

        //     points = [
        //         { keyword: "北京市地震局（公交站）", city: "北京" },
        //         { keyword: "亦庄文化园（地铁站）", city: "北京" },
        //     ];

        //     driving.search(points)
        // })

        // 搜索
        AMap.plugin("AMap.AutoComplete", function () {
            autoComplete = new AMap.AutoComplete({
                input: "type",
            });

            autoComplete.on('select', function (e) {
                // console.log(e)
                var position = new AMap.LngLat(e.poi.location.lng, e.poi.location.lat)
                map.setZoomAndCenter(17, position);
                map.add(new AMap.Marker({
                    position: position,
                }))
            })
        });

        // 搜索地点相关信息
        // AMap.plugin("AMap.PlaceSearch", function () {
        //     var placeSearch = new AMap.PlaceSearch({
        //         //city 指定搜索所在城市，支持传入格式有：城市名、citycode 和 adcode
        //         city: "010",
        //     });

        //     placeSearch.search("北京大学", function (status, result) {
        //         if ( status == 'complete' ) {
        //             //查询成功时，result 即对应匹配的 POI 信息
        //             console.log(result);
        //         } else {
        //             console.log('fail');
        //         }
        //     });
        // });
    })
    .catch((e) => {
        console.error(e); // 加载错误提示
    });

const switchBox = document.querySelectorAll("button[name=choice]");

// 控制显示图层
switchBox.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        var flag = e.target.value == "false" ? true : false;
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
