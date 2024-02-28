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

async function getTicketsByStatus(status) {
    let tickets = await ticketDAO.getTicketsByStatus(status);
    return tickets;
}

module.exports = {
    createTicket,
    getTicketsByStatus,
}