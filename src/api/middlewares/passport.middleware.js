const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userSchema = require('../configuration/user.schema');
const repository = require('../repository');
const security = require('../utils/security');

// TODO: find out better way to do so
let isStrategySet = false;
const setStrategy = () => {
    passport.use(new LocalStrategy({
        usernameField: userSchema.get().keyField.name,
        passwordField: userSchema.get().passwordField.name,
    }, (key, password, done) => {
        repository.get().find({ key }).then(async (user) => {
            if (user) {
                const isSame = await security.compare(password, user.hash);
                /* eslint-disable no-param-reassign */
                delete user.hash;
                delete user.salt;
                if (isSame) {
                    // Copying the meta object from user to avoid 'pass-by-reference' issues
                    const meta = Object.assign({}, user.meta);
                    // If username and password are correct,
                    // ASYNCHRONOUSLY update the logged in time
                    // If you do it synchronously,
                    // then login time would be just the time at which the login
                    // request is made, which might not be most helpful
                    meta.logged_in_at = new Date().getTime();
                    // Do not wait for that update to finish, call the done right away!
                    repository.get().update(key, { meta });
                    return done(false, user);
                }
            }
            return done(false, false, { message: 'Incorrect username and/or password' });
        });
    }));
};


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


exports.authenticate = (req, res, next) => {
    if (!isStrategySet) {
        setStrategy();
        isStrategySet = true;
    }
    passport.authenticate('local')(req, res, next);
};

exports.passport = passport;
