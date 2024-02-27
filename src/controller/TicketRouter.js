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

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized Access" });
        return;
    }

    jwt.verify(token, secretKey, (err, employee) => {
        console.log(employee.employee_id)
        if (err || (employee.role !== 'Employee' && employee.role !== 'Manager')) {
            res.status(403).json({ message: "Forbidden Access" });
            return;
        }
        req.employee = employee;
        next();
    })
}

module.exports = router;