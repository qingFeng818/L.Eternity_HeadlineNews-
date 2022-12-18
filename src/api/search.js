import request from '@/utils/request'

/**
 *
 * @param {String} q 搜索关键词
 * @returns Promise
 */
export const getSearchSuggetionsApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

export const getSearchResultApi = (page, perpage, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page: perpage,
      q
    }
  })
}
