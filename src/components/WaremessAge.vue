<template>
  <div>
    <el-form :model="AddProduct" :rules="ProductFromRules" ref="WaremessForm" label-width="100px" class="demo-ruleForm">
      <el-form-item  @blur="handleChange" label="商品名称" prop="goods_name">
        <el-input v-model="AddProduct.goods_name"></el-input>
      </el-form-item>

      <el-form-item label="商品价格" prop="goods_price">
        <el-input type="age" @blur="handleChange"  v-model="AddProduct.goods_price"></el-input>
      </el-form-item>
      <el-form-item label="商品重量" prop="goods_weight">
        <el-input  @blur="handleChange" v-model="AddProduct.goods_weight"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_number">
        <el-input  @blur="handleChange" v-model="AddProduct.goods_number"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-cascader  v-model="AddProduct.PrroductClassifyArr" :options="productClassifyList"
         :props="PrroductClassifyProps"  @change="handleChange"></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EventBus from '@/components/eventBus.JS'
export default {
  props: ['good_name'],
  data () {
    const Num = function (rex, value, callback) {
      rex = /\./
      if (Number.isNaN(Number(value))) {
        callback(new Error('请输入数字'))
      } else if (rex.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        callback()
      }
    }
    const validatePass = function (rex, value, callback) {
      if (Number.isNaN(Number(value))) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      PrroductClassifyProps: {
        value: 'cat_id',
        label: 'cat_name'
      },
      productClassifyList: [],
      AddProduct: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        PrroductClassifyArr: []
      },
      ProductFromRules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [
          { required: true, message: '商品价格不能为空' },
          { validator: validatePass, trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空' },
          { validator: validatePass, trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '商品数量不能为空' },
          { validator: Num, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    async handleChange () {
      this.$refs.WaremessForm.validate().then(value => {
        if (this.AddProduct.PrroductClassifyArr.length !== 3) {
          this.AddProduct.PrroductClassifyArr = []
          return
        }
        this.$emit('SonChangeData', this.AddProduct)
        EventBus.$emit('WaremessAge', this.AddProduct)
      }).catch()
    },
    async classifyList () {
      const { data: res } = await this.$http.get('categories')
      this.productClassifyList = res.data
    }
  },
  computed: {

  },
  created () {
    this.classifyList()
  }
}
</script>

<style></style>
