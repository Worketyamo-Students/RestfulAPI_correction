import {body} from 'express-validator'

export const inputValidator = [
    body('name','Invalid does not empty').not().isEmpty(),
    body('email','Invalid does not empty').not().isEmpty(),
    body('email','Invalid email').isEmail(),
    body('password','Invalid does not empty').not().isEmpty(),
    body('password','le minimum de caracteres : 6').isStrongPassword({minLength:6})
]