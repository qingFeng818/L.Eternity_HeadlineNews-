<template>
  <div class="update-avator">
    <div class="imgbox">
      <img :src="photo" alt="" class="img" ref="image" />
    </div>
    <footer class="btn">
      <button @click="oncancle">取消</button>
      <button @click="onconfirm">确定</button>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      require: true
    }
  },
  methods: {
    oncancle() {
      this.$parent.$parent.isShowAvator = false
    },

    // 上传头像
    onconfirm() {
      // 上传裁剪后的图像的file值
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片上传中，请稍等...',
          forbidClick: true
        })
        try {
          const { data } = await uploadAvator(blob)
          this.$emit('uploadImg', data.data.photo)
          this.$parent.$parent.isShowAvator = false
          this.$toast.success('图像上传成功')
        } catch (e) {
          this.$toast.fail('上传失败，请重新上传')
          console.log(e)
        }
      })
    },
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    sureSava() {
      this.afterImg = this.myCropper
        .getCroppedCanvas({
          imageSmoothingQuality: 'high'
        })
        .toDataURL('image/jpeg')
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.update-avator {
  height: 100%;

  background: black;

  .imgbox {
    position: relative;
    height: 100%;
    width: 100%;
    .img {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 65%;
      transform: translateY(-50%);
    }
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
