import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';

export const LoginPage = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const  { status } = useSelector((state) => state.auth);
   const isAuth = useSelector(checkIsAuth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (status) {
         toast(status);
      } 
      if (isAuth) {
         navigate('/');
      }
   }, [status, isAuth, navigate]);

   const handleSubmit = () => {
      try {
         dispatch(loginUser({ username, password }));
      } catch (error) {
         console.log(error);
      }
   }
   
   return (
      <form
         onSubmit={(e) => e.preventDefault()}
         className='auth-form'
      >
         <h1 className='auth-form__title'>Авторизація</h1>

         <label className='auth-form__input'>
            Username:
            <input
               type='text'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
         </label>

         <label className='auth-form__input'>
            Password:
            <input
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </label>

         <div className='post__btns'>
            <button
               type='submit'
               onClick={handleSubmit}
               className='btn-ok'
            >
               Увійти
            </button>
            <Link
               to='/register'
               className='flex justify-center items-center'
            >
               Немає аккаунту ?
            </Link>
         </div>
      </form>
   );
}
