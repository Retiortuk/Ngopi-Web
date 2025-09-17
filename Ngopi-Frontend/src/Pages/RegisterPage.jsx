import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import toast from "react-hot-toast";

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Cek Kalo Masih kosong gk boleh daftar
        if (!name || !email || !password) {
            toast.error('You Must Input all The Fields');
            return;
        }
        if (password.length < 6) {
            toast.error('Password Needs At Least 6 Characters!');
            return;
        }

        try {
            await register(name, email, password);
            toast.success("You're Registered! Login to Continue!");
            navigate('/login');
        } catch (error) {
            console.error('Failed To Register', error);
            const errorMessage = error.response?.data?.message || 'Registered Failed, Please Try Again!';
            toast.error(errorMessage);
        }
    };
    return(
        <div className="d-flex vh-100 align-items-center justify-content-center bg-light" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            
            <div className="bg-white p-5 rounded-4 shadow" style={{width: '100%', maxWidth: '450px'}}>
                <div className="text-center mb-4">
                    <Link to="/" className="h2 fw-bold text-dark text-decoration-none">
                        Ngopi.
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>

                    {/* NAMA */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Your Name
                        </label>
                        <input
                            type="text" 
                            id="name"
                            className="form-control form-control-sm"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            placeholder=""
                            required
                            />
                    </div>
                    
                    {/* EMAIL */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email" 
                            id="email"
                            className="form-control form-control-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="position-relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password"
                                className="form-control form-control-sm fst-italic"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=""
                                required
                            />
                            <button
                                type="button"
                                onClick={()=> setShowPassword(!showPassword)}
                                className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-muted"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.288.822.822.083.083.083.083a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 6.854-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg>
                                ): (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>
                                )}
                            </button>

                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <small className="text-muted">Already have an account? 
                            <Link to="/login" className="text-decoration-underline text-dark fw-semibold"> Login </Link>
                        </small>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-dark w-100">
                                Register
                            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;