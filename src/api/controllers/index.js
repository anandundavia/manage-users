const validate = require('../middlewares/validate.middleware');
const validations = require('../validations');

const { connect } = require('../repository');
const { signup } = require('./signup.controller');
const { login } = require('./auth.controller');
const { changePassword, reset } = require('./password.controller');

/**
 * Main entry of the application.
 * The application will have no effects unless and until any of the exported
 * function is called.
 */
module.exports = {
    signup() {
        // In case routes are registered or re-registered, connect to the repository
        // This is required because the repository schema might have changed by the user
        // And if we open the connection to repository before the routes are registered,
        // We will have dangling connections
        connect();
        return (req, res, next) => {
            // validations.signup is a function because we need to generate the
            // Joi validation schema on the fly as per the userSchema.
            const schema = validations.signup();
            // Middleware executing to validate the request
            const err = validate(schema)(req, res, next);
            if (!err) {
                // At this point, everything is Good.
                // Execute the sign up controller
                signup(req, res, next);
            }
        };
    },
    login() {
        // It is okay to call connect multiple times
        // It ensures that only a single connection is open.
        connect();
        return (req, res, next) => {
            // Generating schema on the fly!
            const schema = validations.login();
            const err = validate(schema)(req, res, next);
            if (!err) {
                login(req, res, next);
            }
        };
    },
    resetPassword() {
        connect();
        return (req, res, next) => {
            const schema = validations.reset();
            const err = validate(schema)(req, res, next);
            if (!err) {
                reset(req, res, next);
            }
        };
    },
    changePassword() {
        connect();
        return (req, res, next) => {
            const schema = validations.changePassword();
            const err = validate(schema)(req, res, next);
            if (!err) {
                changePassword(req, res, next);
            }
        };
    },
};
