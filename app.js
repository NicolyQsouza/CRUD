const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); // Importando o connect-flash
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const authRoutes = require('./routes/authRoutes');
const isAuthenticated = require('./middleware/auth'); // Importando o middleware de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Passport
require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
    secret: 'seuSegredoAqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mude para true se estiver usando HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Adiciona o middleware de flash

// Integrar as rotas
app.use('/', indexRoutes);
app.use('/auth', authRoutes); // Mantenha as rotas de autenticação antes das protegidas

// Rotas protegidas
app.use('/users', isAuthenticated, userRoutes); // Proteger as rotas de usuário
app.use('/produtos', isAuthenticated, produtoRoutes); // Proteger as rotas de produtos
app.use('/categorias', isAuthenticated, categoriaRoutes); // Proteger as rotas de categorias
app.use('/vendas', isAuthenticated, vendaRoutes); // Proteger as rotas de vendas

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
