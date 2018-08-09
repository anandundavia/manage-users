const userSchema = require('../configuration/user.schema');

// This will hold everything in memory
const memory = {};

const connect = () => new Promise((resolve) => {
    resolve();
});

const disconnect = () => new Promise((resolve) => {
    resolve();
});

const exists = key => new Promise((resolve) => {
    const { users } = memory;
    // do we have any users to check ?
    if (!users || (users && Object.keys(users) === 0)) {
        // do we do not have any users, just resolve the promise to false.
        return resolve(false);
    }
    const existingUser = users[key];
    return resolve(!!existingUser);
});


const create = object => new Promise((resolve) => {
    // Logic to add the object passed in the user collection
    // This method will be used at time of sign up
    if (!memory.users) {
        memory.users = {};
    }
    const userToAdd = Object.assign({}, object);
    const keyFieldName = userSchema.get().keyField.name;
    const key = userToAdd[keyFieldName];
    memory.users[key] = userToAdd;
    resolve({ success: true });
});


const find = ({ key }) => new Promise((resolve) => {
    const { users } = memory;
    // do we have any users to check ?
    if (!users || (users && Object.keys(users) === 0)) {
        // do we do not have any users, just resolve the promise to null.
        return resolve(null);
    }
    const user = users[key];
    if (user && Object.keys(user).length !== 0) {
        return resolve(Object.assign({}, user));
    }
    return resolve(null);
});


const update = (key, updates) => new Promise((resolve) => {
    let userToUpdate = memory.users[key];
    userToUpdate = { ...userToUpdate, ...updates };
    memory.users[key] = userToUpdate;
    return resolve(userToUpdate);
});

module.exports = {
    connect, exists, create, find, update, disconnect,
};
