import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../redux/features/post/postSlice.js';
import axios from '../utils/axios.js';
import TextareaAutosize from 'react-textarea-autosize';

export const EditPostPage = () => {
   const [title, setTitle] = useState('');
   const [text, setText] = useState('');

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();
   
   const fetchPost = useCallback(async () => {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTitle(data.title);
      setText(data.text);
   }, [params.id]);

   const submitHandler = () => {
      try {
         const updatedPost = new FormData();
         updatedPost.append('title', title);
         updatedPost.append('text', text);
         updatedPost.append('id', params.id);
         dispatch(updatePost(updatedPost));
         navigate('/posts');
      } catch (error) {
         console.log(error);
      }
   }

   const clearFormHandler = () => {
      setTitle('');
      setText('');
   }

   useEffect(() => {
      fetchPost();
   }, [fetchPost]);




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
               cacheMeasurements
               onChange={(e) => setText(e.target.value)}
               value={text}
               placeholder='Текст посту'
               style={{height: 'auto'}}
            />
         </label>

         <div className='post__btns'>
            <button
               onClick={submitHandler}
               className='btn-ok'
            >
               Оновити
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