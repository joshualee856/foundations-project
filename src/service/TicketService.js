const ticketDAO = require('../repository/TicketDAO');
const uuid = require('uuid');

async function createTicket(ticketData) {

    if (!ticketData.description) {
        return { error: 'Requests cannot be submitted without a description' }
    } else if (!ticketData.amount) {
        return { error: 'Requests cannot be submitted without an amount' }
    } else {
        let newTicket = {
            id: uuid.v4(),
            author: ticketData.author,
            description: ticketData.description,
            type: ticketData.type ? ticketData.type : 'Other',
            amount: ticketData.amount,
            status: 'Pending'
        }
        
        await ticketDAO.insertTicket(newTicket);

        // Retrieve and return the newly inserted ticket
        return await ticketDAO.getTicket(newTicket.id);
    }
}

async function getTicketsByAuthor(employee_id) {
    let tickets = await ticketDAO.getTicketsByAuthor(employee_id);
    return tickets;
}

async function getTicketsByStatus(status) {
    let tickets = await ticketDAO.getTicketsByStatus(status);
    return tickets;
}

async function updateTicketStatus(ticket_id, status) {
    let ticket = await ticketDAO.getTicket(ticket_id);

    if (ticket.status !== 'Pending') {
        return { error: 'Ticket has already been processed' };
    } else {
        let updatedTicket = await ticketDAO.updateTicketStatus(ticket_id, status);
        return updatedTicket;
    }
}

module.exports = {
    createTicket,
    getTicketsByAuthor,
    getTicketsByStatus,
    updateTicketStatus,
}