<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
      class="bgc"
    />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="getUserInfos.photo"
      />
      <input
        type="file"
        hidden
        accept=".png.jfif"
        ref="file"
        name=""
        id=""
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像的弹层 -->
    <van-popup
      v-model="isShowAvator"
      :style="{ height: '100%', width: '100%' }"
    >
      <!-- 展示弹层组件 -->
      <updateAvator
        @uploadImg="getUserInfos.photo = $event"
        :photo="photo"
        v-if="isShowAvator"
      ></updateAvator>
    </van-popup>

    <van-cell-group>
      <van-cell title="昵称" value="内容" class="imgPhoto"></van-cell
    ></van-cell-group>
  </div>
</template>

<script>
import updateAvator from './commponents/index.vue'
import { getUserInfo } from '@/api'
import { resulveToBase64 } from '@/utils'
export default {
  components: { updateAvator },
  data() {
    return {
      isShowAvator: false,
      getUserInfos: {},
      photo: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async getUserInfoApi() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.getUserInfos = data.data
      } catch (e) {
        this.$toast.fail('获取用户信息失败，请刷新')
      }
    },

    // 用户选择了图片
    async selectPhoto(e) {
      // 获取用户选择的图片的文件对象
      // e.target 触发事件的元素
      // HTMLInputElement.files伪数组，存储的用户选择所有的文件对象
      console.log(e)
      const file = e.target.files[0]

      // 2.把获取到的file文件对象处理成img标签可识别的url
      const url = await resulveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isShowAvator = true
      // const fr = new FileReader()
      // fr.readAsDataURL(file)

      // fr.onload = (e) => {
      //   this.photo = e.target.result

      //   // 4.清空value，让用户可以选择同一张图片
      //   e.target.value = ''

      //   // 展示弹层组件
      //   this.isShowAvator = true
      // }
    }
  },
  created() {
    this.getUserInfoApi()
  }
}
</script>

<style lang="less" scoped>
:deep(.bgc) {
  background-color: #5194f3;
  .van-ellipsis {
    color: #fff;
  }

  .van-icon-arrow-left {
    color: #fff;
  }
}
</style>
