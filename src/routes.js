"use strict";
exports.__esModule = true;
exports.unprotectedRouter = exports.protectedRouter = void 0;
// src/routes.ts
var Router = require("koa-router");
var auth_1 = require("./controllers/auth");
var user_1 = require("./controllers/user");
var unprotectedRouter = new Router();
exports.unprotectedRouter = unprotectedRouter;
// auth 相关的路由
unprotectedRouter.post("/auth/login", auth_1["default"].login);
unprotectedRouter.post("/auth/register", auth_1["default"].register);
var protectedRouter = new Router();
exports.protectedRouter = protectedRouter;
// users 相关的路由
protectedRouter.get("/users", user_1["default"].listUsers);
protectedRouter.get("/users/:id", user_1["default"].showUserDetail);
protectedRouter.put("/users/:id", user_1["default"].updateUser);
protectedRouter["delete"]("/users/:id", user_1["default"].deleteUser);
