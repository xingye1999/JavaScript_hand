const customPromise = new Promise((resolve, reject) => {
  console.log(1)
  resolve("Resolved one!")
  //reject("Reject one!")
})
customPromise
  .then((result) => {
    console.log(2)
    console.log("first", result)
    return 3
  })
  .then((result) => {
    console.log("second", result)
    return 5
  })
  .then(4)
  .then((result) => {
    console.log("third", result)
  })
  .catch((e) => {
    console.log(e)
  })
