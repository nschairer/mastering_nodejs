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

npm start -works without run
npm run <script name>
.gitignore --- ** wildcard to ignore all instances of something

*/
const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);

server.listen(3000);
