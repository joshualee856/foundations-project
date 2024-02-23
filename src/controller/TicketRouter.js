// Endpoint: /tickets

const express = require('express');
const router = express.Router();

const ticketService = require('../service/TicketService');

router.post('/', async (req, res) => {
    const ticket = await ticketService.createTicket(req.body);
    if (!ticket.error) {
        res.status(202).json(ticket)
    } else {
        res.status(400).json(ticket.error);
    }
})

module.exports = router;