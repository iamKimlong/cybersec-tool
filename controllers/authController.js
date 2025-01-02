const User = require('../models/userModel');

exports.renderLoginForm = (req, res) => {
    res.render('user/login', { title: 'Login' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.getByUsername(username);
        if (!user) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }
        if (password !== user.password) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }
         req.session.user = { id: user.id, username: user.username, isAdmin: user.isAdmin };
        res.cookie('username', user.username);
        res.cookie('isLoggedIn', 'true');
        return res.redirect('/'); 
    } catch (error) {
        console.error("Login error", error);
        req.flash('error', 'An error occurred during login.');
        return res.redirect('/login'); 
    }
};

exports.renderRegisterForm = (req, res) => {
    res.render('user/register', { title: 'Register' });
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create(username, password);
         req.session.user = { id: user.id, username: user.username, isAdmin: user.isAdmin };
         res.cookie('username', user.username);
        res.cookie('isLoggedIn', 'true');
        res.cookie('isAdmin', user.isAdmin);
        return res.redirect('/');
    } catch (error) {
        console.error("Register error", error);
        if (error.code === 'ER_DUP_ENTRY') {
            req.flash('error', 'Username already taken');
        } else {
            req.flash('error', 'An error occurred during registration.');
        }
        return res.redirect('/register'); 
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/');
        }
          res.clearCookie('username'); 
         res.clearCookie('isLoggedIn'); 
        return res.redirect('/login');
    });
};