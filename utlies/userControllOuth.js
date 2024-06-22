const loadAuth = (req, res) => {
    res.render('auth');
}

const successGoogleLogin = (req , res) => { 
    if (!req.user) 
    {
        res.json({status:"FAILED",message:"user not found"})
        
        }
		
    console.log(req.user);
    res.send("Welcome " + req.user.email); 
    res.json({ status: "SUCCUSS",message:"auth successfu" })
}

const failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}

export {
    loadAuth,
    successGoogleLogin,
    failureGoogleLogin
}