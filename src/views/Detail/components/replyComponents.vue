<template>
  <div>
    <!-- 评论部分 -->
    <div class="commentInfo">
      <div class="userInfo">
        <div class="user">
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="articalInfo.aut_photo"
          />
          <div class="username">{{ articalInfo.aut_name }}</div>
        </div>
        <div class="good">
          <van-icon name="good-job-o" class="iconGood" />
        </div>
      </div>
      <div class="comment">{{ articalInfo.content }}</div>
      <div class="time">
        <span class="times">{{ timer(articalInfo) }}</span>
        <span class="commentNum" @click="reply(articalInfo)"
          >回复{{ articalInfo.reply_count }}</span
        >
      </div>
    </div>
    <van-divider>全部回复 </van-divider>
    <!-- 回复评论部分 -->
    <div
      class="commentInfo"
      v-for="(item, index) in replyCommentList.results"
      :key="index"
    >
      <div class="userInfo">
        <div class="user">
          <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
          <div class="username">{{ item.aut_name }}</div>
        </div>
        <div class="good">
          <van-icon name="good-job-o" class="iconGood" />
        </div>
      </div>

      <div class="comment">{{ item.content }}</div>
      <div class="time">
        <span class="times">{{ timer(item) }}</span>
        <span class="commentNum" @click="reply(item)"
          >回复{{ item.reply_count }}</span
        >
      </div>
    </div>

    <!-- 弹层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
      <commentPop :commentInfo="commentInfo"></commentPop>
    </van-popup>

    <!-- 评论 -->
    <footer class="footer">
      <van-button round type="info" class="btn" @click="reply(articalInfo)"
        >评论</van-button
      >
    </footer>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/day'

import commentPop from './commentPop.vue'

import { getComment } from '@/api'

export default {
  components: { commentPop },
  data() {
    return {
      show: false,
      detailList: this.$store.state.detailInfo || {},
      commentInfo: {},
      replyCommentList: {}
    }
  },
  props: {
    articalInfo: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    this.reply1()
  },
  // "2b4b235f-4666-4120-98c2-e97a96dd0dbd"
  methods: {
    reply(value) {
      console.log(value)
      this.commentInfo = value
      this.show = true
    },
    async reply1() {
      try {
        const type = 'c'
        const {
          data: { data }
        } = await getComment(type, this.articalInfo.com_id)
        this.replyCommentList = data
      } catch (e) {}
    }
  },
  computed: {
    timer() {
      return (item) => {
        return timeAgo(item.pubdate)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.commentInfo {
  display: flex;
  flex-direction: column;
  padding: 30px;
  .userInfo {
    font-size: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .user {
      display: flex;
      .username {
        line-height: 75px;
        margin-left: 30px;
        color: #406599;
      }
    }
    .good {
      font-size: 30px;
      .iconGood::after {
        content: '赞';
      }
    }
  }
  .comment {
    margin: 10px 0;
    margin-left: 104px;
    font-size: 36px;
  }
  .time {
    display: flex;
    align-items: center;
    margin-left: 80px;
    .times {
      display: block;
      font-size: 16px;
      margin: 18px;
    }
    .commentNum {
      font-size: 24px;
      display: block;
      width: 130px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      border: 1px solid #ccc;
      border-radius: 48px;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background: skyblue;
  width: 100%;
  .btn {
    width: 80%;
    background: #fff;
    color: blue;
    margin: 0 auto;
  }
}
</style>
