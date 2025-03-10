import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createdAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';


export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try{    

        const userFound = await User.findOne({email});
        if (userFound) return res.status(400).json(["the email is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10);        // esto nos hashea la contraseña

    const newUser = new User({
        username,
        email,
        password: passwordHash
    })

    const userSaved = await newUser.save(); // puede que vaya bien o mal, conexion tambien, entonces se pone await
    //res.json(userSaved); esto si queremos pasar toda la informacion, pero la contraseña no me interesa a pesar de estar hasheada, por tanto


    const token = await createdAccessToken({id: userSaved._id});

    

     // Establece la cookie con el token (si aún quieres usarlo)
     res.cookie("token", token, {
        httpOnly: true, // Asegura que la cookie no sea accesible desde JavaScript
        secure: process.env.NODE_ENV === 'production', // Solo en producción con HTTPS
        sameSite: 'None', // Para que la cookie funcione en entornos CORS
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });

    
    res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
        
    })

    console.log(newUser);

    }
    catch(error) {

        res.status(500).json({message: error.message});
    }

    

}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: 'User Not Found' });

        // Corregido: el orden de los parámetros en bcrypt.compare
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect Password' });

        const token = await createdAccessToken({ id: userFound._id });

        res.cookie("token", token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false,
        });
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const logout = async (req, res) => {

    res.cookie("token", "", {
        expires: new Date(0),
    });

    return res.sendStatus(200);
}


export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if(!userFound) return res.status(404).json({message : "User Not Found"});
    return res.json({
        id: userFound._id,
        username: userFound.username, 
        email: userFound.email,
        createdAt: userFound.createdAt, 
        updatedAt: userFound.updatedAt,
        
    })
}

export const verifyToken = async(req, res) => {
    const {token} = req.cookies;
    if (!token) return res.status(401).json({message: "Unauthorized"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({message: "Unauthorized"});

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({message: "Unauthorized"});

        return res.json({
            id: userFound._id,
            username: userFound.username, 
            email: userFound.email,
        });
    });
}






   

