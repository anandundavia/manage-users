const chai = require('chai');
const repositorySchema = require('../../../src/api/configuration/repository.schema');

const { expect } = chai;
chai.should();

describe('Tests for configuration/repositorySchema.js', () => {
    describe('Tests for exported members', () => {
        it('should export 3 members', () => {
            const exportedMembers = Object.keys(repositorySchema);
            exportedMembers.length.should.be.equals(3);
        });

        const checkExportedMember = (member) => {
            it(`should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(repositorySchema);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };

        checkExportedMember('get');
        checkExportedMember('set');
        checkExportedMember('repository');
    });

    describe('Tests for functionalities', () => {
        it('should set schema', () => {
            const schemaToSet = {
                repository: 'mongo',
                uri: 'mongodb://127.0.0.1:27017/users',
                database: 'some_database',
                collection: 'users_collection',
            };
            repositorySchema.set(schemaToSet);
            repositorySchema.get().should.be.equals(schemaToSet);
        });

        it('should not set schema because "repository" is not there', () => {
            const schemaToSet = {
                uri: 'mongodb://127.0.0.1:27017/users',
                database: 'some_database',
                collection: 'users_collection',
            };
            expect(repositorySchema.set.bind(repositorySchema.set, schemaToSet)).to.throw('"repository" is required');
        });

        it('should not set schema because "uri" is not there', () => {
            const schemaToSet = {
                repository: 'mongo',
                database: 'some_database',
                collection: 'users_collection',
            };
            expect(repositorySchema.set.bind(repositorySchema.set, schemaToSet)).to.throw('"uri" is required');
        });

        it('should not set schema because "database" is not there', () => {
            const schemaToSet = {
                repository: 'mongo',
                uri: 'mongodb://127.0.0.1:27017/users',
                collection: 'users_collection',
            };
            expect(repositorySchema.set.bind(repositorySchema.set, schemaToSet)).to.throw('"database" is required');
        });

        it('should not set schema because "collection" is not there', () => {
            const schemaToSet = {
                repository: 'mongo',
                uri: 'mongodb://127.0.0.1:27017/users',
                database: 'some_database',
            };
            expect(repositorySchema.set.bind(repositorySchema.set, schemaToSet)).to.throw('"collection" is required');
        });
    });
});
