<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing:border-box;
}
/* 滚动条样式调整 */
::-webkit-scrollbar {
  /*高宽分别对应横竖滚动条的尺寸*/
  width: 2px;     
  height: 0px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #a19f9f;
}
::-webkit-scrollbar-thumb:hover{
  background: #3d3d3d;
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  background: #EDEDED;
}
</style>