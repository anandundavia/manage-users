// const userSchema = require('../configuration/user.schema');
// const repositorySchema = require('../configuration/repository.schema');
// const { MongoClient } = require('mongodb');
// const logger = require('../utils/logger')(module);

// const repoSchema = repositorySchema.get();

// let db = null;
// let connectionIsProgress = false;
// let connectionPromise = null;

// const connect = () => new Promise((resolve, reject) => {
//     if (connectionIsProgress) {
//         logger.info('another connection opening is in progress. skipping connection open request');
//         return connectionPromise;
//     }
//     logger.info(`opening a connection to repository '${repoSchema.repository}'`);
//     connectionIsProgress = true;
//     connectionPromise = new Promise(() => {
//         MongoClient.connect(repoSchema.uri, (err, client) => {
//             if (err) {
//                 connectionIsProgress = false;
//                 return reject(err);
//             }
//             logger.info('successfully opened a connection to mongo');
//             db = client.db(repoSchema.database);
//             connectionIsProgress = false;
//             return resolve(db);
//         });
//     });
//     return connectionPromise;
// });

// const exists = key => new Promise(async (resolve, reject) => {
//     if (!db) {
//         await connect();
//     }
//     const query = {
//         [userSchema.get().keyField.name]: key,
//     };
//     db.collection(repoSchema.collection).find(query).toArray((err, result) => {
//         if (err) return reject(err);
//         return resolve(result.length > 0);
//     });
// });


// const create = object => new Promise(async (resolve, reject) => {
//     if (!db) {
//         await connect();
//     }
//     db.collection(repoSchema.collection).insertOne(object).then(resolve).catch(reject);
// });


// const find = ({ key, password }) => new Promise(async (resolve, reject) => {
//     if (!db) {
//         await connect();
//     }
//     const query = {
//         [userSchema.get().keyField.name]: key,
//         [userSchema.get().passwordField.name]: password,
//     };
//     db.collection(repoSchema.collection).findOne(query).then(resolve).catch(reject);
// });

const chai = require('chai');
const repository = require('../../../src/api/repository/mongo.repository');

chai.should();

describe('Tests for repository/mongo.repository.js', () => {
    describe('Tests for exported members', () => {
        it('Should export 5 members', () => {
            const exportedMembers = Object.keys(repository);
            exportedMembers.length.should.be.equals(5);
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
    });

    describe('Tests for functionality', () => {
        describe('Tests for create', () => {
            // it('should not open more than one connection to the same database', async (done) => {
            //     const connections = [];
            //     const len = 10;
            //     for (let i = 1; i <= len; i += 1) {
            //         connections[i] = repository.connect();
            //         connections[i].then(() => {
            //             console.log(`resolved ${i}th connection`);
            //         }).catch(() => {
            //             console.log(`rejected ${i}th connection`);
            //         });
            //     }
            //     done();
            // });
        });
    });
});

