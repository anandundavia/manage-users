const chai = require('chai');
const userSchema = require('../../../src/api/configuration/user.schema');

const { expect } = chai;
chai.should();

describe('Tests for configuration/userSchema.js', () => {
    describe('Tests for exported members', () => {
        it('should export 2 members', () => {
            const exportedMembers = Object.keys(userSchema);
            exportedMembers.length.should.be.equals(2);
        });

        const checkExportedMember = (member) => {
            it(`should have one of the exported member as "${member}"`, () => {
                const exportedMembers = Object.keys(userSchema);
                const isThere = exportedMembers.includes(member);
                isThere.should.equals(true);
            });
        };

        checkExportedMember('get');
        checkExportedMember('set');
    });

    describe('Tests for functionalities', () => {
        // const validateSchemaObject = (schema) => {
        //     const schemaKeys = Object.keys(schema);
        //     schemaKeys.length.should.be.equals(3);
        //     schemaKeys.includes('keyField').should.be.equals(true);
        //     schemaKeys.includes('passwordField').should.be.equals(true);
        //     schemaKeys.includes('confirmPasswordField').should.be.equals(true);

        //     const uniqueKeys = Object.keys(schema.keyField);
        //     uniqueKeys.length.should.be.lessThan(3);
        //     uniqueKeys.includes('name').should.be.equals(true);
        //     if (uniqueKeys.length === 2) {
        //         uniqueKeys.includes('isEmail').should.be.equals(true);
        //         schema.keyField.isEmail.should.be.an('boolean');
        //     }
        // };

        // it('should get the default userSchema because the schema is not yet set', () => {
        //     const schema = userSchema.get();
        //     validateSchemaObject(schema);
        //     schema.keyField.name.should.be.equals('username');
        //     schema.keyField.isEmail.should.be.equals(false);
        //     schema.passwordField.name.should.be.equals('password');
        //     schema.confirmPasswordField.name.should.be.equals('confirm');
        // });

        it('should set schema', () => {
            const schemaToSet = {
                keyField: {
                    name: 'user',
                    isEmail: false,
                },
                passwordField: {
                    name: 'passwordField',
                    minLength: 8,
                },
                confirmPasswordField: {
                    name: 'confirmPasswordField',
                },
            };
            userSchema.set(schemaToSet);
            userSchema.get().should.be.equals(schemaToSet);
        });

        it('should not set schema because "keyField" is not there', () => {
            const schemaToSet = {
                passwordField: {
                    name: 'passwordField',
                },
                confirmPasswordField: {
                    name: 'confirmPasswordField',
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"keyField" is required');
        });

        it('should not set schema because "keyField" is not there, but "name" is not', () => {
            const schemaToSet = {
                keyField: {
                    isEmail: false,
                },
                passwordField: {
                    name: 'passwordField',
                },
                confirmPasswordField: {
                    name: 'confirmPasswordField',
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"name" is required');
        });

        it('should not set schema because "passwordField" is not there', () => {
            const schemaToSet = {
                keyField: {
                    name: 'user',
                    isEmail: false,
                },
                confirmPasswordField: {
                    name: 'confirmPasswordField',
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"passwordField" is required');
        });

        it('should not set schema because "passwordField" is there, but "name" is not there', () => {
            const schemaToSet = {
                keyField: {
                    name: 'user',
                    isEmail: false,
                },
                passwordField: {},
                confirmPasswordField: {
                    name: 'confirmPasswordField',
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"name" is required');
        });

        it('should not set schema because "passwordField" is there, but "minLength" is not there', () => {
            const schemaToSet = {
                keyField: {
                    name: 'user',
                    isEmail: false,
                },
                passwordField: {
                    name: 'password',
                },
                confirmPasswordField: {
                    name: 'confirmPasswordField',
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"minLength" is required');
        });

        it('should not set schema because "passwordField" is there, "minLength" is there, but less than 6', () => {
            const schemaToSet = {
                keyField: {
                    name: 'user',
                    isEmail: false,
                },
                passwordField: {
                    name: 'password',
                    minLength: 5,
                },
                confirmPasswordField: {
                    name: 'confirmPasswordField',
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"minLength" must be larger than or equal to 6');
        });

        it('should not set schema because "confirmPasswordField" is not there', () => {
            const schemaToSet = {
                keyField: {
                    name: 'user',
                    isEmail: false,
                },
                passwordField: {
                    name: 'password',
                    minLength: 6,
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"confirmPasswordField" is required');
        });

        it('should not set schema because "confirmPasswordField" is there, but "name" is not there', () => {
            const schemaToSet = {
                keyField: {
                    name: 'user',
                    isEmail: false,
                },
                confirmPasswordField: {},
                passwordField: {
                    name: 'password',
                    minLength: 6,
                },
            };
            expect(userSchema.set.bind(userSchema.set, schemaToSet)).to.throw('"name" is required');
        });
    });
});
