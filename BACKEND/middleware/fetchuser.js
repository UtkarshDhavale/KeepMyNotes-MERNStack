const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shhhh';

const fetchuser= (req,res,next)=>{
    //Get user id from jwt token
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send("Invalid Token");
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch(error){
        res.status(401).send("Invalid Token");
    }
}

module.exports = fetchuser;