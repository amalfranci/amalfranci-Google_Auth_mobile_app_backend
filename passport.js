import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import User from './models/User.js'; // Ensure the path is correct
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5000/user/google/callback",
    passReqToCallback: true
},
async (request, accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            user = new User({
                email,
                password: hashedPassword,
                verified: true
            });

            await user.save();
        }

        return done(null, user);
    } catch (error) {
        console.error(error);
        return done(error, null);
    }
}));
