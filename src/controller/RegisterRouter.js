// Endpoint: /register

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const employeeService = require('../service/EmployeeService');

const logger = require('../util/Logger');

// POST Method - Register new employee
router.post('/', async (req, res) => {
    logger.info(`Incoming ${req.method} : /register${req.url}`);

    let { username, password, role } = req.body;

    // Encrypt the password using bcrypt
    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    const newEmployee = {
        username,
        password, 
        role
    }

    const employeeData = await employeeService.registerEmployee(newEmployee);
    if (!employeeData.error) {
        logger.info(`Successfully registered Employee #${employeeData.employee_id}`);
        res.status(201).json(employeeData)
    } else {
        logger.error(employeeData.error);
        res.status(400).json(employeeData);
    }
})

module.exports = router;