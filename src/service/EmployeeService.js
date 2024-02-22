const employeeDAO = require('../repository/EmployeeDAO');
const uuid = require('uuid');

async function postRegister(newEmployee) {
    let isDataNull = validateData(newEmployee);
    let isUsernameTaken = await employeeDAO.getEmployeeByUsername(newEmployee.username);

    if (isDataNull) {
        return { error: 'The username and password cannot be blank' }
    } else if (isUsernameTaken) {
        return { error: 'The username is already taken' }
    } else {
        let employeeData = await employeeDAO.postEmployee({
            employee_id: uuid.v4(),
            username: newEmployee.username,
            password: newEmployee.password,
            role: 'Employee'
        })

        return employeeData;
    }
}

async function postLogin(employee) {
    let isDataNull = validateData(employee);
    // console.log(`Value of isDataNull: ${isDataNull}`);

    let loginData = await employeeDAO.getEmployee(employee);
    // console.log(`Value of loginData: ${loginData}`);

    if (isDataNull) {
        return { error: 'The username and password cannot be blank' }
    } else if (!loginData) {
        return { error: 'Invalid Credentials' }
    }

    // let employee_id = loginData.employee_id;
    // let employeeUsername = loginData.username;
    // let employeePassword = loginData.password;
    // let employeeRole = loginData.role;

    // console.log(`employee_id: ${employee_id}`);
    // console.log(`employeeUsername: ${employeeUsername}`);
    // console.log(`employeePassword: ${employeePassword}`);
    // console.log(`employeeRole: ${employeeRole}`);
        
    return loginData;
}

// async function deleteEmployee(employee) {
//     employeeDAO.removeEmployee(employee);
// }

function validateData(data) {
    if (!data.username || !data.password) {
        return true;
    }

    return false;
}

module.exports = {
    postRegister,
    postLogin,
    // deleteEmployee,
}