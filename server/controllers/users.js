const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.login = (req, res) => {
    return res.json({message: 'Loggin In'})
}

exports.register = (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!password || !email) {
        return res.apiError({title: 'Missing Data', detail: 'Email or Password is missing'})
    }

    if (password !== confirmPassword) {
        return res.apiError({title: 'Invalid Password', detail: 'Passwords to not match'});
    }

    User.findOne({email}, (error, existingUser) => {
        if (error) {
            return res.mongoError(error);
        }
        if (existingUser) {
            return res.apiError({title: 'Invalid Email', detail: 'User with this email already exists'})
        }

        const user = new User({username, email, password});
        user.save((error) => {
            if (error) {
                return res.mongoError(error);
            }
            return res.json({status: 'Registered'})
        })
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        return res.apiError({title: 'Missing Data', detail: 'Email or Password is missing'})
    }

    User.findOne({email}, (error, foundUser) => {
        if (error) {
            return res.mongoError(error);
        }
        if (!foundUser) {
            return res.apiError({title: 'Invalid Email', detail: 'User with this email does not exist'})
        }
        if (foundUser.hasSamePassword(password)) {
            const token = jwt.sign({
                sub: foundUser.id,
                username: foundUser.username,
            }, config.JWT_SECRET, { expiresIn: '2h' });

            return res.json(token)
        } else {
            return res.apiError({title: 'Invalid Password', detail: 'Provided password is incorrect'});
        }
    })
}

exports.onlyAuthUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const decodedToken = parseToken(token);
        if (!decodedToken) {
            return notAuthorized(res);
        }
        User.findById(decodedToken.sub, (error, foundUser) => {
            if (error) {
                return res.status(422).send({errors: [{title: 'DB Error', detail: 'Oops, something went wrong'}]})
            }
            if (foundUser) {
                res.locals.user = foundUser;
                next();
            } else {
                return notAuthorized(res);
            }
        });
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    try {
        return jwt.verify(token.split(' ')[1], config.JWT_SECRET) || null;
    } catch(error) {
        return null;
    }
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'You must be logged in for access'}]})
}