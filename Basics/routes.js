const fs = require('fs');

const requestHandler = (req, res) => {
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
        return req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split('=')[1];
          fs.writeFile('message.txt', message, (e) => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            //response sent when done working with file -- non blocking
            return res.end();
          });
          //writeFileSync is synchronous aka blockings
        });
        //302 means redirect
      }
      res.setHeader('Content-Type', 'text/html');
      res.write('hello')
      res.end()
};

module.exports = requestHandler;
//exports.handler = requestHandler;
//module.exports = {handler: requestHandler};