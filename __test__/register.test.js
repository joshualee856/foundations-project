const { postRegister, /* deleteEmployee */ } = require('../src/service/EmployeeService');
// const { getEmployee } = require('../src/repository/EmployeeDAO');

describe('Employee Registration Tests', () => {
    test('Registering a blank username and/or password should return an error message', async () => {
        let response;
        let username = '';
        let password = '';
        let expectedResult = { error: 'The username and password cannot be blank' };

        response = await postRegister({ username, password })
        
        expect(response).toEqual(expectedResult);
    })

    test('Registering a username that is already in the database should return an error message', async () => {
        let response;
        let employee = {
            username: 'RevaturePro',
            password: 'RevPro'
        }
        let expectedResult = { error: 'The username is already taken' };

        response = await postRegister(employee);

        expect(response).toEqual(expectedResult);
    })

    // test('Registering a new username should return the new employee data, including a unique id and the default role of Employee', async () => {
    //     let response;
    //     let employee = {
    //         username: 'Lucy',
    //         password: 'doggo'
    //     }
    //     let expectedResult;

    //     response = await postRegister(employee);
    //     expectedResult = await getEmployee(employee);

    //     console.log(response);
    //     console.log(expectedResult);

    //     expect(response).toEqual(expectedResult);
    // })

    // afterAll(() => {
    //     let employee = {
    //         username: 'Lucy',
    //         password: 'doggo'
    //     }
    //     deleteEmployee(employee)
    // })
})