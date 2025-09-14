import { createServer } from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello world</h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




// import {a,b,e} from "./server.js"
// console.log(a,b,e);


import obj from "./server.js"
console.log(obj);

// const a = require("./server.js")
// console.log(a)