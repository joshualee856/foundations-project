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
    let loginData = await employeeDAO.getEmployee(employee);

    if (isDataNull) {
        return { error: 'The username and password cannot be blank' }
    } else if (!loginData) {
        return { error: 'Invalid Credentials' }
    }
        
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