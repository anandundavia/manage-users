const winston = require('winston');

// TODO: Have a config using which a user can set the file path of the log


module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            silent: process.env.NODE_ENV === 'test', // Do not print in case of Testing
            timestamp: true,
            label: 'manage-users',
            colorize: true,
            prettyPrint: true,
        }),
    ],
});

