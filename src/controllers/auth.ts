// src/controllers/auth.ts
import { getManager } from "typeorm";
import * as argon2 from "argon2";
import { User } from "../entity/user";

export default class AuthController {
  public static async login(ctx: any) {
    ctx.body = "Login controller";
  }

  public static async register(ctx: any) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);

    // 保存到数据库
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = user;
  }
}
