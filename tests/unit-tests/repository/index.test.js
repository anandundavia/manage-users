const chai = require('chai');
const repository = require('../../../src/api/repository');

chai.should();

describe('Tests for repository/index.js', () => {
    describe('Tests for exported members', () => {
        it('Should export 2 members', () => {
            const exportedMembers = Object.keys(repository);
            exportedMembers.length.should.be.equals(2);
        });

        const checkExportedMember = (member) => {
            it(`Should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(repository);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };

        checkExportedMember('connect');
        checkExportedMember('get');
    });

    describe('Tests for functionality', () => {
        it('Should add mongo repository by default', () => {
            const repo = repository.get();
            repo.should.not.be.equals(undefined);
            repo.should.not.be.equals(null);
            repo.should.not.be.equals({});
        });

        it('connect() should return a repository object', () => {
            const repo = repository.get();
            repo.should.not.be.equals(undefined);
            repo.should.not.be.equals(null);
            repo.should.not.be.equals({});
        });
    });
});

