<template>
  <div>
    <el-row>
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row style="margin: 15px 0">
      <el-col>
        <el-card class="box-card">
          <el-row>
            <el-col>
              <el-form>
                <el-input style="width: 300px" placeholder="请输入内容">
                  <template slot="append">
                    <i class="el-icon-search"></i>
                  </template>
                </el-input>
              </el-form>
            </el-col>
            <el-col style="margin: 15px 0">
              <el-table :data="tabledata" border style="width: 100%">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="order_number" label="订单编号" width="180"> </el-table-column>
                <el-table-column prop="order_price" label="订单价格" width="180"> </el-table-column>
                <el-table-column prop="pay_status" label="是否付款">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.pay_status === '0'" type="danger">未付款</el-tag>
                    <el-tag v-if="scope.row.pay_status === '1'" type="success">已付款</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="is_send" label="是否发货"> </el-table-column>
                <el-table-column prop="create_time" label="下单时间">
                  <template slot-scope="scope">
                    {{ scope.row.create_time | DateFun }}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template>
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="editbutn"> </el-button>
                    <el-button size="mini" type="success" icon="el-icon-location-outline" @click="logisticsbtn"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col style="margin: 15px 0">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="ListArr" :page-size="listNum" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="编辑" @close="editclose" :visible.sync="edit" width="40%">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="省市区/县">
          <el-cascader v-model="editForm.region" style="width: 100%" :options="citydata" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="editForm.area"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="edit = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物流信息" :visible.sync="logistics" width="30%" >
      <div>
        <el-timeline :reverse="true">
          <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logistics = false">取 消</el-button>
        <el-button type="primary" @click="logistics = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import citydata from '@/components/orderlist/citydata.js'
import axios from 'axios'
export default {
  created () {
    this.getlistDate()
  },
  data () {
    return {
      citydata: citydata,
      props: {
        value: 'children',
        label: 'value'
      },
      editForm: {
        region: [],
        area: ''
      },

      logistics: false,
      edit: false,
      currentPage4: 1,
      ListArr: [10, 20, 30, 40],
      listNum: 10,
      total: 100,
      tabledata: [],
      inputvalue: '',
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  methods: {
    editclose () {
      this.editForm.region = ''
      this.editForm.area = ''
    },
    async logisticsbtn () {
      const { data: res } = axios.get('http://api.yesapi.cn/api/App/KdAPI/Track')
      console.log(res)
      this.logistics = true
    },
    editbutn () {
      this.edit = true
    },
    async getlistDate () {
      const { data: res } = await this.$http.get('orders', {
        params: {
          pagenum: this.currentPage4,
          pagesize: this.listNum
        }
      })
      console.log(res)
      this.total = res.data.total
      this.tabledata = res.data.goods
    },
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.getlistDate()
    },
    handleSizeChange (val) {
      this.listNum = val
      this.getlistDate()
    },
    handleChange () {}
  }
}
</script>

<style></style>
