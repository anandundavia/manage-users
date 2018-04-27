const chai = require('chai');
const validate = require('../../../src/api/middlewares/validate.middleware');

chai.should();

describe('Tests for middlewares/validate.middleware.js', () => {
    describe('Tests for exported members', () => {
        it('Should export function', () => {
            (typeof validate).should.be.equals('function');
        });
    });
});

