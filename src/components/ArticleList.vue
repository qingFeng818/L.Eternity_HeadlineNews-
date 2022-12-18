<template>
  <van-cell
    :title="item.title"
    size="large"
    :label="label"
    v-if="item.cover.type === 0"
    @click="goDetail(item)"
  />
  <van-cell
    :title="item.title"
    :label="label"
    v-else-if="item.cover.type === 1"
    @click="goDetail(item)"
  >
    <van-image
      width="100"
      size="large"
      height="100"
      :src="item.cover.images[0]"
    />
  </van-cell>

  <van-cell :title="item.title" :label="label" v-else @click="goDetail(item)">
    <van-image
      v-for="(ele, e) in item.cover.images"
      :key="e"
      width="100"
      height="100"
      :src="ele"
    />
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/day'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    label() {
      return `${this.item.aut_name} ${this.item.comm_count} 评论 ${timeAgo(
        this.item.pubdate
      )}`
    }
  },
  methods: {
    goDetail(item) {
      console.log(item)
      this.$router.push('/detail')
      this.$store.commit('SET_DETAIL', item)
    }
  }
}
</script>

<style lang="less" scoped></style>
