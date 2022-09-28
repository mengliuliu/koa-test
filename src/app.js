"use strict";
exports.__esModule = true;
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
var Koa = require("koa");
var jwt = require("koa-jwt");
var bodyParser = require("koa-bodyparser");
var createConnection = require("typeorm").createConnection;
var routes_1 = require("./routes");
var constants_1 = require("./constants");
require("reflect-metadata");
// 创建一个Koa对象表示web app本身:
createConnection()
    .then(function () {
    var app = new Koa();
    app.use(bodyParser());
    // 无需 JWT Token 即可访问
    app.use(routes_1.unprotectedRouter.routes()).use(routes_1.unprotectedRouter.allowedMethods());
    // 注册 JWT 中间件
    app.use(jwt({ secret: constants_1.JWT_SECRET }).unless({ method: "GET" }));
    // 需要 JWT Token 才可访问
    app.use(routes_1.protectedRouter.routes()).use(routes_1.protectedRouter.allowedMethods());
    // 在端口3000监听:
    app.listen(3000);
    console.log("app started at port 3000...");
})["catch"](function (err) { return console.log("TypeORM connection error:", err); });
