const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async(req, res, next) => {
    const token = req.signedCookies.token

    if(!token){
        // throw new CustomError.UnauthenticatedError('Authentication Invalid')
        res.redirect('/login')
    } 
    try{
        const {name, email, userId, image, role} = isTokenValid({token})
        req.user = {name, email, userId, image, role}
        next()

    } catch(error){
        // throw new CustomError.UnauthenticatedError('Authentication Invalid')
        res.redirect('/login')
    }
    
}

// const authenticatePermissions = (req, res, next) => {
//     if(req.user.role !== 'admin'){
//         throw new CustomError.UnauthorizedError('Not Permitted')
//     }
//     next()
// }


const authenticatePermissions = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            // throw new CustomError.UnauthorizedError('Not Permitted')
            res.redirect('/login')
        }
        next()
    }
}
module.exports = {
    authenticateUser,
    authenticatePermissions
}