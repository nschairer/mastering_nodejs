const fs = require('fs');


const routeHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html><body>')
        res.write('<h1>Hello and welcome to the server at port 3000</h1>')
        res.write('<form action="/create-user" method="POST">')
        res.write('<input name="username" type="text"><button type="submmit">Submit</button>')
        res.write('</form>')
        res.write('</body></html>')
        return res.end();
    }

    if(url === '/users' && method === 'GET') {
        res.write('<html><body>')
        res.write('<ul>')
        res.write(
            '<li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li>'
        )
        res.write('</ul>')
        res.write('</body></html>')
        return res.end();
    }

    if(url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const data = parsedBody.split('=')[1]
            console.log(data)
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        })
    }

    res.end();
}

module.exports = routeHandler;