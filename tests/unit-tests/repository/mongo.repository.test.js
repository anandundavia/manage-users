const chai = require('chai');
const repository = require('../../../src/api/repository/mongo.repository');

chai.should();

describe('Tests for repository/mongo.repository.js', () => {
    describe('Tests for exported members', () => {
        it('Should export 6 members', () => {
            const exportedMembers = Object.keys(repository);
            exportedMembers.length.should.be.equals(6);
        });

        const checkExportedMember = (member) => {
            it(`Should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(repository);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };

        checkExportedMember('connect');
        checkExportedMember('exists');
        checkExportedMember('create');
        checkExportedMember('find');
        checkExportedMember('update');
        checkExportedMember('disconnect');
    });

    describe('Tests for functionality', () => {
        describe('Tests for create', () => {

        });
    });
});

