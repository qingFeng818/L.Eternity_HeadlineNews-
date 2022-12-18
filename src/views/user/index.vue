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

    <!-- 昵称信息 -->
    <van-cell-group>
      <van-cell
        title="昵称"
        is-link
        :value="getUserInfos.name"
        @click="isShow = true"
      />
    </van-cell-group>
    <van-popup v-model="isShow" position="bottom" :style="{ height: '100%' }">
      <van-picker
        title="更新昵称"
        show-toolbar
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <template #columns-top>
          <van-field
            v-model="message"
            rows="1"
            autosize
            type="textarea"
            maxlength="11"
            placeholder="请输入昵称"
            show-word-limit
          />
        </template>
      </van-picker>
    </van-popup>

    <!-- 性别信息 -->
    <van-cell-group>
      <van-cell
        title="性别"
        is-link
        :value="genderList[getUserInfos.gender]"
        @click="isShow1 = true"
      />
    </van-cell-group>
    <van-popup v-model="isShow1" position="bottom" :style="{ height: '50%' }">
      <van-picker
        title="选择性别"
        :default-index="getUserInfos.gender"
        :columns="genderList"
        show-toolbar
        @confirm="onConfirm1"
        @cancel="onCancel1"
      >
      </van-picker>
    </van-popup>

    <!-- 生日信息 -->
    <van-cell-group>
      <van-cell
        title="生日"
        is-link
        :value="getUserInfos.birthday"
        @click="isShow2 = true"
      />
    </van-cell-group>
    <van-popup v-model="isShow2" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm3"
        @cancel="onCancel3"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment'
import updateAvator from './commponents/index.vue'
import { getUserInfo, uploadUser } from '@/api'
import { resulveToBase64 } from '@/utils'
export default {
  components: { updateAvator },

  data() {
    return {
      genderList: ['男', '女'],
      getUserInfos: {},
      photo: '',
      message: '',
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShowAvator: false,
      minDate: new Date(1990, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.time),
      birthday: [],
      time: ''
    }
  },

  methods: {
    // 点击返回按钮
    onClickLeft() {
      this.$router.go(-1)
    },

    // 更新用户信息函数
    async uploadUserApi(val) {
      try {
        const res = await uploadUser(val)
        console.log(res)
        this.$toast.success('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败，请重试')
      }
    },

    // 获取用户信息
    async getUserInfoApi() {
      try {
        const { data } = await getUserInfo()
        this.getUserInfos = data.data
        this.birthday = data.data.birthday.split('-').map(Number)
        console.log(this.birthday)
        // moment(val).format('YYYY-MM-DD')
        this.message = this.getUserInfos.name
        this.time = this.currentDate.setFullYear(
          this.birthday[0],
          this.birthday[1] - 1,
          this.birthday[2]
        )
        console.log(this.time)
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
    },

    // 修改用户昵称
    onConfirm() {
      const name = this.message
      console.log(name)
      try {
        this.uploadUserApi({ name })
        this.$toast.success('更新成功')
        this.getUserInfoApi()
        this.isShow = false
      } catch (e) {
        this.$toast.fail('更新失败，请重试')
      }
    },

    onCancel() {
      this.isShow = false
    },

    // 修改用户性别
    onConfirm1(val, index) {
      const gender = index
      try {
        this.uploadUserApi({ gender })
        this.getUserInfoApi()
        this.$toast.success('更新成功')
        this.isShow1 = false
      } catch (e) {
        this.$toast.fail('更新失败，请重试')
      }
    },
    onCancel1() {
      this.isShow1 = false
    },

    // 选择年月日
    onConfirm3(val) {
      try {
        val = moment(val).format('YYYY-MM-DD')
        this.dataTime = val.split('-').map(Number)
        this.uploadUserApi({ birthday: val })
        this.getUserInfoApi()
        this.$toast.success('更新成功')
        this.isShow2 = false
      } catch (e) {
        this.$toast.fail('更新失败，请重试')
      }
    },
    onCancel3() {
      this.isShow2 = false
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
