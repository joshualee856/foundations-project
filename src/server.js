const express = require('express');
const PORT = 3000;

// Endpoint Handlers
const registerRouter = require('./controller/RegisterRouter');
const loginRouter = require('./controller/LoginRouter');
const ticketRouter = require('./controller/TicketRouter')

const server = express();

server.use(express.json());

// Endpoints
server.use('/register', registerRouter);
server.use('/login', loginRouter);
server.use('/tickets', ticketRouter)

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})