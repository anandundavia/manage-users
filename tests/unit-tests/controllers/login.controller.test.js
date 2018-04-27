const chai = require('chai');
const loginController = require('../../../src/api/controllers/login.controller');

chai.should();

describe('Tests for controllers/login.controller.js', () => {
    describe('Tests for exported members', () => {
        it('Should export 1 member', () => {
            const exportedMembers = Object.keys(loginController);
            exportedMembers.length.should.be.equals(1);
        });

        const checkExportedMember = (member) => {
            it(`Should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(loginController);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };
        checkExportedMember('login');
    });

    /* Further tests are not written as login controller depends on other modules.
     * Functionaliy tests will be included in integration tests
     */
});

