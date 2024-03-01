const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
    ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const logger = require('../util/Logger');

const client = new DynamoDBClient({ region: 'us-west-1' });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'Tickets';

// Insert Ticket DAO Method
async function insertTicket(ticket) {
    const command = new PutCommand({
        TableName,
        Item: ticket
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch(error) {
        logger.error(error);
    }
}

// Get Ticket by ID DAO method
async function getTicket(ticket_id) {
    const command = new GetCommand({
        TableName,
        Key: { id: ticket_id },
    })

    try {
        const data = await documentClient.send(command);
        return data.Item;
    } catch(error) {
        logger.error(error);
    }
}

// Get Tickets by Author DAO Method
async function getTicketsByAuthor(employee_id) {
    const command = new ScanCommand({
        TableName,
        FilterExpression: '#author = :author',
        ExpressionAttributeNames: { '#author': 'author' },
        ExpressionAttributeValues: { ':author': employee_id }
    })

    try {
        const tickets = await documentClient.send(command);
        return tickets.Items;
    } catch(error) {
        logger.error(error);
    }
}

// Get Tickets by Status DAO Method
async function getTicketsByStatus(status) {
    const command = new ScanCommand({
        TableName,
        FilterExpression: '#status = :status',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':status': status }
    })

    try {
        const tickets = await documentClient.send(command);
        return tickets.Items;
    } catch(error) {
        logger.error(error);
    }
}

// Update Ticket Status DAO Method
async function updateTicketStatus(ticket_id, status) {
    const command = new UpdateCommand({
        TableName,
        Key: { id: ticket_id },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':status': status },
        ReturnValues: 'ALL_NEW'
    })

    try {
        const ticket = await documentClient.send(command);
        return ticket.Attributes;
    } catch(error) {
        logger.error(error);
    }
}

module.exports = {
    insertTicket,
    getTicket,
    getTicketsByAuthor,
    getTicketsByStatus,
    updateTicketStatus,
}