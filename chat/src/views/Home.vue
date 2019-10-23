<template>
<div class="main">
  <el-dialog
    title="起个名字吧"
    :visible.sync="dialogVisible"
    width="30%">
    <el-input placeholder="起个名字吧" maxlength="2" v-model="name"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  <div class="chat">
    <el-container>
      <el-main class="message-box">
        <div class="message-list" ref="messageList">
          <div class="msg" v-for="(item,key) in msgList" :key="key">
            <div class="name">{{item.name}}</div>
            <div class="text">{{item.msg}}</div>
          </div>
        </div>
        <div class="message-send">
          <el-input placeholder="请输入内容" v-model="message" class="input-with-select">
            <el-button slot="append" icon="el-icon-chat-line-round" type="primary" @click="send">发送</el-button>
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
// function trim(data) {
  
// }
export default {
  name: 'home',
  components: {
    
  },
  data(){
    return {
      message:"",
      msgList:[],
      name:"默",
      dialogVisible:true
    }
  },
  created() {
    // this.$axios.post(`http://192.168.124.96:3000/login`)
    // 打开一个WebSocket:
    this.ws = new WebSocket('ws://134.175.187.181:3001/test');
    // 响应onmessage事件:
    this.ws.onmessage = msg=>{ 
      console.log(msg.data)
      console.log(JSON.parse(msg.data))
      this.msgList.push(JSON.parse(msg.data))
      console.log(this)
      this.$nextTick(()=>{
        this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight
      })
      console.log(this.msgList)
    };
    // 给服务器发送一个字符串:
    this.ws.addEventListener('open', ()=> {
        // this.ws.send('vue!');
    });
    
  },
  methods: {
    send(){
      let data ={
        name:this.name,
        msg:this.message
      }
      this.ws.send(JSON.stringify(data));
      this.message="";
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
        .msg{
          display: flex;
          padding: 10px;
          .name{
            flex: none;
            width: 50px;
            height: 50px;
            border-radius: 50px;
            line-height: 50px;
            background: #737573;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
          }
          .text{
            flex: auto;
            font-size: 12px;
            color: #737573;
            line-height: 50px;
            margin-left: 20px;
          }
        }
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
