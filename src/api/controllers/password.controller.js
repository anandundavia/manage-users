const httpStatus = require('http-status');
const userSchema = require('../configuration/user.schema');
const repository = require('../repository');
const security = require('../utils/security');


// As of now, delegate the task of sharing the reset token to end user to the client
// TODO: We can directly send the email if the key is set as email
// in the userschema, albeit whether to send the email or not would configurable too
// In case the client wants to send us to send the email, there will be a lot of things that
// will be needed to be implemented. For example client specific email template and so on
// Not re-inventing the wheel, let the client decide how she's going to distribute the tokens
exports.generateToken = async (req, res, next) => {
    try {
        res.json({ message: 'not implemented yet' });
    } catch (error) {
        next(error);
    }
};


exports.changePassword = async (req, res, next) => {
    try {
        const schema = userSchema.get();
        const body = Object.assign({}, req.body);
        const key = body[schema.keyField.name];
        const password = body[schema.passwordField.name];
        const newPassword = body[schema.newPasswordField.name];

        const user = await repository.get().find({ key });
        const isSame = await security.compare(password, user.hash);
        // Check if the existing pair of username password matches
        if (!isSame) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Incorrect username and/or password' });
        }
        // Encrypt the new password
        const { hash } = await security.encrypt(newPassword);
        const meta = Object.assign({}, user.meta);
        meta.password_changed_at = new Date().getTime();

        repository.get().update(key, { hash, meta });
        // once updated,
        // logout in order to force the user to re-login
        req.logout();
        return next();
    } catch (error) {
        return next(error);
    }
};
