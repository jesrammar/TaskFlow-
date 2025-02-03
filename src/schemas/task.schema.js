import z from 'zod'




export const taskSchema = z.object({
    title: z.string({
        required_error: 'Invalid title'
    }).max(20), 

    description: z.string({
        required_error: 'Invalid description'
    }).min(20).max(200), 

    date: z.string().datetime().optional,

})