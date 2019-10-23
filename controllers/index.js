const fn_home = async (ctx,next)=>{
    ctx.response.body = `<h1>欢迎，欢迎~ 热烈欢迎！！！</h1>`;
}
const fn_login = async (ctx,next)=>{
    console.log(ctx.request.body)
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name  && password) {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>`;
    }
}
module.exports = {
    // "get/":fn_home,
    "post/login":fn_login
}