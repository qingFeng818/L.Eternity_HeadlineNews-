import request from '@/utils/request'

/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @param {String} mobile
 * @returns Promise
 */
export const getCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () =>
  request({
    url: '/v1_0/user/profile'
  })

// 如果我们传的是对象，axios默认将对象转成json，并且加上content表头
// 如果传的是formdata表单，那么axios会将表单提交给后端，并且默认的加上content-type=mutipart/formdata
// 如果后端要的是表单(form-data)
// FormData()
/**
 *
 * @param {*} file 图片的file对象
 * @returns Promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm,
    timeout: 10000
  })
}

export const uploadUser = (data) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })

export const followUser = (id) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })

export const delfollowUser = (target) =>
  request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })

export const followList = (page, perPage) => {
  return request({
    url: '/v1_0/user/followings',
    params: {
      page,
      per_page: perPage
    }
  })
}
