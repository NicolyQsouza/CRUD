const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const connection = require('./config/db');

const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Importando a rota do dashboard
const isAuthenticated = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do Passport
require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'seuSegredoAqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/', dashboardRoutes); // Integrando a rota do dashboard

app.use('/users', isAuthenticated, userRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/categorias', isAuthenticated, categoriaRoutes);
app.use('/vendas', isAuthenticated, vendaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
