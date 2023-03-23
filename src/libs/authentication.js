const jwt = require('jsonwebtoken');
const { secretJWT } = require('../keys');
module.exports = {
    isvalidToken(req,res,next){
        
        if(!req.headers.auth) return res.status(401).json('usuario no autorizado');
        const token = req.headers.auth.substr(7);
        if(token !== ''){
            try {
                const content = jwt.verify(token, secretJWT);
                req.data = content;
                // console.log({content});
                next();
            } catch (error) {
                console.log("Error JWT: "+error);
                if(error.name === 'JsonWebTokenError') 
                    return res.status(401).json('Token no valido');
            };
        }else{
            res.status(401).json('Token Vacio');
        };
    }
    // ,
    // isNotvalidToken(req,res,next){
    //     if(req.headers.auth) return res.status(401)
    // }
}