function longestPalindrome(s) {
  let set = new Set()
  let count = 0
  for (let val of s) {
    if (set.has(val)) {
      set.delete(val)
      count += 2
    } else {
      set.add(val)
    }
  }

  return count < s.length ? count + 1 : count
}

let s = 'abccccdd'
console.log(longestPalindrome(s))
