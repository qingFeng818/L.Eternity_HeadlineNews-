<template>
  <van-cell
    :title="item.title"
    size="large"
    :label="label"
    v-if="item.cover.type === 0"
  />
  <van-cell
    :title="item.title"
    :label="label"
    v-else-if="item.cover.type === 1"
  >
    <van-image
      width="100"
      size="large"
      height="100"
      :src="item.cover.images[0]"
    />
  </van-cell>
  <van-cell :title="item.title" :label="label" v-else>
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
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    label() {
      return `${this.item.aut_name} ${this.item.comm_count} 评论 ${this.item.pubdate}`
    }
  }
}
</script>

<style lang="less" scoped></style>
