const { loginEmployee } = require('../src/service/EmployeeService');
const employeeDAO = require('../src/repository/EmployeeDAO');
const bcrypt = require('bcrypt');
const secretKey = 'mdJk9JTAjWzelmwQEmF0';


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
            username: 'RevaturePro',
            password: 'RevPro'
        }
        let expectedResult = { error: 'Invalid Credentials' };

        response = await loginEmployee(employee);

        expect(response).toEqual(expectedResult);
    })

    test('Logging in with a username and password that does exist in the database should return the employee\'s data', async () => {
        let employee = {
            username: 'Joshua Lee',
            password: 'ManagerJoshPassword'
        }
        const saltRounds = 10;
        
        employee.password = await bcrypt.hash(employee.password, saltRounds);
        let response = await loginEmployee(employee);
        let expectedResult = await employeeDAO.getEmployee('9eba6114-2ed5-4dca-ab35-107e5f87dc20');

        expect(response).toEqual(expectedResult);
    })
})