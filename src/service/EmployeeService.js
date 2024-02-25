const employeeDAO = require('../repository/EmployeeDAO');
const uuid = require('uuid');

async function registerEmployee(employee) {
    let isDataNull = validateData(employee);
    let isUsernameTaken = await employeeDAO.getEmployeeByUsername(employee.username);

    if (isDataNull) {
        return { error: 'The username and password cannot be blank' }
    } else if (isUsernameTaken) {
        return { error: 'The username is already taken' }
    } else {
        let newEmployee = {
            employee_id: uuid.v4(),
            username: employee.username,
            password: employee.password,
            role: 'Employee'
        }

        await employeeDAO.insertEmployee(newEmployee);

        // Retrieve and return newly inserted employee
        return await employeeDAO.getEmployee(newEmployee.employee_id);
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
    registerEmployee,
    postLogin,
    // deleteEmployee,
}