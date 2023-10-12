const jwt = require('jsonwebtoken')
const { InvalidAuthException } = require('../exception/http.exception')
module.exports = (req , res , next)=>{
    try {
        console.log('auth middleware')
        const authorization = req.headers?.authorization
        if(authorization){
            const token = authorization.split(' ')[1]
            const decoded =  jwt.verify(token, process.env.JWT_SECRET);
            req.userInfo = decoded
            return next()
        }
        throw new InvalidAuthException

      } catch(error) {
         return res.status( error.http_code || 403 ).json({ code : false , message : error.message})
      }
}