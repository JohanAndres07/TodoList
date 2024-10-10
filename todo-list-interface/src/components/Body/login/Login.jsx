import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/AuthLogin'; 
import emailIcon from '../../../assets/images/email.svg';
import keyIcon from '../../../assets/images/key.svg';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { token, userId } = await login(email, password); 
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            console.log('Login successful');
            navigate('/tasks');
        } catch (error) {
            console.error(error);
            setErrorMessage(error);
        }
    };

    return (
        <section className='fixed inset-0 backdrop-blur-sm bg-slate-100 w-full h-screen flex justify-center items-center'>
            <div className='flex flex-col h-[25rem] p-4 bg-white w-[85%] justify-center shadow-lg rounded-2xl md:w-[70%] lg:w-[30%]'>
                <div className='flex justify-center'>
                    <h1 className='font-bold text-blue-normal text-[2.3rem] mx-[.20rem]'>Log</h1>
                    <p className='font-bold text-[2.3rem]'>in</p>
                </div>

                <div className='flex items-center mb-4 border-b-2 pl-4'>
                    <img src={emailIcon} alt="email" className='h-4 w-4' />
                    <input className="border p-2 w-full border-none text-lg focus:outline-none"
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='flex items-center mb-4 border-b-2 pl-4'>
                    <img src={keyIcon} alt="password" className='h-4 w-4' />
                    <input className="border p-2 border-none w-full text-lg focus:outline-none"
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='flex justify-center mb-4'>
                    <input className='w-full bg-blue-dark text-white font-bold font-Inter p-2 rounded cursor-pointer tracking-[.56rem]' type="button"
                        value="LOGIN"
                        onClick={handleLogin} />
                </div>

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                <p className='font-Jura pl-4'>Don't have an account?
                    <Link to="/register" className='text-blue-600 underline font-Jura'> Signup here</Link>
                </p>
            </div>
        </section>
    );
};
