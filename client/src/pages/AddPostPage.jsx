import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice.js';
import TextareaAutosize from 'react-textarea-autosize';

export const AddPostPage = () => {
   const [title, setTitle] = useState('');
   const [text, setText] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const submitHandler = () => {
      try {
         // Формую об'єкт в якому будуть ключі: title, text, image(params в createPost)
         const data = new FormData();
         // Поміщаю title, text, image в data
         data.append('title', title);
         data.append('text', text);

         dispatch(createPost(data));
         navigate('/');
      } catch(error) {
         console.log(error);
      }
   }

   const clearFormHandler = () => {
      setText('')
      setTitle('')
   }

   return (
      <form 
         className='add-post'
         onSubmit={(e) => e.preventDefault()}
      >

         <label className='add-post__title'>
            Назва посту:
            <input
               type='text'
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder='Назва посту'
            />
         </label>

         <label className='add-post__text'>
            Текст посту:
            <TextareaAutosize
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder='Текст посту'
            />
         </label>

         <div className='post__btns'>
            <button
               onClick={submitHandler}
               className='btn-ok'
            >
               Добавити
            </button>

            <button
            onClick={clearFormHandler}
               className='btn-cancel'
            >
               Відмінити
            </button>
         </div>
      </form>
   );
}
