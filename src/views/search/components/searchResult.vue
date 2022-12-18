<template>
  <div>
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
        v-for="(item, index) in searchResultList"
        :key="index"
        icon="search"
      >
        <template #title>
          <span v-html="item.title"></span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: 1,
      perpage: 20,
      searchResultList: [],
      finished: false,
      loading: false,
      error: false
    }
  },

  methods: {
    async getSearchResult() {
      console.log(this.keywords)
      try {
        const {
          data: { data }
        } = await getSearchResultApi(this.page, this.perpage, this.keywords)
        this.searchResultList = data.results
      } catch (e) {}
    },

    async onLoad() {
      if (!this.finished) {
        this.page++
        try {
          const {
            data: { data }
          } = await getSearchResultApi(this.page, this.perpage, this.keywords)
          const arr = data.results
          if (arr.length !== 0) {
            this.searchResultList.push(...data.results)
          } else {
            this.finished = true
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
      }
    }

    // 点击对应的搜索结果，跳往响应页面，并将点击的搜索结果存储在本地
  },

  created() {
    this.getSearchResult()
  }
}
</script>

<style lang="scss" scoped></style>
