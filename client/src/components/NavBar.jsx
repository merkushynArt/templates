import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';
import { HiHome } from 'react-icons/hi';
import { BiUserPin, BiLogIn, BiLogOut } from 'react-icons/bi';
import { MdOutlineAddCircle } from "react-icons/md";


export const NavBar = () => {
   const isAuth = useSelector(checkIsAuth);
   const dispatch = useDispatch();

   const activeStyles = {
      color: "rgb(0, 0, 0)",
   }

   const logoutHandler = () => {
      dispatch(logout());
      window.localStorage.removeItem('token');
      toast('Ви вийшли із системи');
   }

   return (
      <div className='navbar'>
         <div className='navbar__container'>

            <Link className='navbar__logo' to={'/'}>
               bySome_Guy13
            </Link>

            { isAuth && (
               <ul className='navbar__list'>
                  <li>
                     <NavLink
                        to={'/'}
                        href='/'
                        className='navbar__list-item'
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                     >
                        <HiHome style={{fontSize : '24px'}}/>
                        <span>Головна</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to={'/posts'}
                        href='/'
                        className='navbar__list-item'
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                     >
                        <BiUserPin style={{fontSize : '24px'}}/>
                        <span>Мої шаблони</span>
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to={'/new'}
                        href='/'
                        className='navbar__list-item'
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                     >
                        <MdOutlineAddCircle style={{fontSize : '24px'}}/>
                        <span>Добавити шаблон</span>
                     </NavLink>
                  </li>
               </ul>
            )}

            <div className='authblock__container'>
               {isAuth ? (<Link className='authblock' to={'/'} onClick={logoutHandler}><BiLogOut style={{fontSize : '24px'}}/> Вийти</Link>) : (<Link className='authblock' to={'/login'}><BiLogIn style={{fontSize : '24px'}}/> Увійти </Link>)}
            </div>

         </div>
      </div>
   );
}
