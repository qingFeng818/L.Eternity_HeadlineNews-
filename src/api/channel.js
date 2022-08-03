import request from '@/utils/request'

import storage from '@/utils/storage'
//  让所有的请求自动添加上Authorizaiton请求头
// 在请求或响应被then或catch之前处理

export const getChannels = (params) => {
  return request({
    url: '/v1_0/channels',
    params
  })
}

export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const delChannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addUserChannels = (channels, id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 封装一个存储本地频道的数据
const HEMA_TOUTIAO_MY_CHANNELS = 'HEMA_TOUTIAO_MY_CHANNELS'

export const setMyChannelsToLocal = (myChannels) =>
  storage.set(HEMA_TOUTIAO_MY_CHANNELS, myChannels)

export const getMyChannelsToLocal = () => storage.get(HEMA_TOUTIAO_MY_CHANNELS)
