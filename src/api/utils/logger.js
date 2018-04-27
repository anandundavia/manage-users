const winston = require('winston');

// TODO: Have a config using which a user can set the file path of the log

// Return the last folder name in the path and the calling
// module's filename.
const getLabel = (callingModule) => {
    const isWin = process.platform === 'win32';
    const parts = callingModule.filename.split(isWin ? '\\' : '/');
    return `${parts[parts.length - 2]}/${parts.pop()}`;
};


module.exports = callingModule => new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            silent: process.env.NODE_ENV === 'test', // Do not print in case of Testing
            timestamp: true,
            label: getLabel(callingModule),
            colorize: true,
            prettyPrint: true,
        }),
    ],
});

