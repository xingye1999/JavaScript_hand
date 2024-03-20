function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 交替亮红灯和绿灯
async function trafficLight() {
    while (true) {
        console.log("红灯亮");
        await sleep(3000); // 红灯亮3秒钟
        console.log("绿灯亮");
        await sleep(2000); // 绿灯亮2秒钟
    }
}

// 启动红绿灯交替
trafficLight();