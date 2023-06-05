import { Router } from "express";
import { UserCreateSchema, UserUpdateSchema } from "../models/userModels";
import { UserRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { ParamsWithIdSchema } from "../models/baseModels";
import { validate } from "../utils/middleware/validate";
import z from "zod";

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

export default router;
