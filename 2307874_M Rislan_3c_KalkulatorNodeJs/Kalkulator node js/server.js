const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Mengizinkan akses CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handling preflight request (OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/hitung' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(
            'Endpoint ini menerima request POST dengan JSON { angkaPertama: <number>, angkaKedua: <number>, operasi: <string> } ' +
            'untuk menghitung operasi yang diminta. Operasi yang tersedia: penjumlahan, pengurangan, perkalian, pembagian.'
        );

    } else if (parsedUrl.pathname === '/hitung' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const postData = JSON.parse(body);
                const angkaPertama = parseFloat(postData.angkaPertama);
                const angkaKedua = parseFloat(postData.angkaKedua);
                const operasi = postData.operasi;

                if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid input. Please provide valid numbers.');
                    return;
                }

                let hasil;
                switch (operasi) {
                    case 'penjumlahan':
                        hasil = angkaPertama + angkaKedua;
                        break;
                    case 'pengurangan':
                        hasil = angkaPertama - angkaKedua;
                        break;
                    case 'perkalian':
                        hasil = angkaPertama * angkaKedua;
                        break;
                    case 'pembagian':
                        if (angkaKedua === 0) {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.end('Error: Division by zero is not allowed.');
                            return;
                        }
                        hasil = angkaPertama / angkaKedua;
                        break;
                    default:
                        res.writeHead(400, { 'Content-Type': 'text/plain' });
                        res.end('Invalid operation. Please specify one of: penjumlahan, pengurangan, perkalian, pembagian.');
                        return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ operasi, hasil }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
