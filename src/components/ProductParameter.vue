<template>
  <div>
    <el-row>
    <el-col v-for="(item,Index) in checkData" :key="item.attr_id">

    {{item.attr_name}}
    <el-col >
    <el-checkbox style="margin:15px" checked @change="removeArr(item,index,Index)"
     v-for="(item2,index) in item.attr_vals" :key="item2"
     :label="item2" border></el-checkbox>

    </el-col>

    </el-col>

    </el-row>

  </div>
</template>

<script>
import EventBus from '@/components/eventBus.JS'

export default {
  props: ['data'],
  created () {
    EventBus.$on('WaremessAge', (val) => {
      this.getParameters(val)
    })
  },
  data () {
    return {
      checkData: '',
      WaremessAgeData: {}
    }
  },
  methods: {

    removeArr (item, index, Index) {
      this.checkData[Index].attr_vals.splice(index, 1)
      EventBus.$emit('ProductParameter', this.checkData)
    },

    async getParameters (val) {
      const { data: res } = await this.$http.get(`categories/${val.PrroductClassifyArr[2]}/attributes`, {
        params: { sel: 'many' }
      })

      console.log(this.checkData)
      this.checkData = res.data
      this.checkData = Array.prototype.filter.call(this.checkData, (ele) => {
        if (ele.attr_vals.length === 0) {
          ele.attr_vals = []
          return
        }
        ele.attr_vals = ele.attr_vals.split(',')
        return ele.attr_vals
      })
      EventBus.$emit('ProductParameter', this.checkData)
    }
  }
}
</script>

<style>

</style>
