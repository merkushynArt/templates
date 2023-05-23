import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopularPosts } from '../components/PopularPosts.jsx';
import { PostItem } from '../components/PostItem.jsx';
import { getAllPosts } from '../redux/features/post/postSlice.js';

export const MainPage = () => {
   const dispatch = useDispatch();
   const { posts, popularPosts } = useSelector((state) => state.post);
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      dispatch(getAllPosts());
   }, [dispatch]);

   if (!posts.length) {
      return (
         <div className='text-xl text-center text-white py-10'>
            Постів немає.
         </div>
      )
   }

   /*
   <div className='posts-container'>
            {posts?.map((post, idx) => (<PostItem key={idx} post={post} />))}
         </div>
   */

   return (
      <div className='main'>
         <div className='search-bar'>
            <input
               type='text'
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder='Пошук'
            />
         </div>

         <div className="posts-wrapper">
            <div className='posts-container'>
               {posts
                  .filter((post) =>
                     post.text.toLowerCase().startsWith(searchQuery.toLowerCase())
                  )
                  .map((post, idx) => (
                     <PostItem key={idx} post={post} />
                  ))}
            </div>

            <div className='posts-popular'>
               <h3 className='posts-popular__title'>
                  Популярні питання:
               </h3>
               {popularPosts?.map(
                  (post, idx) => (<PopularPosts key={idx} post={post} />)
               )}
            </div>
         </div>
      </div>
   )
}
