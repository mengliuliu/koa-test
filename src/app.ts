// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
import router from "./routes";
import { createConnection } from "typeorm";
import "reflect-metadata";

// 创建一个Koa对象表示web app本身:
createConnection()
  .then(() => {
    const app = new Koa();

    app.use(bodyParser());
    // 响应用户请求
    app.use(router.routes()).use(router.allowedMethods());

    // 在端口3000监听:
    app.listen(3000);
    console.log("app started at port 3000...");
  })
  .catch((err: string) => console.log("TypeORM connection error:", err));
