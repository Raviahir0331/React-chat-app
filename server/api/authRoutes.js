const router = require('express').Router();
const passport = require('passport');

// Route to initiate Facebook authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Callback route for Facebook to redirect to
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home
    res.redirect('/home');
  }
);

module.exports = router;
