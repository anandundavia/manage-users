const chai = require('chai');
const repositorySchemaBuilder = require('../../../src/api/configuration/repository.schema.builder');
const repositorySchema = require('../../../src/api/configuration/repository.schema');

chai.should();

describe('Tests for configuration/repositorySchemaBuilder.js', () => {
    describe('Tests for exported members', () => {
        it('the exported member should be a function', () => {
            const type = typeof repositorySchemaBuilder;
            type.should.be.equals('function');
        });
    });

    describe('Tests for functionalities', () => {
        it('should return default repository schema if build is called directly', () => {
            const schema = repositorySchemaBuilder().build();
            const defaultSchema = repositorySchema.get();
            schema.should.be.equals(defaultSchema);
        });

        it('should just change "collection"', () => {
            const schema = repositorySchemaBuilder()
                .setCollectionName('some_other_collection')
                .build();

            schema.should.be.equals(repositorySchema.get());
        });

        it('should just change "database"', () => {
            const schema = repositorySchemaBuilder()
                .setDatabaseName('some_other_database')
                .build();

            schema.should.be.equals(repositorySchema.get());
        });

        it('should just change "repository"', () => {
            const schema = repositorySchemaBuilder()
                .setRepository('mongo')
                .build();

            schema.should.be.equals(repositorySchema.get());
        });

        it('should just change "uri"', () => {
            const schema = repositorySchemaBuilder()
                .setUri('mongodb://someip:5555/somedb')
                .build();

            schema.should.be.equals(repositorySchema.get());
        });
    });
});
