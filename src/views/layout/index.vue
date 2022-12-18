<template>
  <div>
    <!-- 二级路由 -->
    <transition :name="transitionname">
      <router-view class="child-view"></router-view>
    </transition>
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
      ],
      transitionname: 'slide-left'
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, 'to')
      console.log(from, 'from')
      if (to.meta.index > from.meta.index) {
        this.transitionname = 'slide-left'
      } else {
        this.transitionname = 'slide-right'
      }
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

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50%, 0);
  overflow: hidden;
  transform: translate(50%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50%, 0);
  overflow: hidden;
  transform: translate(-50%, 0);
}
</style>
