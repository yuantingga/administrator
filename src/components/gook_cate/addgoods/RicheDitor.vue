<template>
  <div class="aaa">

  <el-row class="text"><quill-editor @blur="Rich" v-model="editor"></quill-editor></el-row>
    <el-row>
    <el-button style="margin:15px" @click="AddCommodity" type="primary">添加商品</el-button>

    </el-row>
  </div>
</template>

<script>
import EventBus from '@/components/eventBus.JS'

export default {
  created () {
    EventBus.$on('WaremessAge', (val) => {
      this.richditor.goods_name = val.goods_name
      this.richditor.goods_cat = val.PrroductClassifyArr.join(',')
      this.richditor.goods_price = val.goods_price
      this.richditor.goods_number = val.goods_number
      this.richditor.goods_weight = val.goods_weight
      this.richditor.goods_introduce = val.goods_introduce
    })
    EventBus.$on('ProductParameter', (val) => {
      this.arr = []
      // eslint-disable-next-line array-callback-return
      val.filter((ele) => {
        const obj = {
          attr_id: ele.attr_id,
          attr_value: ele.attr_vals.join(',')
        }

        this.arr.push(obj)
      })
    })
    EventBus.$on('ProductAttributes', (val) => {
      // eslint-disable-next-line array-callback-return
      val.filter((ele) => {
        const obj = {
          attr_id: ele.attr_id,
          attr_value: ele.attr_vals
        }

        this.arr.push(obj)
      })
    })

    EventBus.$on('CommodityImages', (val) => {
      this.richditor.pics = val
    })
  },
  data () {
    return {
      editor: '',
      arr: [],
      richditor: {
        goods_introduce: '',
        goods_weight: '',
        goods_number: '',
        goods_name: '',
        goods_price: '',
        goods_cat: '',
        attrs: [],
        pics: ''
      }
    }
  },
  watch: {
    arr: function (val) {
      this.richditor.attrs = val
      console.log(this.richditor)
    }
  },
  methods: {
    Rich () {
      this.$emit('Richeblue')
    },
    async AddCommodity () {
      const zheng = /<\/?.+?\/?>/g
      this.editor = this.editor.replace(zheng, '')
      this.richditor.goods_introduce = this.editor
      console.log(this.richditor)

      const { data: res } = await this.$http.post('goods', this.richditor)
      console.log(res)

      if (res.meta.status !== 201) return this.$message.error('添加失败')
      this.$message({
        type: 'success',
        message: '添加商品成功'
      })
      this.$emit('RicheAddBtn')
      setTimeout(() => {
        this.$router.push('/home/goods')
      }, 1000)
    }
  }
}
</script>

<style>
.text{
overflow: hidden;
height: 500px;

}
.quill-editor{
 height: 90%;
}

</style>
