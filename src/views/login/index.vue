<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />

    <!-- form表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            native-type="button"
            round
            class="carton"
            size="mini"
            v-if="isShow"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            :time="5 * 1000"
            format="ss秒"
            v-else
            @finish="isShow = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'

import { login, getCode } from '@/api'

export default {
  name: 'LoginPage',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShow: true
    }
  },
  methods: {
    async onSubmit() {
      this.loading()
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        const {
          data: { data }
        } = res
        this.$store.commit('SET_TOKEN', data)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (e) {
        // this.$toast.fail('登陆失败')
        console.log(e)
        const status = e.response.status
        let message = ''
        if (status === 400) {
          message = e.response.data.message
        }
        if (status === 507) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },

    // 发送验证码
    sendCode() {
      // 第一步验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        // 第二部发送验证码
        this.loading()
        try {
          const res = await getCode(this.mobile)
          console.log(res)

          this.$toast.success('验证码发送成功')
          this.isShow = false
        } catch (e) {
          console.log(e)
          const status = e.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = e.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    },

    // 封装一个加载提示
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
:deep(.carton) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background: #eee;
    color: #a9929b;
  }
}
// 样式穿透
// :deep()  //我们在引用组件的时候，修改组件内部的样式，需要通过：deep来修改，
</style>
