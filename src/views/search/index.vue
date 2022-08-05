<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onSearchFocus"
        class="search"
        background="#3296fa"
      />
    </form>

    <!-- 搜索历史/建议/结果 -->
    <!-- is指定动态组件的名字。字符串，并且名字存在计算属性中 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import searchHistory from './components/SearchHistory.vue'
import searchResult from './components/searchResult.vue'
import searchSuggest from './components/searchSuggestion.vue'
// import { getSearchSuggetionsApi } from '@/api'

export default {
  components: { searchHistory, searchResult, searchSuggest },
  name: 'search',
  data() {
    return {
      search: '',
      keywords: '',
      //   用一个变量定义用户是否敲回车
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      console.log('正在搜索')
      this.isShowSearchResult = true
    },

    onSearchFocus() {
      this.isShowSearchResult = false
    },
    onCancel() {}
  },

  computed: {
    componentName() {
      // 如果输入的是空字符串，那么渲染是我们的历史
      if (this.keywords.trim() === '') {
        return 'searchHistory'
      }
      if (this.isShowSearchResult) {
        return 'searchResult'
      }
      return 'searchSuggest'
    }
  }
}
</script>

<style lang="less" scoped>
// 搜索框样式
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
