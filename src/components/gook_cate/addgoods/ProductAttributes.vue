<template>
  <div>
    <el-form ref="form"  label-width="150px">
      <el-form-item  v-for="item in formData" :key="item.attr_id"
      :label="item.attr_name"  >
        <el-input :value ="item.attr_vals"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EventBus from '@/components/gook_cate/addgoods/eventBus.JS'
export default {

  created () {
    EventBus.$on('WaremessAge', (val) => {
      this.getParameters(val)
    })
  },
  data () {
    return {
      formData: []
    }
  },
  methods: {
    async getParameters (val) {
      const { data: res } = await this.$http.get(`categories/${val.PrroductClassifyArr[2]}/attributes`, {
        params: { sel: 'only' }
      })
      this.formData = res.data
      EventBus.$emit('ProductAttributes', res.data)
    }
  }
}
</script>

<style></style>
