const Joi = require('joi');
const httpStatus = require('http-status');

module.exports = schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        const response = {
            code: 400,
            message: result.error.message || httpStatus.BAD_REQUEST,
        };
        res.status(response.code).json(response).end();
        return result.error;
    }
    return null;
};
