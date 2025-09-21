import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../api/axiosConfig';

const AuthManager = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        // Interceptor untuk menangani logout otomatis saat token tidak valid (401)
        const responseInterceptor = apiClient.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    console.log("Sesi tidak valid atau kedaluwarsa. Logout otomatis.");
                    logout(); // Panggil fungsi logout dari context
                    navigate('/login'); // Arahkan ke halaman login
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor saat komponen unmount
        return () => {
            apiClient.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logout]);

    return null; // Komponen ini tidak perlu menampilkan apa-apa
};

export default AuthManager;
