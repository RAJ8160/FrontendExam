import { createContext, useContext, useEffect, useState } from "react";
import { getToken, getUserData, logoutService } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) {
            const userData = getUserData();
            setUser(userData);
        }
        setLoading(false);
    }, []);

    const loginAuth = (userData) => {
        setUser(userData);
    }

    const logoutAuth = () => {
         logoutService();
        setUser(null);
    }

    return (
        <AuthContext.Provider
         value={{
             loading, 
             user, 
             loginAuth,
              logoutAuth,
               isAuthenticated: user !== null ,
               isDoctor : user?.role === 'doctor',
               isPatient : user?.role === 'patient',
               isReceptionist:user?.role === 'receptionist',
               isAdmin:user?.role === 'admin',}}>
            {children}
        </AuthContext.Provider>)
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be within AuthProvider')
    }
    return context;
}