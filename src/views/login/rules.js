export const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[0-9]\d{9}$/, message: '请输入正确的手机号' }
]

export const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
]
