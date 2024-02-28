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

async function insertTicket(ticket) {
    const command = new PutCommand({
        TableName,
        Item: ticket
    });

    try {
        const data = await documentClient.send(command);
        logger.info(`Inserted Ticket (id: ${ticket.id}) into database`)
        return data;
    } catch(error) {
        logger.error(error);
    }
}

async function getTicket(ticket_id) {
    const command = new GetCommand({
        TableName,
        Key: { id: ticket_id },
    })

    try {
        const data = await documentClient.send(command);
        // logger.info(`Retrieved Ticket(${ticket.id}) from database`)
        return data.Item;
    } catch(error) {
        logger.error(error);
    }
}

async function getTicketsByStatus(status) {
    const command = new ScanCommand({
        TableName,
        FilterExpression: '#status = :status',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':status': status }
    })

    try {
        const tickets = await documentClient.send(command);
        console.log(tickets.Items)
        return tickets.Items;
    } catch(error) {
        logger.error(error);
    }
}

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
    getTicketsByStatus,
    updateTicketStatus,
}