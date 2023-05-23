import React, { useState, useEffect } from 'react';
import { PostItem } from '../components/PostItem.jsx';
import axios from '../utils/axios.js';

export const PostsPage = () => {
   const [posts, setPosts] = useState([]);

   const fetchMyPosts = async () => {
      try {
         const { data } = await axios.get('/posts/user/me');
         setPosts(data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchMyPosts();
   }, []);

   return (
      <div className='posts-container' style={{margin: '0 auto'}}>
         {posts?.map((post, idx) => (
            <PostItem post={post} key={idx} />
         ))}
      </div>
   );
}
