import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";

export const PopularPosts = ({post}) => {
   return (
      <div>
         <Link
            to={`${post._id}`}
            className='posts-popular__item'
         >
            <h4 className='posts-popular__item-title'>{post.title}</h4>
            <div className='posts-popular__item-views'><AiFillEye /> <span>{ post.views }</span></div>
         </Link>
      </div>
   )
}
