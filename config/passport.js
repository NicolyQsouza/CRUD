const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel'); // Certifique-se de que este caminho está correto

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        { usernameField: 'username' },
        (username, password, done) => {
            User.findByUsername(username, (err, user) => {
                if (err) return done(err);
                if (!user) return done(null, false, { message: 'Usuário não encontrado' });

                // Verifica a senha
                User.comparePassword(password, user.password, (err, isMatch) => {
                    if (err) return done(err);
                    if (!isMatch) return done(null, false, { message: 'Senha incorreta' });
                    return done(null, user);
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
