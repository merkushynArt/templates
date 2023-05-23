import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete, } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import Moment from 'react-moment';
import axios from '../utils/axios.js';
import { toast } from 'react-toastify';
import { removePost } from '../redux/features/post/postSlice.js';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice.js';
import { CommentItem } from '../components/CommentItem.jsx';
import TextareaAutosize from 'react-textarea-autosize';

export const PostPage = () => {
   const [post, setPost] = useState(null);
   const [comment, setComment] = useState('');
   const { comments } = useSelector((state) => state.comment);
   const { user } = useSelector((state) => state.auth);
   const params = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const removePostHandler = () => {
      try {
         dispatch(removePost(params.id));
         toast('Пост був видалений.');
         navigate('/posts');
      } catch (error) {
         console.log(error);
      }
   }

   const handleSubmit = () => {
      try {
         const postId = params.id;
         dispatch(createComment({ postId, comment }));
         setComment('');
      } catch (error) {
         console.log(error);
      }
   }

   const fetchPost = useCallback(async () => {
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
   }, [params.id]);

   const fetchComments = useCallback(async () => {
      try {
         dispatch(getPostComments(params.id));
      } catch (error) {
         console.log(error);
      }
   }, [params.id, dispatch]);

   useEffect(() => {
      fetchPost();
   }, [fetchPost]);

   useEffect(() => {
      fetchComments();
   }, [fetchComments]);

   if (!post) {
      return (
         <div className='text-xl text-center py-10'>
            Загрузка...
         </div>
      )
   }

   return (
         <div className='postpage'>
            <div>
               <div
                  className={
                     post?.imgUrl
                        ? 'flex rounded-sm'
                        : 'flex rounded-sm'
                  }
               >
                  {post?.imgUrl && (
                     <img
                        src={`https://raw.githubusercontent.com/merkushynArt/posts/master/server/uploads/${post.imgUrl}`}
                        alt='img'
                        className='object-cover w-full'
                     />
                  )}
               </div>
            </div>
            
            <div className='postpage__info'>
               <div className='flex justify-between items-center pt-2'>
                  <div className='text-xs opacity-90'>
                     {post.username}
                  </div>
                  <div className='text-xs opacity-90'>
                     <Moment date={post.createdAt} format='D MMM YYYY' />
                  </div>
               </div>
               <div className='postpage__title'>{post.title}</div>
               <p className='postpage__text'>{post.text}</p>
               <div className='postpage__config'>
                  <div className='postpage__config-item'>
                     <button className='flex items-center justify-center gap-2'>
                        <AiFillEye /> <span>{post.views}</span>
                     </button>
                     <button className='flex items-center justify-center gap-2'>
                        <AiOutlineMessage />{' '}
                        <span>{post.comments?.length || 0} </span>
                     </button>
                  </div>
                  {user?._id === post.author && (
                     <div className='postpage__config-item'>
                        <button className='flex items-center justify-center gap-2'>
                           <Link to={`/${params.id}/edit`}>
                              <AiTwotoneEdit />
                           </Link>
                        </button>
                        <button
                           onClick={removePostHandler}
                           className='flex items-center justify-center gap-2'
                        >
                           <AiFillDelete />
                        </button>
                     </div>
                  )}
               </div>
               <form
                  className='postpage-comments__form'
                  onSubmit={(e) => e.preventDefault()}
               >
                  <TextareaAutosize
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     placeholder='Добавте ваш коментар'
                     className='postpage-comments__form-textarea'
                  />
                  <button
                     type='submit'
                     onClick={handleSubmit}
                     className='postpage-comments__form-btn'
                  >
                     <IoSend/>
                  </button>
               </form>
               {comments?.map((cmt) => (<CommentItem  key={cmt._id} cmt={cmt} />))} 
            </div>
         </div>
   )
}
