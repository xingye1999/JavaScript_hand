const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}]
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]

// 方法一、Set
const set = Array.from(new Set(arr))
console.log(set)
// 方法二、indexOf
const res = []
for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i])
}
console.log('indexOf', res)
