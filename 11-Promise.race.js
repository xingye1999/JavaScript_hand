function promiseRace(promiseArr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(val => resolve(val)).catch(err => reject(err))
        }
    })
    
}