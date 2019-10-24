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
@font-face {
  font-family: 'webfont';
  font-display: swap;
  src: url('//at.alicdn.com/t/webfont_2pd43zs9m2c.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/webfont_2pd43zs9m2c.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/webfont_2pd43zs9m2c.woff2') format('woff2'),
  url('//at.alicdn.com/t/webfont_2pd43zs9m2c.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/webfont_2pd43zs9m2c.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/webfont_2pd43zs9m2c.svg#站酷小薇体') format('svg'); /* iOS 4.1- */
}
/* 滚动条样式调整 */
::-webkit-scrollbar {
  /*高宽分别对应横竖滚动条的尺寸*/
  width: 0px;     
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