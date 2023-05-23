import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiTwotoneEdit } from "react-icons/ai";


export const UserInfo = () => {
   const { user } = useSelector((state) => state.auth);

   return (
      <div className='user-info'>
         <div className="user-info__avatar">
            <img src="" alt="avatar" />
         </div>
         <div className='user-info__text'>
            <h3 className='user-info__text-title'>{user.username}</h3>
            <div>{user.description}</div>
            <Link to='/user/edit'>
               <AiTwotoneEdit/>
            </Link>
         </div>
      </div>
   );
}
