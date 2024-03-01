// Endpoint: /tickets

const express = require('express');
const router = express.Router();

const ticketService = require('../service/TicketService');
const jwt = require('jsonwebtoken');
const secretKey = 'mdJk9JTAjWzelmwQEmF0';
const logger = require('../util/Logger');

router.post('/', authenticateToken, async (req, res) => {
    logger.info(`Incoming ${req.method} : /tickets${req.url}`);

    // Parse ticket data from request body and jwt token (for author attribute)
    let ticketData = {
        author: req.employee.employee_id,
        description: req.body.description,
        type: req.body.type,
        amount: req.body.amount,
    }
    const ticket = await ticketService.createTicket(ticketData);

    if (!ticket.error) {
        logger.info(`Successfull created Ticket #${ticket.id}`);
        res.status(202).json(ticket);
    } else {
        logger.error(ticket.error);
        res.status(400).json(ticket.error);
    }
})

router.get('/', authenticateManagerToken, async (req, res) => {
    logger.info(`Incoming ${req.method} : /tickets${req.url}`);
    const statusQuery = req.query.status;
    const tickets = await ticketService.getTicketsByStatus(statusQuery);

    logger.info('Fetched Pending Tickets');
    res.status(200).json(tickets);
})

router.get('/:author', authenticateToken, async (req, res) => {
    logger.info(`Incoming ${req.method} : /tickets${req.url}`);

    const author = req.params.author;
    const employee_id = req.employee.employee_id;

    if (author === employee_id) {
        const tickets = await ticketService.getTicketsByAuthor(author);
        logger.info(`Fetched Tickets`);
        res.status(200).json(tickets);
    } else {
        logger.error('Current user is not the author of the tickets');
        res.status(403).json({ error: 'Current user is not the author of the tickets' })
    }
})

router.put('/:ticket_id', authenticateManagerToken, async (req, res) => {
    logger.info(`Incoming ${req.method} : /tickets${req.url}`);

    let ticket_id = req.params.ticket_id;
    let status = req.body.status;

    let updatedTicket = await ticketService.updateTicketStatus(ticket_id, status);
    if (!updatedTicket.error) {
        logger.info(`Updated Ticket #${ticket_id}`);
        res.status(200).json(updatedTicket);
    } else {
        logger.error(updatedTicket.error);
        res.status(403).json({ error: updatedTicket.error })
    }
    
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        logger.error('Unauthorized Access');
        res.status(401).json({ message: "Unauthorized Access" });
        return;
    }

    jwt.verify(token, secretKey, (err, employee) => {
        if (err || (employee.role !== 'Employee' && employee.role !== 'Manager')) {
            logger.error('Forbidden Access');
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
        logger.error('Unauthorized Access');
        res.status(401).json({ message: 'Unauthorized Access' });
        return
    }

    jwt.verify(token, secretKey, (err, employee) => {
        if (err || employee.role != 'Manager') {
            logger.error('Forbidden Access');
            res.status(403).json({ message: 'Forbidden Access' });
            return;
        }
        req.manager = employee;
        next();
    })
}

module.exports = router;