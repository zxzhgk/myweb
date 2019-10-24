<template>
<div class="main background">
  <span v-for="(s,key) in spanLength" :key="key"></span>
  <el-dialog
    title="起个名字吧"
    :visible.sync="dialogVisible"
    width="30%">
    <el-input placeholder="起个名字吧" maxlength="4" v-model="name"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="setName">确 定</el-button>
    </span>
  </el-dialog>
  <div class="chat">
    <el-container>
      <el-main class="message-box">
        <div class="message-list" ref="messageList">
          <div class="msg" v-for="(item,key) in msgList" :key="key">
            <div class="name" :class="{myself:item.name==name}">{{item.name}}</div>
            <div class="text">{{item.msg}}</div>
          </div>
        </div>
        <div class="message-send">
          <el-input placeholder="请输入内容" v-model="message" @keyup.enter.native="send" class="input-with-select">
            <el-button slot="append" icon="el-icon-chat-line-round" type="primary" @click="send">发送 or enter</el-button>
          </el-input>
        </div>
      </el-main>
      <el-aside class="aside" width="30%">
        <div class="user-box">
          <div class="user" v-for="(u,key) in user" :key="key">{{u}}</div>
        </div>
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
      spanLength:"1234567890",
      message:"",
      msgList:[],
      user:[],
      name:"默认",
      dialogVisible:false
    }
  },
  created() {
    if(localStorage.getItem("name")){
      this.name=localStorage.getItem("name");
      this.user.push(this.name)
    }else{
      this.dialogVisible=true;
    }
    // 打开一个WebSocket:
    this.ws = new WebSocket('ws://134.175.187.181:3001/test');
    // 响应onmessage事件:
    this.ws.onmessage = msg=>{ 
      let msgObject=JSON.parse(msg.data)
      this.msgList.push(msgObject)
      if(!this.user.includes(msgObject.name)){
        this.user.push(msgObject.name)
        // this.$message({
        //   message: `欢迎${msgObject.name}`,
        //   type: 'success'
        // });
      }
      this.$nextTick(()=>{
        this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight
      })
    };
    // 给服务器发送一个字符串:
    this.ws.addEventListener('open', ()=> {
        // this.ws.send('vue!');
    });
    
  },
  methods: {
    setName(){
      this.dialogVisible=false;
      if (this.name !="默认") {
        localStorage.setItem("name",this.name);
        this.user.push(this.name)
      }
    },
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
  background: rgb(243, 241, 241);
  // background: linear-gradient(-45deg,#e9d947,#ce69ac, #ee7752, #e04d85, #23a6d5, #23d5ab);
	// background-size: 1000% 1000%;
	// animation: gradientBG 20s ease infinite;
  .chat{
    width: 50vw;
    height: 80vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
            border-radius: 10px;
            padding: 5px 10px;
            background: #737573;
            color: #fff;
            font-size: 14px;
            height: 30px;
            position: relative;
          }
          .name:after{
            position: absolute;
            content:"";
            top: 7px;
            right: -10px;
            width:0;  
            height:0;  
            border-top: 8px solid transparent;  
            border-left: 10px solid rgb(252, 252, 252);  
            border-bottom: 8px solid transparent;
          }
          .myself{
            background: #408bb6;
          }
          .text{
            flex: none;
            max-width: 80%;
            font-size: 12px;
            color: #737573;
            line-height: 30px;
            margin-left: 15px;
            padding: 0 10px;
            background: rgb(255, 255, 255);
            border-radius: 5px;
            word-wrap:break-word;
          }
        }
        .msg:after{
          flex: auto;
          content:"";
        }
      }
      .message-send{
        padding: 0 5px;
      }
    }
    .aside{
      height: 80vh;
      padding: 2px 0 2px 2px;
      .user-box{
        height: 80vh;
        overflow: scroll;
        background: rgb(243, 241, 241);
        display: flex;
        padding: 10px;
        flex-wrap:wrap;
        .user{
          flex: none;
          height: 30px;
          border-radius: 10px;
          padding: 5px 10px;
          background: #737573;
          color: #fff;
          font-size: 14px;
          margin-right: 10px;
        }
      }
      .user-box:after{
        flex: auto;
        content:"";
        height: 30px;
      }
    }
  }
}
@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}
.background span {
  width: 20vmin;
  height: 20vmin;
  border-radius: 20vmin;
  backface-visibility: hidden;
  position: absolute;
  animation-name: move;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.background span:nth-child(1) {
  color: #FFACAC;
  top: 44%;
  left: 97%;
  animation-duration: 15s;
  animation-delay: -13.8s;
  transform-origin: 11vw -22vh;
  box-shadow: 40vmin 0 10.12735945vmin currentColor;
}
.background span:nth-child(2) {
  color: #E45A84;
  top: 93%;
  left: 8%;
  animation-duration: 13.8s;
  animation-delay: -10.9s;
  transform-origin: 10vw 23vh;
  box-shadow: 40vmin 0 12.7346672971vmin currentColor;
}
.background span:nth-child(3) {
  color: #FFACAC;
  top: 14%;
  left: 41%;
  animation-duration: 15.9s;
  animation-delay: -6.7s;
  transform-origin: -9vw -24vh;
  box-shadow: -40vmin 0 11.4923952406vmin currentColor;
}
.background span:nth-child(4) {
  color: #E45A84;
  top: 52%;
  left: 75%;
  animation-duration: 14.3s;
  animation-delay: -12.6s;
  transform-origin: 16vw 25vh;
  box-shadow: 40vmin 0 13.3657534039vmin currentColor;
}
.background span:nth-child(5) {
  color: #FFACAC;
  top: 7%;
  left: 5%;
  animation-duration: 15.9s;
  animation-delay: -10s;
  transform-origin: 8vw 3vh;
  box-shadow: -40vmin 0 13.3942178273vmin currentColor;
}
.background span:nth-child(6) {
  color: #FFACAC;
  top: 35%;
  left: 1%;
  animation-duration: 11.6s;
  animation-delay: -6s;
  transform-origin: 0vw 17vh;
  box-shadow: -40vmin 0 7.6304875279vmin currentColor;
}
.background span:nth-child(7) {
  color: #FFACAC;
  top: 42%;
  left: 84%;
  animation-duration: 11s;
  animation-delay: -6.9s;
  transform-origin: 11vw -8vh;
  box-shadow: 40vmin 0 13.6665321499vmin currentColor;
}
.background span:nth-child(8) {
  color: #E45A84;
  top: 53%;
  left: 95%;
  animation-duration: 15s;
  animation-delay: -10.9s;
  transform-origin: 25vw 15vh;
  box-shadow: 40vmin 0 13.2849881717vmin currentColor;
}
.background span:nth-child(9) {
  color: #FFACAC;
  top: 75%;
  left: 67%;
  animation-duration: 11.7s;
  animation-delay: -13.9s;
  transform-origin: -11vw -3vh;
  box-shadow: 40vmin 0 7.2158804055vmin currentColor;
}
.background span:nth-child(10) {
  color: #583C87;
  top: 59%;
  left: 51%;
  animation-duration: 12.1s;
  animation-delay: -11.7s;
  transform-origin: -5vw -7vh;
  box-shadow: -40vmin 0 7.4269772253vmin currentColor;
}
.background span:nth-child(11) {
  color: #FFACAC;
  top: 80%;
  left: 91%;
  animation-duration: 13.4s;
  animation-delay: -5.9s;
  transform-origin: 7vw -19vh;
  box-shadow: 40vmin 0 11.2741559637vmin currentColor;
}
.background span:nth-child(12) {
  color: #FFACAC;
  top: 68%;
  left: 97%;
  animation-duration: 15.8s;
  animation-delay: -8.2s;
  transform-origin: 24vw 3vh;
  box-shadow: 40vmin 0 11.2552482722vmin currentColor;
}
.background span:nth-child(13) {
  color: #FFACAC;
  top: 69%;
  left: 46%;
  animation-duration: 10.4s;
  animation-delay: -11.5s;
  transform-origin: 13vw 24vh;
  box-shadow: -40vmin 0 6.2939412125vmin currentColor;
}
.background span:nth-child(14) {
  color: #E45A84;
  top: 98%;
  left: 63%;
  animation-duration: 14.2s;
  animation-delay: -3s;
  transform-origin: -13vw -15vh;
  box-shadow: -40vmin 0 10.5039271244vmin currentColor;
}
.background span:nth-child(15) {
  color: #583C87;
  top: 12%;
  left: 20%;
  animation-duration: 14s;
  animation-delay: -6.8s;
  transform-origin: 7vw 20vh;
  box-shadow: 40vmin 0 10.924056322vmin currentColor;
}
.background span:nth-child(16) {
  color: #E45A84;
  top: 29%;
  left: 20%;
  animation-duration: 11s;
  animation-delay: -14.4s;
  transform-origin: -20vw 4vh;
  box-shadow: -40vmin 0 13.3859956789vmin currentColor;
}
.background span:nth-child(17) {
  color: #FFACAC;
  top: 88%;
  left: 87%;
  animation-duration: 10.7s;
  animation-delay: -3.7s;
  transform-origin: -11vw 12vh;
  box-shadow: 40vmin 0 14.8726292689vmin currentColor;
}
.background span:nth-child(18) {
  color: #583C87;
  top: 57%;
  left: 35%;
  animation-duration: 10.1s;
  animation-delay: -13.6s;
  transform-origin: -19vw -1vh;
  box-shadow: 40vmin 0 8.5771411832vmin currentColor;
}
.background span:nth-child(19) {
  color: #583C87;
  top: 11%;
  left: 37%;
  animation-duration: 11.5s;
  animation-delay: -10.1s;
  transform-origin: -20vw 22vh;
  box-shadow: 40vmin 0 8.1729042124vmin currentColor;
}
.background span:nth-child(20) {
  color: #583C87;
  top: 53%;
  left: 60%;
  animation-duration: 12.3s;
  animation-delay: -11.3s;
  transform-origin: 10vw -1vh;
  box-shadow: 40vmin 0 13.5347652223vmin currentColor;
}
</style>
