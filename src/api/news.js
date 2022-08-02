import request from '@/utils/request'

/**
 *
 * @param {*} channelId
 * @param {*} timetamp
 * @returns Promise
 */
export const getArticleApi = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
