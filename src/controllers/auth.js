"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// src/controllers/auth.ts
var jwt = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var argon2 = require("argon2");
// const argon2 = require("argon2");
var user_1 = require("../entity/user");
var exceptions_1 = require("../exceptions");
var constants_1 = require("../constants");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.login = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = (0, typeorm_1.getManager)().getRepository(user_1.User);
                        return [4 /*yield*/, userRepository
                                .createQueryBuilder()
                                .where({ name: ctx.request.body.name })
                                .addSelect("User.password")
                                .getOne()];
                    case 1:
                        user = _a.sent();
                        console.log(user.password, ctx.request.body.password);
                        if (!!user) return [3 /*break*/, 2];
                        throw new exceptions_1.UnauthorizedException("用户名不存在");
                    case 2: return [4 /*yield*/, argon2.verify(user.password, ctx.request.body.password)];
                    case 3:
                        if (_a.sent()) {
                            ctx.status = 200;
                            ctx.body = { token: jwt.sign({ id: user.id }, constants_1.JWT_SECRET) };
                        }
                        else {
                            throw new exceptions_1.UnauthorizedException("密码错误");
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.register = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, newUser, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRepository = (0, typeorm_1.getManager)().getRepository(user_1.User);
                        newUser = new user_1.User();
                        newUser.name = ctx.request.body.name;
                        newUser.email = ctx.request.body.email;
                        console.log(ctx.request.body);
                        _a = newUser;
                        return [4 /*yield*/, argon2.hash(ctx.request.body.password)];
                    case 1:
                        _a.password = _b.sent();
                        return [4 /*yield*/, userRepository.save(newUser)];
                    case 2:
                        user = _b.sent();
                        ctx.status = 201;
                        ctx.body = user;
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports["default"] = AuthController;
