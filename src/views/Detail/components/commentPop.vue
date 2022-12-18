<template>
  <div>
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
          @click="uploadCommentApi"
          >发布</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { uploadComment } from '@/api'
export default {
  props: {
    commentInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      message: '',
      detailList: this.$store.state.detailInfo || {}
    }
  },
  methods: {
    async uploadCommentApi() {
      const target = this.commentInfo.com_id
      const id = this.detailList.art_id
      try {
        const res = await uploadComment(target, this.message, id)
        console.log(res)
        this.message = ''
        this.$parent.$parent.show = false
        this.$parent.$parent.reply1()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
