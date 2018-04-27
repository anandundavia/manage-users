// As of now, delegate the task of sharing the reset token to end user to the client
// TODO: We can directly send the email if the key is set as email
// in the userschema, albeit whether to send the email or not would configurable too
// In case the client wants to send us to send the email, there will be a lot of things that
// will be needed to be implemented. For example client specific email template and so on
// Not re-inventing the wheel, let the client decide how she's going to distribute the tokens
exports.generateToken = async (req, res, next) => {
    try {
        res.json({ message: 'not implemented yet' });
    } catch (error) {
        next(error);
    }
};
