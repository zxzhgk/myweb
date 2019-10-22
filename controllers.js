const fs = require('fs');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();


// 读取controllers文件夹下的请求函数模块文件
function getControllersModel(){
    var files = fs.readdirSync(__dirname + '/controllers');
    console.log(files)

    var js_files = files.filter((f)=>{
        // 获取以 .js 结尾的文件
        return f.endsWith('.js');
    });
    console.log(js_files)
    for ( let file of js_files){
        // 引入对应 controllers 导出的模块
        let model=require(__dirname + '/controllers/' + file);
        console.log(model);
        addRouter(model);
    }
}
// 添加对应模块的请求函数至router
function addRouter(model){
    for (let attr in model){
        if(attr.startsWith("get")){
            let path=attr.substring(3)
            console.log(path)
            router.get(path, model[attr]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(attr.startsWith("post")){
            let path = attr.substring(4);
            router.post(path, model[attr]);
            console.log(`register URL mapping: POST ${path}`);
        }else{
            console.log("其他类型请求，后期扩展")
        }
    }
}
module.exports = function(){
    getControllersModel()
    return router.routes();
}