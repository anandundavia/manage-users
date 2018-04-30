const repositoryFactory = require('./repository.factory');
const repositorySchema = require('../configuration/repository.schema');
const mongo = require('./mongo.repository');
const logger = require('../utils/logger')(module);

// Adding default mongo repository
(() => {
    logger.info('adding default \'mongo\' repository');
    repositoryFactory.add('mongo', mongo);

    const handler = async () => {
        if (client != null) {
            await repo.disconnect();
        }
        process.exit(0);
    };

    // do something when app is closing
    process.on('exit', handler);

    // catches ctrl+c event
    process.on('SIGINT', handler);

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', handler);
    process.on('SIGUSR2', handler);
})();

let repo = null;
let client = null;
const connect = () => {
    if (!repo) {
        repo = repositoryFactory.get(repositorySchema.get().repository);
        repo.connect().then((aClient) => {
            client = aClient;
        });
    }
    return repo;
};

const get = () => repo;

module.exports = { connect, get };
