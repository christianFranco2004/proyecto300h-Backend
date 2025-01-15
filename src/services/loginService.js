// 1. Importar dependencias y módulos

import { userModel } from "../models/user.model.js";
import { generateToken } from "../lib/jwt.js";
import bcrypt from 'bcryptjs';


// 2. Nos creamos una función para gestionar el inicio de sesión
const login = async (request, response) => {

    try {

        const {emailLogin, passwordLogin} = request.body;

        const userFound = await userModel.findOne({
            email: emailLogin
        });

        if(!userFound){
            return response.status(404).json({mensaje: 'Usuario no encontrado, por favor registrarse'});
        }

        const isValidPassword = await bcrypt.compare(passwordLogin, userFound.password);

        if(!isValidPassword){
            return response.status(401).json({mensaje: 'Contraseña incorrecta'});
        }

        const payload = {
            id:userFound._id,
            name: userFound.fullName
        }

        if(userFound.role === 'administrador'){
            payload.isAdmin = true;
        }

        const token = await generateToken(payload);

        return response.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            tokenGenerado: token 
        });

        
    } catch (error) {

        return response.status(400).json({
            mensaje: 'Hubo un error al iniciar sesión',
            error: error.message || error
        });
    }

}
export default login;
