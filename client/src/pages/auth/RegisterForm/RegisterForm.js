import React, { useState } from 'react';
import './RegisterForm.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,

            });

            console.log('User Successfully Registered:', response.data);
            alert('Register successful!');


        } catch (err) {
            console.error('Register failed:', err);
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <Link to='/'>Already A User? Please Log In </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
