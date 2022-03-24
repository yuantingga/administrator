<template>
  <div>
    <el-upload class="upload-demo" :on-success="uploadSuccess" :headers="uploadheader"
    action="http://127.0.0.1:8888/api/private/v1/upload/"
    :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog :visible.sync="imageUpload">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</template>

<script>
import EventBus from '@/components/gook_cate/addgoods/eventBus.JS'
export default {
  data () {
    return {
      imageUpload: false,
      dialogImageUrl: '',
      pics: [],
      schedule: 0,
      uploadheader: {
        Authorization: sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      this.pics.push(response.data)

      EventBus.$emit('CommodityImages', this.pics)
    },

    handleRemove (file, fileList) {
      this.pics = []
      Array.prototype.filter.call(fileList, (ele) => {
        console.log(ele.response.data)
        this.pics.push(ele.response.data)
      })

      EventBus.$emit('CommodityImages', this.pics)
    },
    handlePreview (file) {
      this.imageUpload = true
      this.dialogImageUrl = file.response.data.url
    }
  }
}
</script>

<style></style>
