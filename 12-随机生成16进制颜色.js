function getColor() {
    let s = '#'
    let color = '0123456789ABCDEF'
    for (let i = 0; i < 6; i++) {
        s += color[parseInt(Math.random() * 16)]
    }
    return s
}
console.log(getColor());