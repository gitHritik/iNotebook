const jwt = require('jsonwebtoken');
const JWT="hritikChouhan$324"


const fetchuser = (req,res,next) =>{
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send("Please autherized with valid token");
     
    }
    try {
        const data = jwt.verify(token,JWT);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Please autherized with valid token");
    }
}

module.exports = fetchuser;