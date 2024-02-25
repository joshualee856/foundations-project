const { loginEmployee } = require('../src/service/EmployeeService');
const employeeDAO = require('../src/repository/EmployeeDAO');

describe('Employee Login Tests', () => {
    test('Logging in with a blank username and/or password should return an error message', async () => {
        let response;
        let employee = {
            username: '',
            password: ''
        }
        let expectedResult = { error: 'The username and password cannot be blank' };

        response = await loginEmployee(employee);
        
        expect(response).toEqual(expectedResult);
    })

    test('Logging in with a username and password that does not exist in the database should return an error message', async () => {
        let response;
        let employee = {
            username: 'Penny',
            password: 'doggo'
        }
        let expectedResult = { error: 'Invalid Credentials' };

        response = await loginEmployee(employee);

        expect(response).toEqual(expectedResult);
    })

    test('Logging in with a username and password that does exist in the database should return the employee\'s data', async () => {
        let employee = {
            username: 'RevaturePro',
            password: 'RevPro'
        }

        let response = await loginEmployee(employee);
        let expectedResult = await employeeDAO.getEmployee('0baf0656-8539-49c0-bf48-0c20f5197cfe');

        expect(response).toEqual(expectedResult);
    })
})