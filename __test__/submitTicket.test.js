const { createTicket } = require('../src/service/TicketService');
const ticketDAO = require('../src/repository/TicketDAO');

describe('Ticket Submission Tests', () => {
    test('Registering a ticket with no description should return an error message', async () => {
        let newTicket = {
            author: 1,
            description: '',
            type: 'Travel',
            amount: 2000
        }

        let response = await createTicket(newTicket);
        let expectedResult = { error: 'Requests cannot be submitted without a description' };

        expect(response).toEqual(expectedResult);
    })

    test('Registering a ticket with no amount should return an error message', async () => {
        let newTicket = {
            author: 1,
            description: 'Reston Culture Workshop Travel Expenses',
            type: 'Travel',
            amount: ''
        }

        let response = await createTicket(newTicket);
        let expectedResult = { error: 'Requests cannot be submitted without an amount' };

        expect(response).toEqual(expectedResult);
    })

    test('Registering a ticket with a description and an amount should return the newly created ticket', async () => {
        let newTicket = {
            author: 1,
            description: 'Unit Testing Expenses',
            type: 'Work',
            amount: 2000
        }

        let response = await createTicket(newTicket);
        let expectedResult = await ticketDAO.getTicket(response.id);

        expect(response).toEqual(expectedResult);
    })
})