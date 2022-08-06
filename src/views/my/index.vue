<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">
        <button @click="editUser">编辑按钮</button>
      </div>
      <div class="logout" v-else>未登录盒子</div>
    </header>

    <!-- main区域 -->
    <main>收藏/历史/消息通知/小智同学</main>

    <!-- footer -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      // 清除token
      this.$store.commit('SET_TOKEN', {})
    },
    editUser() {
      this.$router.push('/user')
    }
  }
}
</script>

<style lang="less" scoped></style>
