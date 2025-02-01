import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// Middleware para autenticar al usuario antes de acceder a su perfil
export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });

        req.user = user; // Guardamos el usuario en req para acceder en rutas protegidas
        console.log(req.user);

        next(); // Pasamos al siguiente middleware solo si la verificación es correcta
    });
};
