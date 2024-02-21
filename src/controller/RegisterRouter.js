// Endpoint: /register

const express = require('express');
const router = express.Router();

const employeeService = require('../service/EmployeeService');

// router.get('/', (req, res) => {
//     res.status(200).json({ message: 'This is the /register endpoint!'})
// })

router.post('/', async (req, res) => {
    const data = await employeeService.postRegister(req.body);
    if (data) {
        res.status(201).json({ message: 'Registration Successful '})
    } else {
        res.status(400).json({ error: 'Username is already taken' })
    }
})

module.exports = router;