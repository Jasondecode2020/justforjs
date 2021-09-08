// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.end('Welcome to our home page')
//   }
//   if (req.url === '/about') {
//     res.end('Here is our short history')
//   }
//   res.end(`<h1> Opps!</h1>
//   <p>We can't see the page you are looking for</p>
//   <a href="/">back home</a>
//   `)
// })

// server.listen(5005)

const _ = require('lodash');

const items = [1, [2, [3, [4]]]];
const newItem = _.flattenDeep(items);
console.log(newItem);