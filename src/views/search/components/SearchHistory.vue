<template>
  <div>
    <van-cell title="浏览历史">
      <template #right-icon>
        <van-icon name="delete-o" @click="isShow = true" v-if="!isShow" />
        <div v-if="isShow" class="text">
          <span class="del" @click="delAll">全部删除</span>
          <span class="achieve" @click="isShow = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :error.sync="error"
      error-text="加载失败，请重试"
      finished-text="没有更多了"
      @load="onLoad"
      offset="0"
    >
      <van-cell
        v-for="(item, index) in historyList"
        :key="index"
        icon="search"
        @click="readNews(item)"
      >
        <template #title>
          <span v-html="item"></span>
        </template>
        <template #right-icon>
          <van-icon name="close" v-if="isShow" @click="del(index)" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getHistory, removeHistory } from '@/utils/authors'

export default {
  data() {
    return {
      finished: false,
      loading: false,
      error: false,
      isShow: false,
      historyList: getHistory() || []
    }
  },

  methods: {
    onLoad() {
      this.loading = false
    },
    readNews(value) {
      if (!this.isShow) {
        this.$parent.keywords = value
        this.$parent.onSearch()
      }
    },
    delAll() {
      this.$dialog
        .confirm({
          title: '删除',
          message: '是否清除所有浏览历史'
        })
        .then(() => {
          // on confirm
          removeHistory()
          this.historyList = []
        })
        .catch(() => {
          // on cancel
        })
    },
    del(val) {
      console.log(val)
      this.historyList.splice(val, 1)
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.text {
  color: #999;
  .del {
    margin-right: 20px;
  }
}
</style>
