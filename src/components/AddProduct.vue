<template>
  <div >
    <el-card class="box-card">
      <el-row> <el-alert title="添加商品" type="info" style="margin: 15px 0" center show-icon> </el-alert></el-row>
      <el-row style="margin:15px 0">
        <el-steps align-center  icon="" :active="active" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </el-row>
      <el-row style="margin:15px 0;flex:1;">

        <el-tabs @tab-click="SetStepsSelect" :tab-position="tabPosition" v-model="TabName"
         :before-leave="selectTabs" >
          <el-tab-pane name="0"  ref="waremessage" label="基本信息">
             <template>
               <WaremessAge @SonChangeData="WaremessAgeEvent" ></WaremessAge>

             </template>
          </el-tab-pane>
          <el-tab-pane name="1"  label="商品参数">
            <template>
               <ProductParameter></ProductParameter>
            </template>
          </el-tab-pane>
          <el-tab-pane name="2"  label="商品属性">
          <template>

             <ProductAttributes></ProductAttributes>
          </template>
          </el-tab-pane>
          <el-tab-pane name="3"  label="商品图片">
          <template>
            <CommodityImages></CommodityImages>
          </template>
          </el-tab-pane>
          <el-tab-pane  name="4"  label="商品内容">
            <template>
            <RicheDitor @Richeblue="Richeblue"  @RicheAddBtn="Richeditor"></RicheDitor>

            </template>
          </el-tab-pane>
        </el-tabs>

      </el-row>
    </el-card>
  </div>
</template>

<script>
import ProductAttributes from '@/components/ProductAttributes'
import WaremessAge from '@/components/WaremessAge'
import ProductParameter from '@/components/ProductParameter'
import CommodityImages from '@/components/CommodityImages.vue'
import RicheDitor from '@/components/RicheDitor.vue'
export default {
  data () {
    return {
      state: 0,
      TabName: '0',
      // 基本信息子组件传递的数据坚进行存储
      basicInformation: [],
      active: 0,
      tabPosition: 'left',
      ProductFormRules: {
        goods_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    selectTabs (Tabnew, old) {
      if (this.basicInformation.length === 0) {
        this.$message.error('请完善商品基本信息')
        console.log(11111)
        return false
      }
    },
    SetStepsSelect () {
      this.active = parseInt(this.TabName)
    },
    WaremessAgeEvent (val) {
      if (val === null) return
      this.basicInformation = val
      this.active = 1
      this.TabName = '1'
    },
    Richeblue () {
      this.active = 5
    },
    async Richeditor () {
      this.active = 6
    }
  },
  components: {
    WaremessAge,
    // eslint-disable-next-line vue/no-unused-components
    ProductParameter,
    // eslint-disable-next-line vue/no-unused-components
    ProductAttributes,
    // eslint-disable-next-line vue/no-unused-components
    CommodityImages,
    // eslint-disable-next-line vue/no-unused-components
    RicheDitor

  }

}
</script>

<style lang="less">
.el-row {
  margin-bottom: 15px 0;
}
.el-step__title {
  font-size: 13px !important;
}
.box-card,.el-card__body{
display: flex;
flex-direction: column;
overflow: hidden;

}
.el-tabs__content{
   left: 10px;
   margin-right: 30px;

}
</style>
