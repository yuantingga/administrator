<template>
  <div>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>

      </el-breadcrumb>
    </el-row>

    <el-row style="margin: 15px 0">
      <el-card class="box-card">

        <div class="echarts"></div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  created () {
    this.$http.get('reports/type/1').then((result) => {
      const res = result.data
      this.legend = res.data.legend
      this.series = res.data.series
      this.time = res.data.xAxis[0].data
      this.yAxis = res.data.yAxis
      this.setecharts()
    }).catch((err) => {
      console.log(err)
    })
  },
  data () {
    return {
      legend: [],
      series: [],
      time: [],
      yAxis: []
    }
  },
  methods: {
    async setecharts () {
      const Myecharts = echarts.init(document.querySelector('.echarts'))

      const option = {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: this.legend,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.time
          }
        ],
        yAxis: this.yAxis,
        series: this.series
      }
      Myecharts.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.echarts {
  width: 70%;
  height: 500px;
}
</style>
