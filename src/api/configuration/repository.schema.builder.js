const repositorySchema = require('./repository.schema');

// Get the default schema
const schema = Object.assign({}, repositorySchema.get());

const builder = {
    setRepository(repository) {
        schema.repository = repository;
        return this;
    },
    setUri(uri) {
        schema.uri = uri;
        return this;
    },
    setCollectionName(collectionName) {
        schema.collection = collectionName;
        return this;
    },
    setDatabaseName(databaseName) {
        schema.database = databaseName;
        return this;
    },
    build() {
        repositorySchema.set(schema);
        return repositorySchema.get();
    },
};

module.exports = () => builder;
