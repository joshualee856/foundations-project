const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');
const {
    DynamoDBDocumentClient, 
    GetCommand,
    PutCommand,
    ScanCommand
} = require('@aws-sdk/lib-dynamodb');

const logger = require('../util/Logger');

const client = new DynamoDBClient({ region: 'us-west-1' });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'Employees';

async function postEmployee(Item) {
    const command = new PutCommand({
        TableName,
        Item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch(error) {
        logger.error(error);
    }
}

async function getEmployeeByUsername(username) {
    const command = new ScanCommand({
        TableName, 
        FilterExpression: '#username = :username',
        ExpressionAttributeNames: { '#username': 'username' },
        ExpressionAttributeValues: { ':username': username }
    })

    try {
        const data = await documentClient.send(command);
        return data.Items[0];
    } catch(error) {
        logger.error(error);
    }
}

module.exports = {
    postEmployee,
    getEmployeeByUsername,
}