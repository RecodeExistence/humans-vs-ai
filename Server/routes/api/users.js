const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const User = require('../../models/Users');

// Test User API 
router.get('/', (req, res) => res.send('User API working...'));

// Register user
router.post('/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', "Please include a valid email")
            .isEmail(),
        check('password','Please enter a password with 6 or more characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists!" }] });
            }
            // Create new user instance if no user is found.
            user = new User({
                name,
                email,
                password
            });

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Create new user in DB
            await user.save();

            // Create payload for JWT
            const payload = {
                user: {
                    id: user.id
                }
            };
            
            // attach JSON Web Token
            jwt.sign(
                payload,
                process.env.jwtSecret,
                {
                    expiresIn: 10000000
                },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token });
                }
            );
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;