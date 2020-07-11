// Global Object
setTimeout(() => {
  console.log(`het`)
  clearInterval(int)
}, 3000)

const int = setInterval(() => {
  console.log('in the int')
}, 1000)

// Directories, files
console.log(__dirname)
console.log(__filename)