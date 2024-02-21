// Endpoint: /login

const express = require('express');
const router = express.Router();

const employeeService = require('../service/EmployeeService');

router.post('/', async (req, res) => {
    // console.log(req.body);
    const data = await employeeService.postLogin(req.body);
    if (!data.error) {
        res.status(202).json(`${data.role}`)
    } else {
        res.status(400).json(data.error);
    }
})

// router.get('/', (req, res) => {
//     res.status(200).json({ message: 'This is the /login endpoint!'})
// })

module.exports = router;