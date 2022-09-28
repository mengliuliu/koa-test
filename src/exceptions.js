"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ForbiddenException = exports.UnauthorizedException = exports.NotFoundException = exports.BaseException = void 0;
// src/exceptions.ts
var BaseException = /** @class */ (function (_super) {
    __extends(BaseException, _super);
    function BaseException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseException;
}(Error));
exports.BaseException = BaseException;
var NotFoundException = /** @class */ (function (_super) {
    __extends(NotFoundException, _super);
    function NotFoundException(msg) {
        var _this = _super.call(this) || this;
        _this.status = 404;
        _this.message = msg || '无此内容';
        return _this;
    }
    return NotFoundException;
}(BaseException));
exports.NotFoundException = NotFoundException;
var UnauthorizedException = /** @class */ (function (_super) {
    __extends(UnauthorizedException, _super);
    function UnauthorizedException(msg) {
        var _this = _super.call(this) || this;
        _this.status = 401;
        _this.message = msg || '尚未登录';
        return _this;
    }
    return UnauthorizedException;
}(BaseException));
exports.UnauthorizedException = UnauthorizedException;
var ForbiddenException = /** @class */ (function (_super) {
    __extends(ForbiddenException, _super);
    function ForbiddenException(msg) {
        var _this = _super.call(this) || this;
        _this.status = 403;
        _this.message = msg || '权限不足';
        return _this;
    }
    return ForbiddenException;
}(BaseException));
exports.ForbiddenException = ForbiddenException;
