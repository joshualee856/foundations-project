const employeeDAO = require('../repository/EmployeeDAO');
const uuid = require('uuid');

async function postRegister(newEmployee) {
    let isDataNull = validateData(newEmployee);
    let isUsernameTaken = await employeeDAO.getEmployee(newEmployee.username);

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

function validateData(data) {
    if (!data.username || !data.password) {
        return true;
    }

    return false;
}

module.exports = {
    postRegister,
}