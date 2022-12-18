import storage from './storage'

const TOKEN = 'HEIMA_TOUTIAO_TOKEN'
export const getToken = () => storage.get(TOKEN)
export const setToken = (val) => storage.set(TOKEN, val)
export const removeToken = () => storage.remove(TOKEN)

const HISTORY = 'HEIMATOUTIAO_HISTORY_LIST'
export const getHistory = () => storage.get(HISTORY)
export const setHistory = (val) => storage.set(HISTORY, val)
export const removeHistory = () => storage.remove(HISTORY)

const NEWDETAIL = 'HEIMATOUTIAO_NEWS_DETAIL'
export const getNewDetail = () => storage.get(NEWDETAIL)
export const setNewDetail = (val) => storage.set(NEWDETAIL, val)
export const removeNewDetail = () => storage.remove(NEWDETAIL)
