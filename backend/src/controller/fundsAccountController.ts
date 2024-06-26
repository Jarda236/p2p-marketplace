import { Router } from "express";
import { FundsAccountCreateSchema, FundsAccountUpdateSchema } from "../models/fundsAccountModels";
import { FundsAccountRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { ParamsWithIdSchema } from "../models/baseModels";
import { validate } from "../utils/middleware/validate";
import z from "zod";

const router = Router();

router.get("/", async (_, res) => {
  const items = await FundsAccountRepository.getAll();
  if (items.isErr) return handleErrorResp(500, res, items.error.message);

  return handleOkResp(items.value, res, `Listed ${items.value.length} items`);
});

router.get(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const items = await FundsAccountRepository.getSingle(id);
    if (items.isErr) return handleErrorResp(500, res, items.error.message);
    return handleOkResp(items.value, res, `Listed item with id: ${id}`);
  }
);

router.post("/", validate({ body: FundsAccountCreateSchema }), async (req, res) => {
  const data = req.body;
  const items = await FundsAccountRepository.createSingle(data);
  if (items.isErr) return handleErrorResp(500, res, items.error.message);
  return handleOkResp(
    items.value,
    res,
    `Created item with id: ${items.value.id}`
  );
});

router.put(
  "/:id",
  validate({ params: ParamsWithIdSchema, body: FundsAccountUpdateSchema }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const items = await FundsAccountRepository.updateSingle(id, data);
      if (items.isErr) return handleErrorResp(500, res, items.error.message);
      return handleOkResp(items.value, res, `Updated item with id: ${id}`);
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
    const items = await FundsAccountRepository.deleteSingle(id);
    if (items.isErr) return handleErrorResp(500, res, items.error.message);
    return handleOkResp(items.value, res, `Deleted item with id: ${id}`);
  }
);

export default router;
