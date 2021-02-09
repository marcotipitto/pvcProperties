const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        minlength: [4, 'Invalid length, Minimum is 4 characters'], 
        maxlength: [32, 'Invalid length, Maximum is 32 characters']
    },
    email: {
        type: String, 
        required: 'Email is required', 
        lowercase: true, 
        unique: true, 
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format'], 
        minlength: [4, 'Invalid length, Minimum is 4 characters'], 
        maxlength: [32, 'Invalid length, Maximum is 32 characters']
    },
    password: {
        type: String, 
        required: 'Password is Required',
        minlength: [8, 'Invalid length, Minimum is 8 characters'], 
        maxlength: [32, 'Invalid length, Maximum is 32 characters']
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.hasSamePassword = function(requestPassword) {
    return bcrypt.compareSync(requestPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);