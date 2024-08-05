const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./User'); // Adjust path according to your structure
const keys = require('./keys'); // Store your app keys here

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:4000/api/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'] // Customize based on what data you need
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in our db
        let user = await User.findOne({ where: { facebookId: profile.id } });
        if (user) {
          return done(null, user);
        }

        // If not, create a new user
        user = await User.create({
          facebookId: profile.id,
          email: profile.emails[0].value,
          name: `${profile.name.givenName} ${profile.name.familyName}`
        });
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
