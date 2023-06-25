let url = 'http://search.360buy.com/Search?keyword=HTCone&enc=utf-8&area=1'
function parse(url) {
    let arr = url.split('?')[1].split('&')
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        [k, v] = arr[i].split('=')
        obj[k] = v
    }
    return obj
}
console.log(parse(url))
