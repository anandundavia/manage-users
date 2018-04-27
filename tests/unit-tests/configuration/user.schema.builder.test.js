const chai = require('chai');
const userSchemaBuilder = require('../../../src/api/configuration/user.schema.builder');
const userSchema = require('../../../src/api/configuration/user.schema');

chai.should();


describe('Tests for configuration/userSchemaBuilder.js', () => {
    describe('Tests for exported members', () => {
        it('the exported member should be a function', () => {
            const type = typeof userSchemaBuilder;
            type.should.be.equals('function');
        });
    });

    describe('Tests for functionalities', () => {
        it('should return default repository schema if build is called directly', () => {
            const schema = userSchemaBuilder().build();
            const defaultSchema = userSchema.get();
            schema.should.be.equals(defaultSchema);
        });

        it('should just change "keyField.isEmail"', () => {
            const schema = userSchemaBuilder()
                .isUniqueKeyEmail(true)
                .build();

            schema.should.be.equals(userSchema.get());
        });

        it('should just change "keyField.name"', () => {
            const schema = userSchemaBuilder()
                .setUniqueName('some_eqasd')
                .build();

            schema.should.be.equals(userSchema.get());
        });

        it('should just change "passwordField.name"', () => {
            const schema = userSchemaBuilder()
                .setPasswordKeyName('here_is_the_pw')
                .build();

            schema.should.be.equals(userSchema.get());
        });

        it('should just change "confirmPassword.name"', () => {
            const schema = userSchemaBuilder()
                .setConfirmPasswordKeyName('confedsdasdas')
                .build();

            schema.should.be.equals(userSchema.get());
        });
    });
});
