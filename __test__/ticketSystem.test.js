const { createTicket, getTicketsByAuthor, getTicketsByStatus, updateTicketStatus } = require('../src/service/TicketService');
const ticketDAO = require('../src/repository/TicketDAO');

describe('Ticket Submission Tests', () => {
    test('Registering a ticket with no description should return an error message', async () => {
        let newTicket = {
            author: 1,
            description: '',
            type: 'Work',
            amount: 2000
        }

        let response = await createTicket(newTicket);
        let expectedResult = { error: 'Requests cannot be submitted without a description' };

        expect(response).toEqual(expectedResult);
    })

    test('Registering a ticket with no amount should return an error message', async () => {
        let newTicket = {
            author: 1,
            description: 'Unit Testing Expenses',
            type: 'Work',
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

describe('Ticketing System Tests', () => {
    test('Getting tickets by the \'Pending\' status should return an array of pending tickets', async () => {
        let status = 'Pending';
        
        let response = await getTicketsByStatus(status);
        let expectedResult = await ticketDAO.getTicketsByStatus(status);

        expect(response).toEqual(expectedResult);
    })

    test('Attempting to update the status of a processed ticket should return an error message', async () => {
        let ticket_id = '020ad803-3dfb-4483-bc56-eab67120ea31';
        let status = 'Approved';

        let response = await updateTicketStatus(ticket_id, status);
        let expectedResult = { error: 'Ticket has already been processed' };

        expect(response).toEqual(expectedResult);
    })

    test('Approving a pending ticket should return the ticket with an updated status of \'Approved\'', async () => {
        let ticket_id = '67c1b889-aff6-430a-a45e-709bf9dff0e6';
        let status = 'Approved';

        let response = await updateTicketStatus(ticket_id, status);
        let expectedResult = await ticketDAO.getTicket(ticket_id);

        expect(response).toEqual(expectedResult);
    })

    test('Denying a ticket should return the ticket with an updated status of \'Denied\'', async () => {
        let ticket_id = '6d918828-0e29-4ba9-8306-0c43bf9eebb3';
        let status = 'Denied';

        let response = await updateTicketStatus(ticket_id, status);
        let expectedResult = await ticketDAO.getTicket(ticket_id);

        expect(response).toEqual(expectedResult);
    })

    test('Employees should be able to view their submitted tickets by filtering them with their employee ID', async () => {
        let employee_id = 'c9879dab-86b8-4747-b31f-77ab56516504';

        let response = await getTicketsByAuthor(employee_id);
        let expectedResult = await ticketDAO.getTicketsByAuthor(employee_id);

        expect(response).toEqual(expectedResult);
    })
})