import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice.js'
import { toast } from 'react-toastify';

export const RegisterPage = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const { status } = useSelector((state) => state.auth);
   const isAuth = useSelector(checkIsAuth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

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
         dispatch(registerUser({ username, password }))
         setPassword('');
         setUsername('');
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <form
         onSubmit={(e) => e.preventDefault()}
         className='auth-form'
      >
         <h1 className='auth-form__title'>Реєстрація</h1>
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
               Підтвердити
            </button>
            <Link
               to='/login'
               className='flex justify-center items-center'
            >
               Вже зареєстровані ?
            </Link>
         </div>
      </form>
   )
}
