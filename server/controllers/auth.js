import User from '../models/User.js';
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET2 } from '../index.js';

// Register user
export const register = async (req, res) => {
   try {
      // Получаємо данні з фронту
      const { username, password } = req.body;

      const isUsed = await User.findOne({ username });
      if(isUsed) {
         return res.json({ message: 'Цей username вже зайнятий.' });
      }

      //Складність хешування
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({
         username,
         password: hash,
      });

      const token = jwt.sign(
         {
            id: newUser._id,
         },
         //process.env.JWT_SECRET,
         JWT_SECRET2,
         { expiresIn: '30d' },
      );

      await newUser.save();

      res.json({
         newUser,
         token,
         message: 'Реєстрація пройшла успішно.',
      })
   } catch(error) {
      res.json({ message: `Помилка при створенні користувача. ${error}`,});
   }
}
// Login user
export const login = async (req, res) => {
   try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if(!user) {
         return res.json({ message: 'Такого користувача немає.', });
      }

      // Функція compare порівнює введений пароль та хешований пароль
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if(!isPasswordCorrect) {
         return res.json({ message: 'Ви невірно ввели пароль.' });
      }

      const token = jwt.sign(
         {
            id: user._id,
         },
         //process.env.JWT_SECRET,
         JWT_SECRET2,
         { expiresIn: '30d' },
      );

      res.json({
         token,
         user,
         message: 'Ви успішно увійшли в систему.',
      });
   } catch(error) {
      res.json({ message: 'Помилка при авторизації.',});
   }
}

//Get me
export const getMe = async (req, res) => {
   try {
      // Саме той userId який я вшив в req у checkAuth.js
      const user = await User.findById(req.userId);
      if(!user) {
         return res.json({ message: 'Такого користувача немає.', });
      }

      const token = jwt.sign(
         {
            id: user._id,
         },
         //process.env.JWT_SECRET,
         JWT_SECRET2,
         { expiresIn: '30d' },
      );

      res.json({
         user,
         token,
      })
   } catch(error) {
      res.json({ message: 'Немає доступу.',});
   }
}
