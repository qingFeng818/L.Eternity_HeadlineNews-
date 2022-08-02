<template>
  <van-pull-refresh
    v-model="refreshing"
    @refresh="loadNextPageArticle"
    success-text="刷新成功"
  >
    <van-list
      :finished="isFinished"
      v-model="loding"
      @load="loadNextPageArticle"
      offset="50"
      :immediate-check="false"
      finished-text="没有更多文章"
      error-text="加载失败，请重新加载"
      :error.sync="error"
    >
      <ArticleList
        v-for="item in articles"
        :key="item.art_id"
        :item="item"
      ></ArticleList>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import { getArticleApi } from '@/api'

export default {
  components: { ArticleList },
  name: 'article-list',

  props: {
    id: {
      type: [String, Number],
      require: []
    }
  },
  data() {
    return {
      // 用来获取文章数据
      articles: [],

      // 用来获取时间戳数据
      pre_timestamp: '',

      // loading是控制加载状态
      loding: false,

      // 用来判断加载是否完成的状态
      isFinished: false,

      // 用来判断加载失败的一种状态
      error: false,

      // 用来控制下拉刷新的一种状态
      refreshing: false
    }
  },
  computed: {},
  methods: {
    // 获取新闻推荐
    async getFistArticleApi() {
      try {
        // 获取第一次数据，用当前的时间戳进行请求
        const { data } = await getArticleApi(this.id, +new Date())

        // 将获取的数据存储
        this.articles = data.data.results

        // 获取当前数据的时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (e) {
        this.$toast.fail('请刷新重新获取文章')
      }
    },

    // 当页面下拉时触发该函数
    async loadNextPageArticle() {
      try {
        // 发送请求
        const { data } = await getArticleApi(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        // 当向下加载没有数据时,进行判断,如果没有数据,让isfinished为true
        if (!timestamp) {
          this.isFinished = true
        }

        // 判断是进入下拉刷新页面还是进入加载页面
        if (this.refreshing) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }
        // 存储数据,将获取的新的数据push到原来的数据中,扩展运算符的运算

        // 更新事件戳
        this.pre_timestamp = timestamp
      } catch (e) {
        // 捕获错误时,error状态更新为 true
        this.error = true
      } finally {
        // 不管成功还是失败，finally都会执行
        // 更新loading为null
        this.loding = false
        this.refreshing = false
      }
    }
  },
  watch: {},
  created() {
    this.getFistArticleApi()
  },
  mounted() {}
}
</script>

<style lang="less" scoped></style>
