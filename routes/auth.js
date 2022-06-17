require('dotenv').config('../.env');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
//model
const User = require('../models/User');
//authintication middleware
const auth = require('../middleware/auth');


//@route Get Api
//@desc Get User By Token
//@access Private
router.get('/userbyid', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})

//@route Post Api
//@desc Authenticate User
//@access Public
router.post('/login',
    body('email', 'PLease Enter a Valid Email').isEmail(),
    body('password', 'Password is Requried').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };

        const { email, password } = req.body;

        try {
            //looking user from db
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            //matching password
            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                res.status(200).json({ token });
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Server Error' })
        }
    })

module.exports = router;