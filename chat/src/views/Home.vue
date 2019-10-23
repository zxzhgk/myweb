<template>
<div class="main">
  <div class="chat">
    <el-container>
      <el-main class="message-box">
        <div class="message-list"></div>
        <div class="message-send">
          <el-input placeholder="请输入内容" v-model="message" class="input-with-select">
            <el-button slot="append" icon="el-icon-chat-line-round" type="primary">发送</el-button>
          </el-input>
        </div>
      </el-main>
      <el-aside class="aside">
        <div class="user-box"></div>
      </el-aside>
    </el-container>
  </div>
</div>
</template>

<script>

export default {
  name: 'home',
  components: {
    
  },
  data(){
    return {
      message:""
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content:center;
  align-items: center;
  background: #f3f2f2;
  .chat{
    width: 50vw;
    height: 80vh;
    box-shadow: 0px 5px 15px #000;
    background: #Fff;
    .message-box{
      height: 80vh;
      overflow: hidden;
      padding: 2px;
      .message-list{
        height: calc(80vh - 60px);
        overflow: scroll;
        background: rgb(243, 241, 241);
        border-radius: 5px;
        margin-bottom: 10px;
      }
    }
    .aside{
      height: 80vh;
      padding: 2px 0 4px 2px;
      .user-box{
        height:100%;
        overflow: scroll;
        background: rgb(243, 241, 241);
      }
    }
    
  }
}
</style>
