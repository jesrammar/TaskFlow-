import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';



export function createdAccessToken(payload){

    return new Promise((resolve, reject) => {

         // generacion del token jwt para que nuestra api tenga la maxima seguridad posible 
    jwt.sign( payload, TOKEN_SECRET, 
        {
            expiresIn: "1d",
        }, 
        (err, token) => {
            if(err) reject(err);
           // no hace falta que se devuelva el token manualmente, se puede realizar mediante una cookie
            // res.json({token});
            // res.cookie('token', token);
            // res.json({
            //     message: 'user created sucessfully'
            // });

            resolve(token)
        })

    })


   



}
