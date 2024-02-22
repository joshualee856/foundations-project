const { postLogin } = require('../src/service/EmployeeService');

describe('Employee Login Tests', () => {
    test('Logging in with a blank username and/or password should return an error message', async () => {
        let response;
        let employee = {
            username: '',
            password: ''
        }
        let expectedResult = { error: 'The username and password cannot be blank' };

        response = await postLogin(employee);
        
        expect(response).toEqual(expectedResult);
    })

    test('Logging in with a username and password that does not exist in the database should return an error message', async () => {
        let response;
        let employee = {
            username: 'Penny',
            password: 'doggo'
        }
        let expectedResult = { error: 'Invalid Credentials' };

        response = await postLogin(employee);

        expect(response).toEqual(expectedResult);
    })

    test('Logging in with a username and password that does exist in the database should return the employee\'s data', async () => {
        const employeeDAO = require('../src/repository/EmployeeDAO');
        let response;
        let employee = {
            username: 'RevaturePro',
            password: 'RevPro'
        }
        let expectedResult = await employeeDAO.getEmployee(employee);

        response = await postLogin(employee);

        expect(response).toEqual(expectedResult);
    })
})