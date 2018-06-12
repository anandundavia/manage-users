const httpStatus = require('http-status');
const userSchema = require('../configuration/user.schema');
const repository = require('../repository');
const security = require('../utils/security');

// TODO: Filter the incoming body using schema
// So that proper user body gets created in the database.
exports.signup = async (req, res, next) => {
    try {
        const schema = userSchema.get();
        const user = Object.assign({}, req.body);
        const key = user[schema.keyField.name];

        const exists = await repository.get().exists(key);
        if (exists) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: `A user with key '${key}' already exists.` });
        }
        // Deleting the duplicate key value in the user
        // before interning the body into the database
        // This case will be handled when the body is filtered
        delete user[schema.confirmPasswordField.name];

        const { hash } = await security.encrypt(user[schema.passwordField.name]);
        user.hash = hash;

        // Once the password is hashed, delete it from the object.
        delete user[schema.passwordField.name];

        // Just before creating the user to db, add the created_at, logged_in_at field
        user.meta = {};
        user.meta.created_at = new Date().getTime();
        user.meta.logged_in_at = 0;
        const result = await repository.get().create(user);

        // once the user is added, remove the hash from the object.
        delete user.hash;
        if (result) {
            return res.status(httpStatus.OK).json({ user, result });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Something went wrong while creating a user' });
    } catch (error) {
        return next(error);
    }
};
