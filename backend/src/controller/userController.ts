import { Router } from "express";
import { UserCreateSchema, UserUpdateSchema } from "../models/userModels";
import { UserRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { ParamsWithIdSchema } from "../models/baseModels";
import { validate } from "../utils/middleware/validate";
import z from "zod";
import { LoginRequest } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (_, res) => {
  const users = await UserRepository.getAll();
  if (users.isErr) return handleErrorResp(500, res, users.error.message);

  return handleOkResp(users.value, res, `Listed ${users.value.length} users`);
});

router.get(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const user = await UserRepository.getSingle(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Listed user with id: ${id}`);
  }
);

router.post("/", validate({ body: UserCreateSchema }), async (req, res) => {
  const data = req.body;
  const user = await UserRepository.createSingle(data);
  if (user.isErr) return handleErrorResp(500, res, user.error.message);
  return handleOkResp(
    user.value,
    res,
    `Created user with id: ${user.value.id}`
  );
});

router.put(
  "/:id",
  validate({ params: ParamsWithIdSchema, body: UserUpdateSchema }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await UserRepository.updateSingle(id, data);
      if (user.isErr) return handleErrorResp(500, res, user.error.message);
      return handleOkResp(user.value, res, `Updated user with id: ${id}`);
    } catch (error) {
      if (error instanceof z.ZodError)
        return handleErrorResp(400, res, error.message);
      return handleErrorResp(500, res, `Unknown error ${error}`);
    }
  }
);

router.delete(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const user = await UserRepository.deleteSingle(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Deleted user with id: ${id}`);
  }
);

router.post(
  "/login",
  validate({ body: LoginRequest }),
  async (req, res) => {
    const usersResult = await UserRepository.getAll();
    if(usersResult.isErr){
      return handleErrorResp(500, res, usersResult.error.message);
    }
    const user = usersResult.value.find(u => u.name === req.body.username);
    if(!user){
      return handleErrorResp(401, res, "Invalid username");
    }
    const passwordHashed = await bcrypt.hash(req.body.password, user.password_salt!);
    const isMatch = passwordHashed === user.password_hash;
    if (user && isMatch) {
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      return handleOkResp(user, res, `Logged in user with id: ${user.id}`);
    }
    return handleErrorResp(401, res, "Invalid credentials");
  }
);


router.post(
  "/register",
  validate({body: UserCreateSchema }),
  async (req, res) => {
    const body = req.body;

    const usersResult = await UserRepository.getAll();
    if(usersResult.isErr){
      return handleErrorResp(500, res, usersResult.error.message);
    }
    const user = usersResult.value.length === 0 ? null : usersResult.value.find(u => u.name === body.name);
    if(user){
      return handleErrorResp(401, res, "User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(body.password_hash, salt);
    body.password_hash = passwordHashed;
    body.password_salt = salt;
    const newUser = await UserRepository.createSingle(body);
    if(newUser.isErr){
      return handleErrorResp(500, res, newUser.error.message);
    }
    
    const token = jwt.sign({ id: newUser.value.id }, 'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    return handleOkResp(newUser.value, res, `Registered user with id: ${newUser.value.id}`);
  }
);

export default router;
