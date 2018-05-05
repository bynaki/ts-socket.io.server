const arr = []

arr[1] = function() {
  console.log('Hello')
}

console.log(arr[0])
console.log(arr[1])
console.log(arr[2])


function say(...args) {
  args.forEach((i, idx) => {
    i()
  })
}

say(...arr.filter(i => i))