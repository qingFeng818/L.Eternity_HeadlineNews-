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

export const getNewsDetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

// 对文章点赞
export const likings = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: { target }
  })
}

// 取消对文章点赞
export const nolikings = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}

// 获取收藏列表，收藏和取消收藏
export const getCollectList = (page, perPage) => {
  return request({
    url: '/v1_0/article/collections',
    params: { page, per_page: perPage }
  })
}

export const collectNews = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: { target }
  })
}

export const delcollectNews = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

// 评论接口
// 获取评论或评论恢复
export const getComment = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
// 对文章或对评论进行评论
export const uploadComment = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}

// 对评论或者评论回复点赞
export const goodComment = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: { target }
  })
}

// 取消对评论或回复点赞
export const delGoodComment = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
