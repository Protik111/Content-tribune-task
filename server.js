require('dotenv').config();

const http = require('http');

//import appliction
const app = require('./app/app.js');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Listening To Port ${PORT}`);
});