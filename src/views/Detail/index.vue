<template>
  <div>
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
      class="header"
    />

    <article class="markdown-body detail">
      <!-- 标题 -->
      <h1 class="title">{{ newsDetail.title }}</h1>

      <!-- 用户 -->
      <div class="user">
        <div class="userInfo">
          <van-image
            round
            width="0.9rem"
            height="0.9rem"
            :src="newsDetail.aut_photo"
          />
          <div class="uesename">
            <span class="name">{{ newsDetail.aut_name }}</span>
            <span class="time">{{ beforeYear }}年前</span>
          </div>
        </div>
        <div class="delfollow" v-if="!flag">
          <van-button
            icon="plus"
            type="primary"
            round
            color="#87CEFA"
            :loading="loading"
            @click="followUserApi"
            >关注</van-button
          >
        </div>
        <div class="delfollow" v-else>
          <van-button
            type="primary"
            round
            color="#fff"
            @click="followUserApi"
            class="fontColor"
            >取消关注</van-button
          >
        </div>
      </div>

      <!-- content -->
      <div v-html="newsDetail.content" class="content"></div>
    </article>

    <!-- 提示信息 -->
    <van-divider>正文结束</van-divider>

    <!-- 评论内容 -->
    <van-list
      v-model="uploading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      :offset="0"
    >
      <comment :commentList="commentList"></comment>
    </van-list>

    <!-- 底部标签 -->
    <van-tabbar class="footer" placeholder>
      <van-button type="default" class="comment" @click="comment"
        >写评论</van-button
      >
      <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入评论"
          show-word-limit
        >
          <template #button>
            <van-button
              type="default"
              class="upload"
              :disabled="!message.length"
              @click="uploadComment"
              >发布</van-button
            >
          </template>
        </van-field>
      </van-popup>
      <van-tabbar-item icon="comment-o" :badge="total"></van-tabbar-item>
      <van-tabbar-item
        icon="star-o"
        @click="collectNewsApi"
        :class="{ active: flag2 }"
      ></van-tabbar-item>
      <van-tabbar-item
        icon="good-job-o"
        @click="likeIn"
        :class="{ active: this.flag1 }"
      ></van-tabbar-item>
      <van-tabbar-item
        icon="share-o"
        @click="showShare = true"
      ></van-tabbar-item>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </van-tabbar>
  </div>
</template>

<script>
import comment from './components/comment.vue'
import {
  getNewsDetail,
  followUser,
  delfollowUser,
  likings,
  nolikings,
  collectNews,
  delcollectNews,
  uploadComment,
  getComment
} from '@/api'

export default {
  components: { comment },
  data() {
    return {
      detailList: this.$store.state.detailInfo || {},
      newsDetail: {},
      loading: false,
      // 用来判断是否关注
      flag: true,
      // 用来判断是否点赞
      flag1: false,
      // 用来判断该文章是否收藏
      flag2: false,
      page: 1,
      perpage: 20,
      show: false,
      message: '',
      // 获取用户收藏列表
      collectList: [],

      // 分享面板
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],

      // 获取评论信息
      commentList: [],
      total: null,

      // 加载评论内容
      uploading: false,
      finished: false,
      offset: ''
    }
  },

  created() {
    this.getCommentApi()
    this.getNewsDetailApi()
  },

  methods: {
    // 获取新闻详情信息
    async getNewsDetailApi() {
      try {
        const id = this.detailList.art_id
        const {
          data: { data }
        } = await getNewsDetail(id)
        this.newsDetail = data
        console.log(this.newsDetail)
        this.flag = this.newsDetail.is_followed
        this.flag1 = this.newsDetail.attitude === 1
        this.flag2 = this.newsDetail.is_collected
      } catch (e) {
        console.log(e)
      }
    },

    // 关注用户接口请求
    async followUserApi() {
      const id = this.newsDetail.aut_id
      if (!this.flag) {
        this.loading = true
        try {
          const res = await followUser(id)
          console.log(res)
          this.loading = false
          this.flag = true
          this.$toast.success('关注成功')
        } catch (e) {
          this.$toast.fail('关注失败，请重试')
        }
      } else {
        this.loading = true
        try {
          await delfollowUser(id)
          this.loading = false
          this.flag = false
          this.$toast.success('取消关注成功')
        } catch (e) {
          this.$toast.fail('取消关注失败，请重试')
        }
      }
    },

    onClickLeft() {
      this.$router.push('/ ')
    },

    // 评论弹窗
    comment() {
      this.show = true
    },

    // 收藏和取消收藏
    async collectNewsApi() {
      const id = this.detailList.art_id
      console.log(this.flag2)
      console.log(id)
      if (!this.flag2) {
        try {
          await collectNews(id)
          this.flag2 = true
          this.$toast.success('收藏成功')
        } catch (e) {
          console.log(e)
          this.$toast.fail('收藏失败')
        }
      } else {
        try {
          await delcollectNews(id)
          this.flag2 = false
        } catch (e) {
          console.log(e)
        }
      }
    },

    // 点赞和取消点赞
    async likeIn() {
      const id = this.newsDetail.art_id
      if (!this.flag1) {
        try {
          await likings(id)
          this.flag1 = true
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await nolikings(id)

          this.flag1 = false
        } catch (e) {
          console.log(e)
        }
      }
    },

    // 评论功能
    // 获取文章评论
    async getCommentApi() {
      const id = this.detailList.art_id
      const type = 'a'
      try {
        const {
          data: { data }
        } = await getComment(type, id)
        console.log(data)
        this.offset = data.last_id
        this.commentList = data.results
        this.total = data.total_count
      } catch (e) {
        console.log(e)
      }
    },
    async onLoad() {
      try {
        const id = this.detailList.art_id
        const type = 'a'
        console.log(this.offset)
        const {
          data: { data }
        } = await getComment(type, id, this.offset)
        console.log(data)
        if (data.last_id) {
          this.commentList.push(...data.results)
          this.offset = data.last_id
          this.finished = false
        } else {
          this.finished = true
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.uploading = false
      }
    },

    // 评论文章
    async uploadComment() {
      const id = this.detailList.art_id
      try {
        const res = await uploadComment(id, this.message, id)
        this.show = false
        this.getCommentApi()
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  },

  computed: {
    beforeYear() {
      const data =
        new Date().getFullYear() -
        new Date(this.newsDetail.pubdate).getFullYear()
      return data
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.header) {
  background: blue;
  .van-nav-bar__title {
    color: #fff;
    font-size: 30px;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
:deep(.detail) {
  .title {
    font-size: 50px;
    padding: 50px 32px;
  }
  .user {
    display: flex;
    justify-content: space-between;
    .userInfo {
      display: flex;
      align-items: center;

      .uesename {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .time {
          color: #ccc;
        }
      }
    }

    .delfollow {
      border: 1px solid #ccc;
      border-radius: 44px;
      .fontColor {
        color: blue !important;
      }
    }
  }
}
:deep(.footer) {
  display: flex;
  align-items: center;
  .comment {
    flex: 2;
    border: 1px solid rgb(218, 218, 218);
    height: 60px;
    border-radius: 60px;
    margin: 20px;
    color: #999;
    padding-top: 10px;
  }
  .van-popup--bottom {
    .van-field {
      margin: 30px;
      width: 75%;
      padding: 20px;
      background: #f5f6f7;
    }
    .upload {
      margin-right: -50px;
      position: fixed;
      bottom: 100px;
      right: 70px;
      color: skyblue;
    }
  }
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
.active {
  background-color: red;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
