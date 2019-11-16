/* eslint-disable no-undef */
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server =http.createServer(app)


if (process.env.NODE_ENV !== 'test') {
   server.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`visit localhost:${port}/ on your browser`);
    
});
 
}

module.exports = server;


