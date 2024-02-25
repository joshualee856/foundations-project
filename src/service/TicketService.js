const ticketDAO = require('../repository/TicketDAO');
const uuid = require('uuid');

async function createTicket(ticket) {

    if (!ticket.description) {
        return { error: 'Requests cannot be submitted without a description' }
    } else if (!ticket.amount) {
        return { error: 'Requests cannot be submitted without an amount' }
    } else {
        let newTicket = {
            id: uuid.v4(),
            author: ticket.author,
            description: ticket.description,
            type: ticket.type ? ticket.type : 'Other',
            amount: ticket.amount
        }
        
        await ticketDAO.insertTicket(newTicket);

        // Retrieve and return the newly inserted ticket
        return await ticketDAO.getTicket(newTicket.id);
    }
}

module.exports = {
    createTicket,
}