import React, {useContext, createContext, useState, useEffect} from "react";
import apiClient from "../api/axiosConfig.js";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: () => Promise.reject(),
    register: () => Promise.reject(),
    logout: () => {},
});


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Logika Buat Logout
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        delete apiClient.defaults.headers.common['Authorization'];
    };

    //Cek ke Local Storage ada apa kagak UserInfo?
    useEffect(()=> {
        try {
            const userInfo = localStorage.getItem('userInfo');
            if(userInfo) {
                const parsedInfo = JSON.parse(userInfo);
                setUser(parsedInfo);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${parsedInfo.token}`
            }
        } catch (error) {
            console.error('Gagal Mengambil data User Dari Local Storage', error);
            localStorage.removeItem('userInfo');
        } finally {
            setLoading(false);
        }
    }, []);

    // Login Logika nye
    const login = async(email, password) => {
        const {data} = await apiClient.post('/users/login', {email, password});
        if(data) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
        return data;
    };

    // Logika Register uy
    const register = async(name, email, password, guestOrderIds) => {
        await apiClient.post('/users/register', {name, email, password, guestOrderIds});
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
    };

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return(useContext(AuthContext))
};