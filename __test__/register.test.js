const { postRegister } = require('../src/service/EmployeeService');

describe('Employee Registration Tests', () => {
    test('Registering a blank username and/or password should return an error message', async () => {
        let response;
        let username = '';
        let password = '';
        let expectedResult = { error: 'The username and password cannot be blank' };

        response = await postRegister({ username, password })
        
        expect(response).toEqual(expectedResult);
    })
})