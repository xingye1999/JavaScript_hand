function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 使用示例
console.log("开始")
sleep(2000) // 等待2秒
  .then(() => {
    console.log("2秒后")
  })
