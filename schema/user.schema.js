const { object, string, number, date, InferType, ref } = require('yup');

function isEmailLengthValid(email) {
    if (!email) {
        return false;
    }
    const parts = email.split('@');
    const local = parts[0];
    return local.length <= 20;
};

const registerSchema = object({
    username: string()
        .min(3, 'user_name should at leat contain 3 letters')
        .required('this field can not be empty'),
    email: string()
        .email('this field should contain a valid email address')
        .max(100, 'This field must not exceed 100 characters')
        .required('must provide a valid email address')
        .test('is-valid-email-length', 'the part before @ must not exceed 64 characters', email => isEmailLengthValid(email)),
    password: string()
        .min(8,'password should contain at least 8 characters')
        .max(30,'password should contain less than 30 characters')
        .required('Must create a password'),
    confirm_password: string()
        .oneOf([ref('password'),null],'passwords did not match')
        .required('must confirm your password')

});

module.exports.registerSchema = registerSchema;

const updateSchema = object({
    username: string()
        .min(3, 'user_name should at leat contain 3 letters'),
    email: string()
        .email('this field should contain a valid email address')
        .max(100, 'This field must not exceed 100 characters')
        .test('is-valid-email-length', 'the part before @ must not exceed 64 characters', email => isEmailLengthValid(email))

});

module.exports.updateSchema = updateSchema;