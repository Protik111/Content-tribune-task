const express = require('express');
const router = express.Router();

router.use('/api/user', require('../routes/user'));
router.use('/api/user', require('../routes/auth'));
router.use('/api/course', require('../routes/course'));

//health route
router.get('/health', (_req, res) => {
    return res.status(200).json({
        message: 'Success'
    })
});

module.exports = router;