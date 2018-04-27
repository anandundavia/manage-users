const repositoryFactory = require('../repository/repository.factory');

const repository = {};
const builder = {
    setRepositoryImplementation(repo) {
        Object.assign(repository, repo);
        return this;
    },
    build(name) {
        repositoryFactory.add(name, repository);
        return repository;
    },
};

module.exports = () => builder;
