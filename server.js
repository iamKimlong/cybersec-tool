require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')

const productRoutes = require('./routes/productRoutes');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes')
const adminRoutes = require('./routes/adminRoutes')


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser())

app.use(session({
    secret: process.env.SESSION_SECRET || 'cyber cadt idri idt idg',
    saveUninitialized: true,
    resave: true
}));

// Configure flash middleware
app.use(flash());

// Make flash messages available in all views (with res.locals)
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.user = req.session.user;
    next();
});


app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('public/uploads'));

app.use('/product', productRoutes);
app.use('/admin', adminRoutes);
app.use('/', indexRoutes);
app.use('/',userRoutes);
app.use('/api/cart', cartRoutes)


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
    res.status(500).send('Something broke!');
});