// Endpoint: /register

const express = require('express');
const router = express.Router();

const employeeService = require('../service/EmployeeService');

router.post('/', async (req, res) => {
    const employee = await employeeService.registerEmployee(req.body);
    if (!employee.error) {
        res.status(201).json(employee)
    } else {
        res.status(400).json(employee.error);
    }
})

module.exports = router;