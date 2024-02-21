const express = require('express');
const PORT = 3000;

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!'})
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})