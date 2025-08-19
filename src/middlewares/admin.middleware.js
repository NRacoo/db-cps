const jwt =require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeder = req.headers['authorization'];

    if(typeof bearerHeder !== "undefined"){
        const token = bearerHeder.split(' ')[1];

        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if(err){
                console.log("JWT: ", err)
                return res.status(403).json({message: "invalid token"})
            }else{
                req.user = decoded;
                next();
            }
        })
    }else{
        res.status(401).json({message:"token not provided"})
    };
}

const verifyAdmin =  (req, res, next) => {
    if(req.user.role !== "Admin"){
        return res.status(403).json({message: "hanya admin yang bisa membuat content"})
    }
    next()
}

module.exports = {verifyToken, verifyAdmin};