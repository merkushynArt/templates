import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";

// Create Post
export const createPost = async (req, res) => {
   try {
      const { title, text } = req.body;
      const user = await User.findById(req.userId);

      // Якщо в пості є картинка
      if(req.files) {
         let fileName = Date.now().toString() + req.files.image.name;
         // Отримую ту папку в якій знаходжуся(controllers)
         const __dirname = dirname(fileURLToPath(import.meta.url));
         // Переміщаю картинку в папку uploads
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

         const newPostWithImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: fileName,
            author: req.userId,
         });

         //Зберігаю пост з картинкою в базі данних  Posts
         await newPostWithImage.save();
         // Знайшов User і Пушу в posts User пост з картинкою
         await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithImage },
         });

         return res.json(newPostWithImage);
      }

      // Якщо в пості нема картинки
      const newPostWithoutImage = new Post({
         username: user.username,
         title,
         text,
         imgUrl: '',
         author: req.userId,
      });

      await newPostWithoutImage.save();
      // Знайшов User і пушу в post в User posts без картинки
      await User.findByIdAndUpdate(req.userId, {
         $push: { posts: newPostWithoutImage },
      });

      res.json(newPostWithoutImage);
   } catch (error) {
      res.json({ massage: 'Щось пішло не так.' });
   }
}

//Get all posts
export const getAll = async (req, res) => {
   try {
      // Получаю усі пости та сортую їх по даті створенню
      const posts = await Post.find().sort('-createdAt');
      // Получаю 5 найпопулярніших постів, сортую їч по перегдядам
      const popularPosts = await Post.find().limit(100).sort('-views');

      if(!posts) {
         return res.json({ message: 'Постів немає.' });
      }

      res.json({ posts, popularPosts });
   } catch(error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}

//Get post by id
export const getById = async (req, res) => {
   try {
      // Получив пост та оновив перегляди
      const post = await Post.findByIdAndUpdate(req.params.id, {
         $inc: { views: 1 },
      });

      res.json(post);
   } catch(error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}

// Get all my posts
export const getMyPosts = async (req, res) => {
   try {
      const user = await User.findById(req.userId);
      const list = await Promise.all(
         user.posts.map((post) => {
            return Post.findById(post._id);
         })
      );

      res.json(list);
   } catch (error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}

// Remove post
export const removePost = async (req, res) => {
   try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if(!post) return res.json({ message: 'Такого поста немає.' });

      await User.findByIdAndUpdate(req.userId, {
         $pull: { posts: req.params.id },
      });

      res.json({ message: 'Пост видалений.' });
   } catch (error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}

// Update post
export const updatePost = async (req, res) => {
   try {
      const { title, text, id } = req.body;
      const post = await Post.findById(id);

      if (req.files) {
         let fileName = Date.now().toString() + req.files.image.name;
         const __dirname = dirname(fileURLToPath(import.meta.url));
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
         post.imgUrl = fileName || '';
      }

      post.title = title;
      post.text = text;

      await post.save();

      res.json(post);
   } catch (error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}

// Get post comments
export const getPostComments = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id);

      const list = await Promise.all(
         post.comments.map((comment) => {
            return Comment.findById(comment);
         }),
      );

      res.json(list);
   } catch (error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}