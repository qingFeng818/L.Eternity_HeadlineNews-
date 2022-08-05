<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// lodash的第一次使用，利用lodash做一些简单的方法
// "Auglar".replace(/a/ig,fuction(match) {
//   return <span>${match}</span>
// })

import { debounce } from 'lodash'
import { getSearchSuggetionsApi } from '@/api'

// 动态正则，
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchSuggestList: [],
      id: null
    }
  },
  methods: {
    // 单一职责原则
    // 设计模式的原则：
    // 单一原则，里氏替换原则，依赖倒置原则，接口隔离原则，
    getSearchSuggetions: debounce(async function () {
      try {
        const res = await getSearchSuggetionsApi(this.keywords)
        this.searchSuggestList = res.data.data.options.filter(Boolean)
      } catch (e) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  },
  created() {
    this.getSearchSuggetions()
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggetions()
      }
    }
  },

  // 不在循环之前的suggest，而是循环高亮后的suggest
  computed: {
    // map:映射 返回一个新数组，并且新数组的长度和原数组一样,通过自定义的函数对原数组中的数据进行处理
    // highLightSuggestions() {
    //   const reg = new RegExp(this.keywords, 'ig')
    //   return this.searchSuggestList.map((str) =>
    //     str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
    //   )
    // }
    highLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')

      return this.searchSuggestList.map((str) =>
        str.replace(reg, (match) => `<span>${match}</span>`)
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
