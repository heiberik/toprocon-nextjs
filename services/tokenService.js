export const getToken = (name) => {
    const userInfo = JSON.parse(localStorage.getItem(name))
    if (userInfo) return userInfo
    else return null
}

export const setToken = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
}

export const removeToken = (name) => {
    localStorage.removeItem(name)
}