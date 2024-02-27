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
            role: employee.role ? employee.role : 'Employee'
        }

        await employeeDAO.insertEmployee(newEmployee);

        // Retrieve and return newly inserted employee
        return await employeeDAO.getEmployee(newEmployee.employee_id);
    }
}

async function loginEmployee(employee) {
    let isDataNull = validateData(employee);
    if (isDataNull) {
        return { error: 'The username and password cannot be blank' }
    } 
    
    let loginData = await employeeDAO.getEmployeeByUsernameAndPassword(employee.username, employee.password);
    if (!loginData) {
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
    loginEmployee,
    // deleteEmployee,
}