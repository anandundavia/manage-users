const { signup } = require('./signup.validation');
const { login } = require('./login.validation');
const { changePassword, reset } = require('./password.validation');

module.exports = {
    signup,
    login,
    reset,
    changePassword,
};
