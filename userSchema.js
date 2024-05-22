const { object, string, number, date, InferType } = require('yup');

const userSchema = object({
    name: string()
        .min(3, 'user_name should at leat contain 3 letters')
        .required('this field can not be empty'),
    email_or_phone: string()
        .email()
});

module.exports.userSchema = userSchema;