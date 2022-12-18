<template>
  <div>
    <div class="commentInfo" v-for="(item, index) in commentList" :key="index">
      <div class="userInfo">
        <div class="user">
          <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
          <div class="username">{{ item.aut_name }}</div>
        </div>
        <div class="good">
          <van-icon
            name="good-job-o"
            class="iconGood"
            :class="{ active: isliking(item) }"
            @click="goodCommentApi(item)"
          />
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
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <replyComment :articalInfo="articalInfo"> </replyComment>
    </van-popup>
  </div>
</template>

<script>
import { goodComment, delGoodComment } from '@/api'
import replyComment from './replyComponents.vue'
import { timeAgo } from '@/utils/day'
export default {
  components: { replyComment },
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      show: false,
      replyCommentList: {},
      articalInfo: {}
    }
  },

  computed: {
    timer() {
      return (item) => {
        return timeAgo(item.pubdate)
      }
    },
    isliking() {
      return (item) => item.is_liking
    }
  },

  methods: {
    async reply(item) {
      this.articalInfo = item
      this.show = true
    },
    async goodCommentApi(item) {
      console.log(item.is_liking)
      if (!item.is_liking) {
        try {
          await goodComment(item.com_id)
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          console.log(1)
          await delGoodComment(item.com_id)
        } catch (e) {
          console.log(e)
        }
      }
      this.$parent.$parent.getCommentApi()
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
.active {
  color: red;
}
</style>
