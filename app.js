const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const os=require('os');
const controllers = require("./controllers.js")
const static = require('koa-static');


const app = new Koa();
app.use(bodyParser());
// 在开发环境中获取局域网中的本机iP地址
const interfaces = os.networkInterfaces(); 
let IPAdress = '';
for(var devName in interfaces){  
  var iface = interfaces[devName];  
  for(var i=0;i<iface.length;i++){  
        var alias = iface[i];  
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
              IPAdress = alias.address;  
        }  
  }  
}
app.use(async (ctx, next) => {
      console.log(ctx.cookies)
      // ctx.set('Access-Control-Allow-Origin', 'http://192.168.124.96:3000');
      // console.log(parseUser(ctx.cookies.get('name') || ''))
      // ctx.state.user = parseUser(ctx.cookies.get('name') || '');
      await next();
});
// 配置静态web服务的中间件chat
app.use(static(__dirname+"/chat/dist"));
// 配置路由控制
app.use(controllers());
app.listen(3000);
console.log(`${IPAdress}:3000`);