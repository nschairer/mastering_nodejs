/* Core Modules
http - launch a server and send requests
https
fs
path
os

lifecycle - start script,
              parse code register variables and functions,
              event loop - runs as long as listeners are registered

Streams and buffers

stream - req body 1 req body 2 .... req body n -> fully parsed
-- file uploads etc - all req handled this way

*/
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  //process.exit()
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html><head><title>Server</title></head><body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">send</button></form></body></html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk)
      body.push(chunk);
    });
    //buffer the chunks
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    //302 means redirect
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('hello')
  res.end()
});


server.listen(3000);
