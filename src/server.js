const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    let body = '';

    req
        .on('data', (chunk) => {
            body += chunk;
        })
        .on('end', () => {
            body = body.length > 0 ? JSON.parse(body) : {};

            const contentType = {"ContentType": "application/json"};

            if (req.url.startsWith('/register')) {
                if (req.method === 'POST') {
                    res.writeHead(200, contentType);
                    res.end(JSON.stringify({message: "This is the /register endpoint", body }));
                } else {
                    res.writeHead(404, contentType);
                    res.end(JSON.stringify({error: "Invalid HTTP Method"}))
                }
            } else if (req.url.startsWith('/login')) {
                if (req.method === 'POST') {
                    res.writeHead(200, contentType);
                    res.end(JSON.stringify({message: "This is the /login endpoint", body }));
                } else {
                    res.writeHead(404, contentType);
                    res.end(JSON.stringify({error: "Invalid HTTP Method"}));
                }
            } else {
                res.writeHead(404, contentType);
                res.end(JSON.stringify({error: "Invalid Endpoint"}));
            }
        })
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})