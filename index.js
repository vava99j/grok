import http from 'http'

// A porta que o seu servidor irá escutar
const PORT = 8000;

// Crie o servidor
const server = http.createServer((req, res) => {
  // Defina o código de status e o tipo de conteúdo
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  // Envie a resposta HTML
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Teste ngrok com Node.js</title>
    </head>
    <body>
        <h1>🚀 Servidor Node.js! 🚀</h1>
        <p>Este conteúdo está vindo diretamente do seu servidor local Node.js.</p>
        <small>Caminho da Requisição: ${req.url}</small>
    </body>
    </html>
  `);
});

// Faça o servidor escutar a porta
server.listen(PORT, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
  console.log('Agora inicie o ngrok no seu segundo terminal: ngrok http 8000');
})


