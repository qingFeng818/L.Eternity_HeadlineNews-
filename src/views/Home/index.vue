<template>
  <div>
    <!-- search -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 文章 -->
    <!-- 导航 -->
    <van-tabs v-model="active" swipeable>
      <van-tab
        v-for="item in getMyChannelsList"
        :key="item.id"
        :title="item.name"
      >
        <articleList :id="item.id"></articleList
      ></van-tab>
      <span class="toutiao toutiao-gengduo1"></span>
    </van-tabs>
    <!-- 文章列表 -->

    <!-- main content -->
  </div>
</template>

<script>
import { getChannels, getMyChannels } from '@/api/index'
import articleList from './components/article-list.vue'
export default {
  name: 'Home',
  components: { articleList },
  data() {
    return {
      active: 2,
      channelsList: [],
      getMyChannelsList: []
    }
  },
  methods: {
    // 获取全部频道
    async getChannelsApi() {
      try {
        const res = await getChannels()
        this.channelsList = res.data.data.channels
      } catch (e) {
        this.$toast.fail('获取频道失败，请刷新')
        console.log(e)
      }
    },

    // 获取我的频道
    async getMyChannelsApi() {
      try {
        const res = await getMyChannels()
        this.getMyChannelsList = res.data.data.channels
      } catch (e) {
        console.log(e)
      }
    }
  },

  created() {
    this.getChannelsApi()
    this.getMyChannelsApi()
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  background-color: #3296fa;
  position: sticky;
  left: 0;
  top: 0;
  .van-nav-bar__title {
    max-width: unset;
  }
}
:deep(.search-btn) {
  background: #58a9f9;
  width: 7.4rem;
  color: #fff;
  height: 0.85333rem;
  .van-icon-search {
    color: #fff;
  }
}
:deep(.van-button--default) {
  border: 0.02667rem solid #58a9f9;
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  left: 0;
  top: 92px;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;
    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
:deep(.toutiao-gengduo1) {
  position: fixed;
  top: 92px;
  background: #fff;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 1;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
.van-tab__pane {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  overflow: auto;
}
:deep(.van-tabs--line),
:deep(.van-tabs__wrap) {
  height: 82px;
}

// 导航栏样式
</style>
