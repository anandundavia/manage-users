const chai = require('chai');
const config = require('../../../src/api/configuration/index');

chai.should();

describe('Tests for configuration/index.js', () => {
    describe('Tests for exported members', () => {
        it('should export 3 members', () => {
            const exportedMembers = Object.keys(config);
            exportedMembers.length.should.be.equals(3);
        });

        const checkExportedMember = (member) => {
            it(`should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(config);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };

        checkExportedMember('userSchemaBuilder');
        checkExportedMember('repositorySchemaBuilder');
        checkExportedMember('repositoryBuilder');
    });
});
