import { createContext, useState, useContext} from "react";
import {registerRequest, loginRequest} from '../api/auth'


export const AuthContext = createContext()



export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [errors, setErrors] = useState([]);


    const signup = async  (user)=> {


        try{
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data)
            setIsAuthenticated(true)

        }

        catch(error){
            console.log(error.response.data)
            setErrors(error.response.data)
        }
       
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]); // Limpiar errores si el login es exitoso
        } catch (error) {
            console.log(error.response?.data);
            const errorData = error.response?.data;
            setErrors(Array.isArray(errorData) ? errorData : [errorData.message || "Invalid Email"]);
        }
    }

    return (
        <AuthContext.Provider value = {{signup,signin, user, isAuthenticated,errors}}>
            {children}
        </AuthContext.Provider>
    )
}







