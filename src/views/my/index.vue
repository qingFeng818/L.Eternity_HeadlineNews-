<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">
        <div class="userInfo">
          <!-- 头像 -->
          <div class="Info">
            <van-image
              round
              width="1.76rem"
              height="1.76rem"
              :src="userInfo.photo"
              class="img"
            />
            <p class="iphone">{{ userInfo.mobile }}</p>
          </div>
          <button @click="editUser" class="btn">编辑资料</button>
        </div>
        <div class="myNewsList">
          <div class="newBox" v-for="(item, index) in newsList" :key="index">
            <p class="num">{{ item.num }}</p>
            <p class="newsName">{{ item.title }}</p>
          </div>
        </div>
      </div>
      <div class="login nologin" v-else>
        <div class="userInfos">
          <!-- 头像 -->
          <div class="Info">
            <van-image
              round
              width="1.76rem"
              height="1.76rem"
              src="../../assets/images/下载.png"
            />

            <div class="text" @click="login">登录 / 注册</div>
          </div>
        </div>
      </div>
    </header>

    <!-- main区域 -->

    <main>
      <van-grid class="collect">
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="underway-o" text="历史" />
      </van-grid>
      <div class="line"></div>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </main>
    <div class="line"></div>

    <!-- footer -->
    <footer>
      <div v-if="isLogin" @click="logout" class="logout">退出</div>
    </footer>
    <div class="line"></div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  data() {
    return {
      userInfo: {},
      newsList: [
        {
          num: 0,
          title: '头条'
        },
        {
          num: 0,
          title: '粉丝'
        },
        {
          num: 0,
          title: '关注'
        },
        {
          num: 0,
          title: '获赞'
        }
      ]
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      // 清除token

      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号？'
        })
        .then(() => {
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    editUser() {
      this.$router.push('/user')
    },
    async getUserInfoApi() {
      if (this.isLogin) {
        try {
          const res = await getUserInfo()
          this.userInfo = res.data.data
          console.log(this.userInfo)
        } catch (e) {
          console.log(e)
        }
      }
    },
    login() {
      this.$router.push('/login')
    }
  },
  created() {
    this.getUserInfoApi()
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url('@/assets/images/banner.png');
  height: 5.34667rem;
  overflow: hidden;
  .userInfo {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.54667rem;
    .img {
      border: 1px solid #fff;
    }
    .Info {
      display: flex;
      align-items: center;
      .iphone {
        margin-left: 30px;
        font-size: 30px;
        color: #fff;
      }
    }
    .btn {
      width: 160px;
      height: 36px;
      border-radius: 18px;
      background: #fff;
      border: none;
      line-height: 36px;
      font-size: 12px;
      text-align: center;
    }
  }
  .myNewsList {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .newBox {
    display: flex;
    flex-direction: column;
    font-size: 24px;
    color: #fff;
    justify-content: space-around;
    align-items: center;
    width: 25%;
    margin-top: 20px;

    .num {
      height: 8px;
      line-height: 8px;
    }
    .newsName {
      height: 8px;
      line-height: 8px;
    }
  }
}
.nologin {
  .userInfos {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px;
    .img {
      display: block;
    }
    .text {
      margin-top: 18px;
      font-size: 28px;
      color: #fff;
    }
  }
}
:deep(.collect) {
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  margin-bottom: 20px;
  .van-icon {
    color: red;
  }
}
.line {
  height: 10px;
  background: #f5f6f7;
}
.logout {
  text-align: center;
  font-size: 25px;
  height: 80px;
  line-height: 80px;
  color: red;
}
.bgcBox {
  background: #f5f6f7;
  width: 100%;
  height: 100%;
}
</style>
