const chai = require('chai');
const controllers = require('../../../src/api/controllers');

chai.should();

describe('Tests for controllers/index.js', () => {
    describe('Tests for exported members', () => {
        it('Should export 2 members', () => {
            const exportedMembers = Object.keys(controllers);
            exportedMembers.length.should.be.equals(2);
        });

        const checkExportedMember = (member) => {
            it(`Should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(controllers);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };

        checkExportedMember('signup');
        checkExportedMember('login');
    });

    describe('Tests for functionalities', () => {
        it('signup() should return a funciton', () => {
            const middleware = controllers.signup();
            (typeof middleware).should.be.equals('function');
        });
        it('login() should return a funciton', () => {
            const middleware = controllers.login();
            (typeof middleware).should.be.equals('function');
        });
    });
});

