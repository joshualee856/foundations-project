const { postRegister } = require('../src/service/EmployeeService');

describe('Employee Registration Tests', () => {
    test('Registering a null username and/or password should return an error message', () => {
        let response;
        let username = '';
        let password = '';
        let expectedResult = { error: 'Invalid Credentials' };

        response = postRegister({ username, password })
        
        expect(response).toEqual(expectedResult);
    })
})