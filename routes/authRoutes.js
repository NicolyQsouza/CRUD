const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel'); // Importando o modelo de usuário

// Rota para exibir a página de login
router.get('/login', (req, res) => {
    const messages = req.flash('error'); // Mensagens de erro
    res.render('login', { messages }); // Passa mensagens para a view
});

// Rota de login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redireciona para o painel após o login
    failureRedirect: '/auth/login', // Redireciona para a página de login em caso de falha
    failureFlash: true // Habilita flash messages para erros
}));

// Rota para exibir a página de registro
router.get('/register', (req, res) => {
    const messages = req.flash('error'); // Mensagens de erro
    res.render('register', { messages }); // Passa mensagens para a view
});

// Rota de registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username });
        await User.register(newUser, password); // Usando o método register do passport-local-mongoose
        req.flash('success', 'Usuário criado com sucesso!');
        res.redirect('/auth/login'); // Redireciona para a página de login após o registro
    } catch (err) {
        req.flash('error', 'Erro ao criar usuário: ' + err.message);
        res.redirect('/auth/register'); // Redireciona para a página de registro em caso de erro
    }
});

// Rota de logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/'); // Redireciona para a página inicial após logout
    });
});

module.exports = router;
