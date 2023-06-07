import { Router } from "express";
import { OfferCreateSchema, OfferUpdateSchema } from "../models/offerModels";
import { OfferRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { ParamsWithIdSchema } from "../models/baseModels";
import { validate } from "../utils/middleware/validate";
import z from "zod";
import { authenticate } from "../utils/middleware/authenticate";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = Router();

router.get("/", async (_, res) => {
  const users = await OfferRepository.getAll();
  if (users.isErr) return handleErrorResp(500, res, users.error.message);

  return handleOkResp(users.value, res, `Listed ${users.value.length} offers`);
});

router.get(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const user = await OfferRepository.getSingle(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Listed offer with id: ${id}`);
  }
);

router.get(
  "/seller/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const user = await OfferRepository.getAllBySellerId(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Listed offer with id: ${id}`);
  }
);

router.get(
  "/buyer/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const user = await OfferRepository.getAllByBuyerId(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Listed offer with id: ${id}`);
  }
);

router.post("/", validate({ body: OfferCreateSchema }), async (req, res) => {
  const data = req.body;
  const user = await OfferRepository.createSingle(data);
  if (user.isErr) return handleErrorResp(500, res, user.error.message);
  return handleOkResp(
    user.value,
    res,
    `Created offer with id: ${user.value.id}`
  );
});

router.post("/:id/buy", authenticate, validate({ body: OfferCreateSchema }), async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;
  const userId = decoded.userId;

  const { id } = req.params; 
  const data = req.body;
  const user = await OfferRepository.buySingle(id, userId, data);
  if (user.isErr) return handleErrorResp(500, res, user.error.message);
  return handleOkResp(
    user.value,
    res,
    `Bought offer with id: ${user.value.id}`
  );
});

router.put(
  "/:id",
  validate({ params: ParamsWithIdSchema, body: OfferUpdateSchema }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await OfferRepository.updateSingle(id, data);
      if (user.isErr) return handleErrorResp(500, res, user.error.message);
      return handleOkResp(user.value, res, `Updated offer with id: ${id}`);
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
    const user = await OfferRepository.deleteSingle(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Deleted offer with id: ${id}`);
  }
);

export default router;
