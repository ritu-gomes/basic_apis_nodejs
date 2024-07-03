const { object, string, number, date, InferType, ref } = require('yup');

const productSchema= object({
    proname: string()
        .min(2, 'user_name should at leat contain 3 letters')
        .required('productname field can not be empty'),
    price: string()
        .max(10, 'This field must not exceed 10 characters')
        .required('must provide the price of the product'),
    color: string()
        .min(2,'color of the product should contain at least 2 characters')
        .max(50,'color of the product should contain less than 50 characters')
        .required('color  field is required')

});

module.exports.productSchema = productSchema;

const productUpdateSchema = object({
    proname: string()
        .min(2, 'user_name should at leat contain 3 letters'),
    price: string()
        .max(10, 'This field must not exceed 10 characters'),
    color: string()
        .min(2,'color of the product should contain at least 2 characters')
        .max(50,'color of the product should contain less than 50 characters')

});

module.exports.productUpdateSchema = productUpdateSchema;