import React from 'react';

export const CommentItem = ({ cmt }) => {
   const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 1);
   
   return (
      <div className='postpage-comments__item'>
         <div className='postpage-comments__avatar'>
            {avatar}
         </div>
         <div className='postpage-comments__text'>{cmt.comment}</div>
      </div>
   );
}