

function authenticated(req, res, next){
  res.locals.authenticated = (req.cookies.AuthSession ? true : false);
  next()
}

module.exports = {

  authenticated: authenticated,
}
