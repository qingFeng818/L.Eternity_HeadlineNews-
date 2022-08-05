<template>
  <div>
    <!-- search -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          class="search-btn"
          round
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
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
      <span class="toutiao toutiao-gengduo1" @click="showPopup"></span>
    </van-tabs>
    <!-- 文章列表 -->

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPopup
        :myChannel="getMyChannelsList"
        @close="show = false"
        @change-active="active = $event"
        @delChannl="delChannl"
        @addChannels="addChannels"
      ></ChannelPopup>
    </van-popup>
  </div>
</template>

<script>
import {
  getChannels,
  getMyChannels,
  delChannels,
  addUserChannels,
  setMyChannelsToLocal,
  getMyChannelsToLocal
} from '@/api/index'
import articleList from './components/article-list.vue'
import ChannelPopup from './components/ChannelPopuo.vue'
export default {
  name: 'Home',
  components: { articleList, ChannelPopup },
  data() {
    return {
      active: 2,
      channelsList: [],
      getMyChannelsList: [],
      show: false
    }
  },
  computed: {
    isLoginin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    initChannels() {
      // 如果用户登录了
      if (this.isLoginin) {
        this.getMyChannelsApi()
      } else {
        // 如果用户没有登录，查看本地存储中是否有内容，如果有内容的话，则添加上去，如果没有内容的话，
        const ishasChannel = getMyChannelsToLocal()
        if (ishasChannel) {
          this.getMyChannelsList = ishasChannel
        } else {
          this.getMyChannelsApi()
        }
      }
    },

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
    },

    // 控制弹出层是否显示
    showPopup() {
      this.show = !this.show
    },
    // 删除用户频道
    async delChannl(item) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      const newState = this.getMyChannelsList.filter(
        (ele) => ele.id !== item.id
      )
      console.log(newState)
      try {
        // 删除服务器数据

        if (this.isLogin) {
          await delChannels(item.id)
        } else {
          setMyChannelsToLocal(newState)
        }

        // 删除页面上的数据
        this.getMyChannelsList = newState
        this.$toast.success('删除数据成功')
      } catch (e) {
        this.$toast.fail('删除频道失败~')
      }
    },
    // 添加用户频道
    async addChannels(channel) {
      try {
        // 添加用户频道
        this.$toast.loading({
          message: '正在添加频道~',
          forbidClick: true
        })
        if (this.isLoginin) {
          await addUserChannels(channel.id, this.getMyChannelsList.length)
        } else {
          setMyChannelsToLocal([...this.getMyChannelsList, channel])
        }

        // 添加频道页面渲染
        this.getMyChannelsList.push(channel)
        this.$toast.success('添加频道成功')
      } catch (e) {
        this.$toast.fail('添加频道失败')
      }
    }

    // 跳转到search页面
  },

  created() {
    this.getChannelsApi()
    // this.getMyChannelsApi()
    this.initChannels()
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
  z-index: 100;
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
