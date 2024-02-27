// Endpoint: /register

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const employeeService = require('../service/EmployeeService');

router.post('/', async (req, res) => {
    let { username, password, role } = req.body;

    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    const newEmployee = {
        username,
        password, 
        role
    }

    const employeeData = await employeeService.registerEmployee(newEmployee);
    if (!employeeData.error) {
        res.status(201).json(employeeData)
    } else {
        res.status(400).json(employeeData.error);
    }
})

module.exports = router;