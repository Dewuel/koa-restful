require('dotenv').load();
require('dotenv').config();

const Router = require('koa-router');
const router = new Router();
const db = require('../../db/index');
const {User} = require('../../models/sysmgr');
const createToken = require('../../utils/createToken');
const sha1 = require('sha1'); //加密

router
    .post('/login',async(ctx)=> {
        let user_name = ctx.request.body.user_name;
        let password = sha1(ctx.request.body.password);
        await User.findOne({
            where: {
                user_name: user_name,
                password: password
            }
        }).then(user => {
            if (user && (password === user.password)) {
                // 用户名存在通过验证
                ctx.response.status = 200;
                ctx.response.body = {user: user, token: createToken(user_name), msg: '请求成功'};
            } else {
                // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册
                ctx.response.status = 400;
                ctx.response.body = {msg: '用户名或密码错误'};
            }
        }).catch(err => {
            // 查找数据库发生错误，或者一些
            console.log(err);
            ctx.response.status = 400;
            ctx.response.body = {msg: '登录失败，请于管理员联系或稍后重试'};
        });
    })
    .get('/getPageList',async(ctx,next)=> {
        let current_page = ctx.request.query.current_page;
        let page_size = ctx.request.query.page_size;
        let user_name = ctx.request.query.user_name;
        let start_date = ctx.request.query.start_date;
        let end_date = ctx.request.query.end_date;
        await User.findAndCountAll({
            offset: 0,
            limit: 10,
            where: {

            }
        }).then(result => {
            // 用户名存在通过验证
            ctx.response.status = 200;
            ctx.response.body = {data: result, msg: '请求成功'};
        }).catch(err => {
            // 查找数据库发生错误，或者一些
            console.log(err);
            ctx.response.status = 400;
            ctx.response.body = {msg: '登录失败，请于管理员联系或稍后重试'};
        });
    })
    .post('/add',async(ctx)=> {
        await User.create({
            user_name: 'ttt',
            password: '123456',
            descript: 'test'
        }).then(data => {
            console.info(data)
            if (data) {
                // 用户名存在通过验证
                ctx.response.status = 200;
                ctx.response.body = {user: data, token: createToken(user_name), msg: '请求成功'};
            } else {
                // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册
                ctx.response.status = 400;
                ctx.response.body = {msg: '用户名或密码错误'};
            }
        }).catch(err => {
            // 查找数据库发生错误，或者一些
            console.log(err);
            ctx.response.status = 400;
            ctx.response.body = {msg: '登录失败，请于管理员联系或稍后重试'};
        });
    })
    .post('/update',async(ctx)=> {
        let user_name = ctx.request.body.user_name;
        let password = sha1(ctx.request.body.password);
        await User.create({
            user_name: 'ttt',
            password: '123456',
            descript: 'test'
        }).then(data => {
            console.info(data)
            if (data) {
                // 用户名存在通过验证
                ctx.response.status = 200;
                ctx.response.body = {user: data, token: createToken(user_name), msg: '请求成功'};
            } else {
                // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册
                ctx.response.status = 400;
                ctx.response.body = {msg: '用户名或密码错误'};
            }
        }).catch(err => {
            // 查找数据库发生错误，或者一些
            console.log(err);
            ctx.response.status = 400;
            ctx.response.body = {msg: '登录失败，请于管理员联系或稍后重试'};
        });
    });
module.exports = router;