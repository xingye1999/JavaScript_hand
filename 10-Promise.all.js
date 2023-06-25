
function promiseAll(promiseArr) {
    return new Promise((resolve, reject) => {
        let ans = []
        let index = 0
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then( res => {
                ans[i] = res
                if (++index === promiseArr.length) resolve(ans)
            }).catch(err => reject(err))
        }
    })
    
}