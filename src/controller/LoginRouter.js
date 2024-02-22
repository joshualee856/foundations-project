// Endpoint: /login

const express = require('express');
const router = express.Router();

const employeeService = require('../service/EmployeeService');

router.post('/', async (req, res) => {
    const data = await employeeService.postLogin(req.body);
    if (!data.error) {
        res.status(202).json(`${data.role}`)
    } else {
        res.status(400).json(data.error);
    }
})

module.exports = router;