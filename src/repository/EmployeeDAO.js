const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');
const {
    DynamoDBDocumentClient, 
    PutCommand,
    GetCommand,
    ScanCommand,
    // DeleteCommand
} = require('@aws-sdk/lib-dynamodb');

const logger = require('../util/Logger');

const client = new DynamoDBClient({ region: 'us-west-1' });

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'Employees';

// Insert Employee DAO Method
async function insertEmployee(employee) {
    const command = new PutCommand({
        TableName,
        Item: employee
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch(error) {
        logger.error(error);
    }
}

// Get Employee by ID DAO Method
async function getEmployee(id) {
    const command = new GetCommand({
        TableName, 
        Key: { employee_id: id }
    })

    try {
        const data = await documentClient.send(command);
        return data.Item;
    } catch(error) {
        logger.error(error);
    }
}

// Get Employee by Username DAO Method
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

// Get Employee by Username and Password DAO Method
async function getEmployeeByUsernameAndPassword(username, password) {
    const command = new ScanCommand({
        TableName, 
        FilterExpression: '#username = :username AND #password = :password',
        ExpressionAttributeNames: { 
            '#username': 'username',
            '#password': 'password'
        },
        ExpressionAttributeValues: { 
            ':username': username,
            ':password': password
        }
    })

    try {
        const data = await documentClient.send(command);
        return data.Items[0];
    } catch(error) {
        logger.error(error);
    }
}

// Delete Employee DAO Method (For Unit Testing Only, never finished)

// async function removeEmployee(employee) {
//     const command = new DeleteCommand({
//         TableName,
//         FilterExpression: '#username = :username AND #password = :password',
//         ExpressionAttributeNames: {
//             '#username': 'username',
//             '#password': 'password'
//         },
//         ExpressionAttributeValues: {
//             ':username': employee.username,
//             ':password': employee.password
//         }
//     })

//     try {
//         const data = await documentClient.send(command);
//         // return data;
//     } catch(error) {
//         logger.error(error);
//     }
// }

module.exports = {
    insertEmployee,
    getEmployee,
    getEmployeeByUsername,
    getEmployeeByUsernameAndPassword,
    // removeEmployee,
}