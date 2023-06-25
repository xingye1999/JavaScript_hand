// 下划线转驼峰
function undelineToCamel1(str) {
    let arr = str.split('_')
    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1)
    }
    return arr.join('')
}

function undelineToCamel2(str) {

    return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
}

let str1 = 'hello_world'
console.log(undelineToCamel1(str1))
console.log(undelineToCamel2(str1))

// 驼峰转下划线
function camelToUnderline(str) {
    return str.replace(/[A-Z]/g, match => '_' + match.toLowerCase())
}

let str2 = 'helloWorld'
console.log(camelToUnderline(str2))
