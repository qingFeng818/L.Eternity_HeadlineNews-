<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道" value="内容">
      <van-button
        round
        size="small"
        @click="isEdit = !isEdit"
        v-if="isEdit"
        :class="['edit-btn']"
        >编辑</van-button
      >
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        v-else
        >完成</van-button
      >
    </van-cell>

    <!-- 具体我的频道 -->
    <van-grid :column-num="4" gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannel"
        :key="item.id"
        :text="item.name"
        :class="['myChanner', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="!isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>

    <!-- 推荐频道 -->
    <van-grid :column-num="4" gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        icon="plus"
        :key="item.id"
        :text="item.name"
      >
        <template #icon>
          <van-icon name="plus" @click="addChannels(item)" /> </template
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getChannels as getChannelsApi } from '@/api'
export default {
  props: {
    myChannel: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data() {
    return {
      isEdit: true,
      allChannels: []
    }
  },
  methods: {
    async getChannels() {
      try {
        const { data } = await getChannelsApi()
        this.allChannels = data.data.channels
        console.log(this.allChannels)
        console.log(this.allChannels)
      } catch (e) {
        this.$toast.fail(e.message)
      }
    },

    // 删除按钮和导航
    async changeActive(index, item) {
      // this.$parent：当前组件实例
      if (!this.isEdit) {
        if (item.name === '推荐') {
          return
        }
        this.$emit('delChannl', item)
        // try {
        //   const res = await delChannels(item.id)
        //   console.log(res)
        // } catch (e) {
        //   console.log(e)
        // }
      } else {
        // 关闭弹窗
        this.$parent.$parent.show = false
        this.$emit('change-active', index)

        // 推荐频道
      }
    },

    // 添加我的频道列表
    addChannels(val) {
      this.$emit('addChannels', val)
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(
        (item) => !this.myChannel.find((ele) => item.id === ele.id)
      )
    }
  },
  created() {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.channel {
  padding-top: 1.333rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
}
:deep(.myChanner) {
  .van-grid-item__icon-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    transform: translate(40%, -40%);
    border: 1px solid #999;
    border-radius: 50%;
    color: #999;
    //   color: rgb(158, 148, 148);
  }
}
:deep(.active) {
  .van-grid-item__text {
    color: red !important;
  }
}

:deep(.van-grid-item__content) {
  background: #eee;
}
:deep(.van-grid-item__content--center) {
  flex-direction: row;
  align-items: center;
  .van-icon-plus {
    font-size: 50px;
    margin-right: 30px;
  }
}
</style>
