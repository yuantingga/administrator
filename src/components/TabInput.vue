<template>
  <div>
    <el-tag style="margin: 15px" closable v-for="item in dynamicTags" :key="item"   @close="handleClose(item)">
      {{ item }}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"> </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>
<style lang="less" scoped>
.el-tag {
  &:last-of-type {
    margin-right: 0px;
  }
}
.button-new-tag {
  margin-left: 15px;
}
.input-new-tag {
  width: 100px;
  margin-left: 15px;
}
</style>
<script>
export default {
  props: ['editDate', 'classify'],
  data () {
    return {

      dynamicTags: [],
      inputVisible: false,
      inputValue: ''

    }
  },
  created () {
    this.Tab()
    console.log('分类id')
    console.log(this.classify)
    console.log('点击的选项数据对象')
    console.log(this.editDate)
  },
  methods: {
    Tab () {
      if (this.editDate.attr_vals === '') return
      this.dynamicTags = this.editDate.attr_vals.split(',')
    },
    handleClose (tag) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })

        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        this.axios()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async  handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.axios()
      this.inputVisible = false
      this.inputValue = ''
    },

    async axios () {
      const obj = {
        attr_name: this.editDate.attr_name,
        attr_sel: this.editDate.attr_sel,
        attr_vals: this.dynamicTags.join(',')
      }
      const { data: res } = await this.$http.put(`categories/${this.classify}/attributes/${this.editDate.attr_id}`, obj)
      console.log(res)
    }

  }
}
</script>
