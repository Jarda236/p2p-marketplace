import { Router } from "express";
import {
  MessageCreateSchema,
  MessageUpdateSchema,
  MessageToggleReactionSchema,
} from "../models";
import { MessageRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { validate } from "../utils/middleware/validate";

const router = Router();

router.post("/", validate({ body: MessageCreateSchema }), async (req, res) => {
  const data = req.body;
  const userId = req.header('X-User');
  if (!userId) return handleErrorResp(400, res, 'Missing X-User header');

  const messages = await MessageRepository.createSingle(userId, data);
  if (messages.isErr) return handleErrorResp(500, res, messages.error.message);
  return handleOkResp(
    messages.value,
    res,
    `Created message with id: ${messages.value?.id}`
  );
});

router.put("/", validate({ body: MessageUpdateSchema }), async (req, res) => {
  const data = req.body;
  const userId = req.header('X-User');
  if (!userId) return handleErrorResp(400, res, 'Missing X-User header');

  const messages = await MessageRepository.updateSingle(userId, data);
  if (messages.isErr) return handleErrorResp(500, res, messages.error.message);
  return handleOkResp(
    messages.value,
    res,
    `Updated message with id: ${messages.value?.id}`
  );
});

router.post(
  "/toggle-reaction",
  validate({ body: MessageToggleReactionSchema }),
  async (req, res) => {
    const data = req.body;
    const userId = req.header('X-User');
    if (!userId) return handleErrorResp(400, res, 'Missing X-User header');

    const messages = await MessageRepository.toggleReaction(userId, data);
    if (messages.isErr)
      return handleErrorResp(500, res, messages.error.message);

    return handleOkResp(
      messages.value,
      res,
      `Toggled reaction for message with id: ${messages.value?.id}`
    );
  }
);

export default router;
