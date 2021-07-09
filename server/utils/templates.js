const resetPassword = (user, token, baseUrl) => {
    return `
    <p> Hello ${user.username}, </p> 
    <p> Please reset your password by clicking the link: http://${baseUrl}/password/new/${user.id}/${token.token} </p>`
}

const verifyAccount = (user, token, baseUrl) => {
    return `
    <p> Hello ${user.username}, </p> 
    <p> Please verify your account by clicking the link: http://${baseUrl}/api/users/verification/${user.username}/${token.token} </p>`
}

export default {
    resetPassword,
    verifyAccount
}