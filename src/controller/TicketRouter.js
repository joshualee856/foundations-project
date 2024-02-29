// Endpoint: /tickets

const express = require('express');
const router = express.Router();

const ticketService = require('../service/TicketService');
const jwt = require('jsonwebtoken');
const secretKey = 'mdJk9JTAjWzelmwQEmF0';

router.post('/', authenticateToken, async (req, res) => {

    // Parse ticket data from request body and jwt token (for author attribute)
    let ticketData = {
        author: req.employee.employee_id,
        description: req.body.description,
        type: req.body.type,
        amount: req.body.amount,
    }
    const ticket = await ticketService.createTicket(ticketData);

    if (!ticket.error) {
        res.status(202).json(ticket)
    } else {
        res.status(400).json(ticket.error);
    }
})

router.get('/', authenticateManagerToken, async (req, res) => {
    const statusQuery = req.query.status;

    const tickets = await ticketService.getTicketsByStatus(statusQuery);
    res.status(200).json(tickets);

    // res.json({ 
    //     message: 'This is the /tickets?status=Pending endpoint for managers only',
    //     status: statusQuery
    // })
})

router.get('/:author', authenticateToken, async (req, res) => {
    const author = req.params.author;
    const employee_id = req.employee.employee_id;
    console.log(`author: ${author}, employee_id: ${employee_id}`)

    if (author === employee_id) {
        const tickets = await ticketService.getTicketsByAuthor(author);
        res.status(200).json(tickets);
    } else {
        res.status(403).json({ error: 'Current user is not the author of the ticket' })
    }
})

router.put('/:ticket_id', authenticateManagerToken, async (req, res) => {
    let ticket_id = req.params.ticket_id;
    let status = req.body.status;

    let updatedTicket = await ticketService.updateTicketStatus(ticket_id, status);
    if (!updatedTicket.error) {
        res.status(200).json(updatedTicket);
    } else {
        res.status(403).json({ error: updatedTicket.error })
    }
    
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized Access" });
        return;
    }

    jwt.verify(token, secretKey, (err, employee) => {
        if (err || (employee.role !== 'Employee' && employee.role !== 'Manager')) {
            res.status(403).json({ message: "Forbidden Access" });
            return;
        }
        req.employee = employee;
        next();
    })
}

function authenticateManagerToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized Access' });
        return
    }

    jwt.verify(token, secretKey, (err, employee) => {
        if (err || employee.role != 'Manager') {
            res.status(403).json({ message: 'Forbidden Access' });
            return;
        }
        req.manager = employee;
        next();
    })
}

module.exports = router;