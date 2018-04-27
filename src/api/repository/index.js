const repositoryFactory = require('./repository.factory');
const repositorySchema = require('../configuration/repository.schema');
const mongo = require('./mongo.repository');
const logger = require('../utils/logger')(module);

// Adding default mongo repository
(() => {
    logger.info('adding default \'mongo\' repository');
    repositoryFactory.add('mongo', mongo);
})();

let repo = null;
const connect = () => {
    if (!repo) {
        repo = repositoryFactory.get(repositorySchema.get().repository);
        repo.connect();
    }
    return repo;
};

const get = () => repo;

module.exports = { connect, get };
