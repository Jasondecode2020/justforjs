const { readFile, writeFile } = require('fs')

readFile('./content/2.txt', 'utf-8', (err, result) => {
  if (err) {
    console.log(err);
    return
  }
  const first = result;
  readFile('./content/sucontent/1.txt', 'utf-8', (err, result) => {
    if (err) {
      console.log(err);
      return
    }
    const second = result;
    writeFile('./content/result-async.txt',
      `Here is the result ${first}, ${second}`, (err, result) => {
        if (err) {
          return;
          console.log(err);
        }
        console.log(result);
      })
  })
})


// compare
// const { readFile, writeFile } = require('fs')
// console.log("start");
// readFile('./content/2.txt', 'utf-8', (err, result) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   const first = result;
//   readFile('./content/sucontent/1.txt', 'utf-8', (err, result) => {
//     if (err) {
//       console.log(err);
//       return
//     }
//     const second = result;
//     writeFile('./content/result-async.txt',
//       `Here is the result ${first}, ${second}`, (err, result) => {
//         if (err) {
//           return;
//           console.log(err);
//         }
//         console.log("done with this task");
//       })
//   })
// })
// console.log("starting the next one");

// const { readFileSync, writeFileSync } = require('fs')
// console.log("start");
// const first = readFileSync('./content/2.txt', 'utf8')
// const second = readFileSync('./content/sucontent/1.txt', 'utf8')

// console.log(first, second)
// writeFileSync('./content/result-sync.txt',
//   `Here is the result ${first}, ${second}`, { flag: 'a' })

// console.log("done with this task");
// console.log("starting the next one");