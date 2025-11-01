const http = require('http'); // Perbaiki typo di sini

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Selamat datang di aplikasi Node.js sederhana!\n');
  } else if (req.url === '/contact') {
    res.end(`Nama: M Rislan Tristansyah\nNIM: 2307874\nEmail: rislantrs203@upi.edu\n`);
  } else {
    res.statusCode = 404;
    res.end('Halaman tidak ditemukan!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server berjalan di http://${hostname}:${port}/`); 
});