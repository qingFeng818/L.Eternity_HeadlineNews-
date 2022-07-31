<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.to"
      >
        <template #icon><span :class="`toutiao ${item.icon}`"></span></template>
        <span>{{ item.text }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin1',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.toutiao {
  font-size: 36px !important;
}
:deep(.van-tabbar-item) {
  span {
    font-size: 30px;
  }
}
</style>
