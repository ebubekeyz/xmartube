const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async(req, res, next) => {
    const token = req.signedCookies.token

    if(!token){
        // throw new CustomError.UnauthenticatedError('Authentication Invalid')
        res.redirect('/chat')
    } 
    try{
        const {email, subscribeId} = isTokenValid({token})
        req.subscribe = {email, subscribeId}
        next()

    } catch(error){
        // throw new CustomError.UnauthenticatedError('Authentication Invalid')
        res.redirect('/chat')
    }
    
}

// const authenticatePermissions = (req, res, next) => {
//     if(req.user.role !== 'admin'){
//         throw new CustomError.UnauthorizedError('Not Permitted')
//     }
//     next()
// }


module.exports = {
    authenticateUser
}