const userSchema = require('./user.schema');

// Get the default schema
const schema = Object.assign({}, userSchema.get());

const builder = {

    setUniqueKeyName(name) {
        schema.keyField.name = name;
        return this;
    },
    isUniqueKeyEmail(isEmail) {
        schema.keyField.isEmail = isEmail;
        return this;
    },
    setPasswordKeyName(password) {
        schema.passwordField.name = password;
        return this;
    },
    setPasswordMinLength(length) {
        schema.passwordField.minLength = length;
        return this;
    },
    setConfirmPasswordKeyName(confirm) {
        schema.confirmPasswordField.name = confirm;
        return this;
    },
    build() {
        userSchema.set(schema);
        return userSchema.get();
    },
};

module.exports = () => builder;
