const express = require('express');
const router = express.Router();
require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
    User.findOne({username: req.body.username}).then(user => {
        if (user) {
            return res.status(400).json({message: "Username already exists"});
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json({
                            "id": user._id,
                            "username": user.username
                        }))
                        .catch(err => {
                                console.log(err);
                                res.json({
                                    message: "Could not create new user."
                                })
                            }
                        );
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    User.findOne({username}).then(user => {
        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    username: user.username
                };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 86400
                    },
                    (err, token) => {
                        if(err) {
                            console.log(err);
                            return res
                                .status(500)
                                .json({message: "Internal server error, please report this."});
                        }
                        res.json({
                            token: token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({message: "Password incorrect."});
            }
        });
    });
});

module.exports = router;
