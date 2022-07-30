import storage from './storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'
export const getToken = () => storage.get(TOKEN)
export const setToken = (val) => storage.set(TOKEN, val)
export const removeToken = () => storage.remove(TOKEN)
