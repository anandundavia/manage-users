const bcrypt = require('bcryptjs');

// I thought of declaring these constants outside and in one separate file
// But casually tempering with these variables might lead to lose of all the information
// in the database or a drastic performance drop.
// Most of the time, you do not want to change these variables
const constants = {
    // Do not just play around with salt rounds.
    // The rounds are actually 2^rounds. So the system
    // would take double the time if the rounds are increased by 1
    saltRounds: 12,
    // WARNING: DO NOT, DO NOT change this or you will basically lose all the
    // existing information about the users in the database.
    // You will have to re-register all the users in the system.
    pepper: '$2a$10$WgvGi9k0FI6WwOgx/X148e',
};

exports.encrypt = password => new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    bcrypt.genSalt(constants.saltRounds, (err, salt) => {
        if (err) {
            return reject(err);
        }
        // eslint-disable-next-line no-shadow
        bcrypt.hash(`${password}${constants.pepper}`, salt, (err, hash) => {
            if (err) {
                return reject(err);
            }
            return resolve({ salt, hash });
        });
    });
});

exports.compare = (password, hash) => new Promise((resolve, reject) => {
    bcrypt.compare(`${password}${constants.pepper}`, hash, (err, isSame) => {
        if (err) {
            return reject(err);
        }
        return resolve(isSame);
    });
});
