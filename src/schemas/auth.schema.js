import z from 'zod';



// ¿Cómo se usa Zod en Express?
// En una aplicación de Express.js, 
// puedes usar Zod para validar los datos que llegan en las solicitudes (req.body, req.params, req.query). 
// Esto es útil para asegurarte de que la información es válida antes de procesarla.




// definicion de esquema zod de validacion de registro
export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Email invalid'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password very basic'
    })
})


// definicion de esquema zod de validación de login
export const loginSchema = z.object({

    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Email invalid'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password very basic'
    })
    
})