<template>
  <div class="aaa">

  <!-- <el-row class="text">
    <quill-editor @blur="Rich"  v-model="editor"></quill-editor>
  </el-row> -->
      <div id="div1">
        <p></p>
      </div>
  <el-row>
    <el-button style="margin:15px" @click="AddCommodity" type="primary">添加商品</el-button>

    </el-row>
  </div>
</template>

<script>
import EventBus from '@/components/gook_cate/addgoods/eventBus.JS'
import E from 'wangeditor'
export default {
  created () {
    EventBus.$on('WaremessAge', (val) => {
      this.richditor.goods_name = val.goods_name
      this.richditor.goods_cat = val.PrroductClassifyArr.join(',')
      this.richditor.goods_price = val.goods_price
      this.richditor.goods_number = val.goods_number
      this.richditor.goods_weight = val.goods_weight
      this.richditor.goods_introduce = val.goods_introduce
      console.log(val)
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
      console.log(val)
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
      console.log(val)
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
    init () {
      const editor = new E('#div1')
      // 或者 const editor = new E( document.getElementById('div1') )
      editor.create()
    },
    Rich () {
      this.$emit('Richeblue')
    },
    async AddCommodity () {
      console.log(this.editor)
      // console.log(this.richditor)
      const zheng = /<\/?.+?\/?>/g

      this.richditor.goods_introduce = this.editor.replace(zheng, '')
      console.log(this.richditor)

      const { data: res } = await this.$http.post('goods', this.richditor)
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
      this.$message({
        type: 'success',
        message: '创建成功'
      })
      this.editor = ''
      this.$emit('RicheAddBtn', '')
      this.$router.push('goods')
    }
  },
  mounted () {
    this.init()
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
