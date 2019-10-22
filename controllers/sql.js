const Sequelize = require('sequelize');
const config = require('../sql_config.js');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var Pet = sequelize.define('pets', {
    id: {   
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, 
{
    timestamps: false
});
const fn_add = async (ctx,next)=>{
    var now = Date.now();
    Pet.create({
        id: 'g-' + now,
        name:ctx.request.body.name,
        gender: false,
        birth: '2007-07-07',
        createdAt: now,
        updatedAt: now,
        version: 0
    }).then(function (p) {
        ctx.response.body = `<h1>${JSON.stringify(p)}</h1>`;
    }).catch(function (err) {
        ctx.response.body = `<h1>${err}</h1>`;
        console.log('failed: ' + err);
    });
}
const fn_query = async (ctx,next)=>{
    var pets = await Pet.findAll({
        where: {
            name:ctx.request.body.name
        }
    });
    ctx.response.body = `<h1>${JSON.stringify(pets)}</h1>`;
}
module.exports = {
    "post/sql/add":fn_add,
    "post/sql/query":fn_query
}