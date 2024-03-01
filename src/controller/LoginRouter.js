// Endpoint: /login

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const employeeService = require('../service/EmployeeService');

const secretKey = 'mdJk9JTAjWzelmwQEmF0';

const logger = require('../util/Logger');

// POST Method - Log in an employee
router.post('/', async (req, res) => {
    logger.info(`Incoming ${req.method} : /login${req.url}`);

    const { username, password } = req.body;

    const employeeData = await employeeService.loginEmployee({ username, password });
    if (!employeeData || !(await bcrypt.compare(password, employeeData.password))) {
        logger.info('Invalid Credentials');
        res.status(401).json({ error: 'Invalid Credentials' });
    } else {
        const token = jwt.sign(
            {
                employee_id: employeeData.employee_id,
                username: employeeData.username,
                role: employeeData.role
            },
            secretKey,
            {
                expiresIn: '30m'
            }
        );
        
        logger.info(`Successful login of Employee #${employeeData.employee_id}`);
        res.status(202).json({ token })
    }

    // if (!data.error) {
    //     res.status(202).json(`${data.role}`)
    // } else {
    //     res.status(400).json(data.error);
    // }
})

module.exports = router;