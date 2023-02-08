const express = require('express');
const http = require("http")
const { default: next } = require("next");
const Server = require("socket.io").Server;

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server();
    io.attach(server);

    app.get('/hello', async (_, res) => {
        res.send('Hello World')
    });

    app.use(function (req, res, next) {
        req.io = io;
        next();
    });

    app.all('*', (req, res) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
