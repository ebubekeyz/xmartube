const createTokenUser = (subscribe) => {
    return {email: subscribe.email, subscribeId: subscribe._id}
}

module.exports = createTokenUser