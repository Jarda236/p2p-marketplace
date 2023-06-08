import { Router } from "express";
import { ItemCreateSchema, ItemUpdateSchema } from "../models/itemModels";
import { ItemRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { ParamsWithIdSchema } from "../models/baseModels";
import { validate } from "../utils/middleware/validate";
import z from "zod";
import { AuthenticatedRequest, authenticate } from "../utils/middleware/authenticate"

const router = Router();

router.get("/logged-user", authenticate, 
  async (req: AuthenticatedRequest, res) => {
    const items = await ItemRepository.getAllbyUser(req.user!.id);
    if(items.isErr) return handleErrorResp(500, res, items.error.message);
    const result = items.value.filter(x => x.userId === req.user!.id);
    return handleOkResp(result, res, `Listed ${result.length}`);
  }
);

router.get("/", async (_, res) => {
  const items = await ItemRepository.getAll();
  if (items.isErr) return handleErrorResp(500, res, items.error.message);

  return handleOkResp(items.value, res, `Listed ${items.value.length} items`);
});

router.get(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const items = await ItemRepository.getSingle(id);
    if (items.isErr) return handleErrorResp(500, res, items.error.message);
    return handleOkResp(items.value, res, `Listed item with id: ${id}`);
  }
);

router.post("/", authenticate, validate({ body: ItemCreateSchema }),
  async (req: AuthenticatedRequest, res) => {
    const data = req.body;
    const userId = req.user!.id;
    const items = await ItemRepository.createSingle(userId, data);
    if (items.isErr) return handleErrorResp(500, res, items.error.message);
    return handleOkResp(
      items.value,
      res,
      `Created item with id: ${items.value.id}`
    );
});

router.put(
  "/:id",
  authenticate,
  validate({ body: ItemUpdateSchema, params: ParamsWithIdSchema }),
  async (req: AuthenticatedRequest, res) => {
    try {
      const data = req.body;
      const itemId = req.params.id;
      const items = await ItemRepository.updateSingle(itemId, req.user!.id, data);
      if (items.isErr) return handleErrorResp(500, res, items.error.message);
      return handleOkResp(items.value, res, `Updated item with id: ${req.user!.id}`);
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
    const items = await ItemRepository.deleteSingle(id);
    if (items.isErr) return handleErrorResp(500, res, items.error.message);
    return handleOkResp(items.value, res, `Deleted item with id: ${id}`);
  }
);

    
export default router;
