import express, { Router } from 'express';
import { UpdateUserInformation, UserLogin, VerifyOtp } from '../Controllers/UserController.js';
import passport from 'passport';
import '../passport.js';

const router = express.Router();

router.use(passport.initialize()); 
router.use(passport.session());


const loadAuth = (req, res) => {
     res.send("welcome to home")
}

const successGoogleLogin = (req, res) => { 
	if (!req.user) 
		return res.redirect('/user/failure'); 
    console.log(req.user);
	res.send(`Welcome ${req.user.email}`); 
}

const failureGoogleLogin = (req, res) => { 
	res.send("Error"); 
}

router.get('/success', successGoogleLogin); 
router.get('/failure', failureGoogleLogin);

router.post("/userlogin", UserLogin);
router.post("/verifemail", VerifyOtp);
router.get("/", loadAuth);
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] })); 

router.get('/google/callback', 
    passport.authenticate('google', { 
        successRedirect: '/user/success', 
        failureRedirect: '/user/failure' 
    })
);

router.post('/update-profile',UpdateUserInformation)

export default router;
