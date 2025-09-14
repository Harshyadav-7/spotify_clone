/*
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1> Hello world22</h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

const express = require('express')
const app = express()
const port = 3000


app.use(express.static('private'))

//app.get , app.post, app.put, app.delete(path, handler) req = request, res = respnose
app.get('/', (req, res) => {
  res.send('Hello World!2')
})

app.get('/contact', (req, res) => {
  res.send('contact Us')
})

app.get('/about', (req, res) => {
  res.send('About Us')
})

app.get('/blog/:slug', (req, res) => {
  //logic to fetch {slug} from db
  console.log(req.params);
  console.log(req.query);
  res.send(`Hello ${req.params.slug}`)
})

// app.get('/blog/intro-to-js', (req, res) => {
//   //logic to fetch intro to js from db
//   res.send('intro to js!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})