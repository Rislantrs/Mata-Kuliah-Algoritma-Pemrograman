const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Mengizinkan akses CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handling preflight request (OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.writeHead(200, { 
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);

    // Endpoint POST untuk penjumlahan
    if (parsedUrl.pathname === '/penjumlahan' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const postData = JSON.parse(body);
            const angkaPertama = parseFloat(postData.angkaPertama);
            const angkaKedua = parseFloat(postData.angkaKedua);
            const hasil = angkaPertama + angkaKedua;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ hasil }));
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});