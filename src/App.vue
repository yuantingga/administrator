<template>
  <div id="app">
    <router-link to="/login"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'

}
</script>
<style >
#app {
  margin: 0;
  padding: 0;

}
*{
    /* 第一个方块颜色，第二个轨道颜色(用于更改火狐浏览器样式) */
    scrollbar-color: #e5e5e5 #f7f7f9;
     scrollbar-width: none;  /* 火狐滚动条无法自定义宽度，只能通过此属性使滚动条宽度变细 */
     -ms-overflow-style:none;  /* 隐藏滚动条（在IE和Edge两个浏览器中很难更改样式，固采取隐藏方式） */

}

::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);

  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

  -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
  background: #ccc;
}
/* 以下是chrome浏览器自定义滚动条样式方式 */
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
</style>
