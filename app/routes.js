const express = require('express');
const router = express.Router();

router.use('/api/user', require('../routes/user'));
router.use('/api/user', require('../routes/auth'));

//health route
router.get('/health', (_req, res) => {
    return res.status(200).json({
        message: 'Success'
    })
});

module.exports = router;