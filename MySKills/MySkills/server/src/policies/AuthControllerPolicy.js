const Joi = require ('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp ('^[a-zA-Z0-9]{8,32}$')
            )
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: 'You must Provide a valide Email Address'
                    })
                    break
                case 'password':
                    res.status(400).send ({
                        error: `The Password proveded failed to match the following rule:
                        <br>
                        1. It must contain Only the following characters: lower case, upper case, numeric
                        <br>
                        2. It must be at least 8 characters in length and not greater then 32 chracters`
                    })
                    break
                default:
                        res.status(400).send({
                            error: 'Invalid registration detail'
                        })
            }
        } else {
            next()
        }
    }
}