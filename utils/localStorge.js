export const setLocal = (key, val) => {
    window.localStorage.setItem(key, val)
}

export const getLocal = (key) => {
    return window.localStorage.getItem(key)
}

export const removeLocal = (key) => {
    window.localStorage.removeItem(key)
}