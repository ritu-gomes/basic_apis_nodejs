const { registerSchema, updateSchema } = require('../schema/user.schema');

const validateUserRegistration = async (user) => {
    try {
        await registerSchema.validate(user);
        return null;
    } catch (error) {
        return error.errors[0];
    }
};

module.exports.validateUserRegistration = validateUserRegistration;

const validateUserInfoChange = async (user) => {
    try {
        await updateSchema.validate(user);
        return null;
    } catch (error) {
        return error.errors[0];
    }
};

module.exports.validateUserInfoChange = validateUserInfoChange;