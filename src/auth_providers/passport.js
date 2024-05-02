const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const Account = require('../account/model/account_model');

passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.serializeUser((user, done) => {
	done(null, user);
});

/**
 * Google Strategy
 * Google OAuth, the Google Strategy in Passport.js is the first to receive the user's data from Google.
 * Here, the primary purpose is to process this data to create or find the user in your database.
 */
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `http://${process.env.AUTH_API_HOST}:${process.env.AUTH_API_PORT}/auth/google/callback`,
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
			try {
				const account = await Account.findOrCreate(
					{
						email: profile.email,
					},
					{
						googleId: profile.id,
						email: profile.email,
						firstName: profile.given_name,
						lastName: profile.family_name,
						provider: profile.provider,
						status: profile.email_verified ? 'active' : 'pending',
					}
				);

				return done(null, account);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);
