const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
      return next();
  } else {
      req.flash('error', 'You are not authorized to access this page');
      return res.redirect('/');
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
       return next();
  } else if(req.path === '/'){
    return next();
   } else{
     return res.redirect('/login');
  }
};


module.exports = { isAdmin, isLoggedIn };