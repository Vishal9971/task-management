require('dotenv').config();
const app = require('./src/app.js');
const socket = require('./src/socket');
const http = require('http');
const connectDB = require('./src/config/db');
connectDB();

const server = http.createServer(app);
socket.init(server);


server.listen(process.env.PORT||5000, (req, res) => {
  console.log(`Serve running on port ${process.env.PORT}`);
});