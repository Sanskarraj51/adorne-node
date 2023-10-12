const { HttpException } = require('../../exception/http.exception')
const Joi = require("joi");
module.exports = async (payload) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }).options({allowUnknown: false})
    const { error } = schema.validate(payload);
    if (error) {
        throw new HttpException(422, error.details[0].message)
    }
}