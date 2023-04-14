const Joi = require('joi')

module.exports = {
    profile(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            ),
            fullname: Joi.string().required(),
            // brandname: Joi.string().required(),
            // skill1: Joi.string().required(),
            // skill2: Joi.string().required(),
            // skill3: Joi.string().required(),
            // skill4: Joi.string().required(),
            // socail_handle1: Joi.string().required(),
            // socail_handle2: Joi.string().required()
        })

        const {
            error
        } = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must Provide a valide Email Address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The Password proveded failed to match the following rule:
                        <br>
                        1. It must contain Only the following characters: lower case, upper case, numeric
                        <br>
                        2. It must be at least 8 characters in length and not greater then 32 chracters`
                    })
                    break
                case 'fullname':
                        res.status(400).send({
                            error: `Fuillname can not be empty`
                        })
                        break
                // case 'brandname':
                //             res.status(400).send({
                //                 error: `Can not be empty`
                //             })
                //         break
                // case 'skill1':
                //             res.status(400).send({
                //                 error: `Can not be empty`
                //             })
                //         break
                // case 'skill2':
                //             res.status(400).send({
                //                 error: `Can not be empty`
                //             })
                //         break
                // case 'skill3':
                //             res.status(400).send({
                //                 error: `Can not be empty`
                //             })
                //     break
                // case 'skill4':
                //             res.status(400).send({
                //                 error: `Can not be empty`
                //             })
                //     break
                // case 'socail_handle1':
                //             res.status(400).send({
                //                 error: `Can not be empty`
                //             })
                //         break
                // case 'socail_handle2':
                //             res.status(400).send({
                //                 error: `Can not be empty`
                //             })
                //         break
                default:
                    res.status(400).send({
                        error: 'Invalid registration detail'

                    }),console.log(error)
            }
        } else {
            next()
        }
    }
}