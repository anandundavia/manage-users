const chai = require('chai');
const passport = require('../../../src/api/middlewares/passport.middleware');

chai.should();

describe('Tests for middlewares/passport.middleware.js', () => {
    describe('Tests for exported members', () => {
        it('Should export 1 members', () => {
            const exportedMembers = Object.keys(passport);
            exportedMembers.length.should.be.equals(1);
        });

        const checkExportedMember = (member) => {
            it(`Should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(passport);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };

        checkExportedMember('authenticate');
    });
});

