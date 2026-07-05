const ErrorApi = require('../error/ErrorApi');
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendEmail = require('./utils/sendEmail');

class UserController {
  static Register = async (req, resp, next) => {
    try {
      const { name, surname, email, password, phone } = req.body;
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return next(ErrorApi.badRequest('Невірний формат електронної пошти'));
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return next(ErrorApi.forbidden('Користувач з такою електронною поштою вже існує'));
      }

      const saltRounds = parseInt(process.env.CRYPTOPASS, 10) || 10;
      const passwordCrypto = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        name,
        email,
        surname,
        password: passwordCrypto,
        phone,
      });

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          isAdmin: user.isAdmin,
          phone: phone,
        },
        process.env.JWT_SECRET,
        { expiresIn: '5y' }
      );

      return resp.json({ message: 'ви успішно зареєструвалися', token });
    } catch (err) {
      return next(ErrorApi.internalServerError(err.message));
    }
  };

  static Login = async (req, resp, next) => {
    try {
      const { email, password, rememberMe } = req.body;

      // Перевірка, чи є електронна пошта у запиті
      if (!email || !password) {
        return next(ErrorApi.badRequest('Будь ласка, заповніть всі поля'));
      }

      // Перевірка, чи існує користувач з такою електронною поштою
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(
          ErrorApi.unauthorized('Неправильна електронна пошта або пароль')
        );
      }

      // Перевірка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(
          ErrorApi.unauthorized('Неправильна електронна пошта або пароль')
        );
      }

      // Генерація токена
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          isAdmin: user.isAdmin,
          phone: user.phone,
        },
        process.env.JWT_SECRET,
        { expiresIn: rememberMe ? '5y' : '1h' }
      );

      return resp.json({ message: 'Вхід виконано успішно', token });
    } catch (err) {
      return next(ErrorApi.internalServerError(err.message));
    }
  };
}

module.exports = UserController;
