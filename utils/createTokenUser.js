const createTokenUser = (user) => {
    return {name: user.name, email: user.email, userId: user._id, image: user.image, role: user.role}
}

module.exports = createTokenUser