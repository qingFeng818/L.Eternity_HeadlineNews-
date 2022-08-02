import request from '@/utils/request'

//  让所有的请求自动添加上Authorizaiton请求头
// 在请求或响应被then或catch之前处理

export const getChannels = (params) => {
  return request({
    url: '/v1_0/channels',
    params
  })
}

export const getMyChannels = (params) => {
  return request({
    url: '/v1_0/user/channels'
  })
}
