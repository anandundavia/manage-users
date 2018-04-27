const passport = require('../middlewares/passport.middleware');

exports.login = (req, res, next) => {
    try {
        // Let the passport middleware do its thing!
        passport.authenticate(req, res, next);
    } catch (error) {
        next(error);
    }
};
