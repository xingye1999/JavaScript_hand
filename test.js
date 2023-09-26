// const a = [
//   [1, 2],
//   [3, 4],
// ]
const ws = new WeakSet()
ws.add([1, 2])
ws.add([1, 2, 3])
console.log(ws)
// for (let v of ws) {
//   console.log(v)
// }

// let ws = new Set()
// ws.add(1)
// ws.add(2)
// console.log(ws)
// for (let v of ws) {
//   console.log(v)
// }
