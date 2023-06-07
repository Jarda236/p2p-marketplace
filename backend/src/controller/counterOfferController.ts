import { Router } from "express";
import { handleErrorResp, handleOkResp } from "../utils";
import { ParamsWithIdSchema } from "../models/baseModels";
import { validate } from "../utils/middleware/validate";
import z from "zod";
import { CounterOfferRepository } from "../repository";
import { CounterOfferCreateSchema, CounterOfferUpdateSchema } from "../models";
import { authenticate } from "../utils/middleware/authenticate";

const router = Router();

router.get("/", async (_, res) => {
  const users = await CounterOfferRepository.getAll();
  if (users.isErr) return handleErrorResp(500, res, users.error.message);

  return handleOkResp(users.value, res, `Listed ${users.value.length} offers`);
});

router.get(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const user = await CounterOfferRepository.getSingle(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Listed offer with id: ${id}`);
  }
);

router.post("/", validate({ body: CounterOfferCreateSchema }), async (req, res) => {
  const data = req.body;
  const user = await CounterOfferRepository.createSingle(data);
  if (user.isErr) return handleErrorResp(500, res, user.error.message);
  return handleOkResp(
    user.value,
    res,
    `Created offer with id: ${user.value.id}`
  );
});

router.put(
  "/:id",
  validate({ params: ParamsWithIdSchema, body: CounterOfferUpdateSchema }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await CounterOfferRepository.updateSingle(id, data);
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
    const user = await CounterOfferRepository.deleteSingle(id);
    if (user.isErr) return handleErrorResp(500, res, user.error.message);
    return handleOkResp(user.value, res, `Deleted offer with id: ${id}`);
  }
);


router.post(
    "/:id/accept", authenticate,  validate({ params: ParamsWithIdSchema }),
    async  (req, res) => {
        const { id } = req.params;
        const counterOffer = await CounterOfferRepository.acceptSingle(id);
        if (counterOffer.isErr) return handleErrorResp(500, res, counterOffer.error.message);
    return handleOkResp(counterOffer.value, res, `Accepted CounterOffer with id: ${id}`);
})

router.post(
    "/:id/decline", authenticate, validate({ params: ParamsWithIdSchema }), async (req, res) => {
    
})

export default router;
