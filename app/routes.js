const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/api/user', require('../routes/user'));
router.use('/api/user', require('../routes/auth'));
router.use('/api/course', require('../routes/course'));

if (process.env.NODE_ENV === 'production') {
    router.use(express.static(path.join(__dirname, '../client/build')))
  
    router.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    )
  } else {
    router.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

//health route
router.get('/health', (_req, res) => {
    return res.status(200).json({
        message: 'Success'
    })
});

module.exports = router;