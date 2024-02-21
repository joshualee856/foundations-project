const employeeDAO = require('../repository/EmployeeDAO');
const uuid = require('uuid');

async function postRegister(newEmployee) {
    if (validateData(newEmployee)) {
        let employeeData = await employeeDAO.postEmployee({
            employee_id: uuid.v4(),
            username: newEmployee.username,
            password: newEmployee.password,
            role: 'Employee'
        })
        
        return employeeData;
    }

    return null;
}

function validateData(data) {
    if (!data.username || !data.password) {
        return false;
    }

    return true;
}

module.exports = {
    postRegister,
}