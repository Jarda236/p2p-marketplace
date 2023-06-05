import { Router } from "express";
import { EmojiCreateSchema, EmojiUpdateSchema } from "../models";
import { EmojiRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { ParamsWithIdSchema } from "../models/baseModels";
import { validate } from "../utils/middleware/validate";
import z from "zod";

const router = Router();

router.get("/", async (_, res) => {
  const emojis = await EmojiRepository.getAll();
  if (emojis.isErr) return handleErrorResp(500, res, emojis.error.message);

  return handleOkResp(
    emojis.value,
    res,
    `Listed ${emojis.value.length} emojis`
  );
});

router.get(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const emoji = await EmojiRepository.getSingle(id);
    if (emoji.isErr) return handleErrorResp(500, res, emoji.error.message);
    return handleOkResp(emoji.value, res, `Listed emoji with id: ${id}`);
  }
);

router.post(
  "/",

  validate({ body: EmojiCreateSchema }),
  async (req, res) => {
    const data = req.body;
    const emoji = await EmojiRepository.createSingle(data);
    if (emoji.isErr) return handleErrorResp(500, res, emoji.error.message);
    return handleOkResp(
      emoji.value,
      res,
      `Created emoji with id: ${emoji.value.id}`
    );
  }
);

router.put(
  "/:id",
  validate({ params: ParamsWithIdSchema, body: EmojiUpdateSchema }),
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const emoji = await EmojiRepository.updateSingle(id, data);
    if (emoji.isErr) return handleErrorResp(500, res, emoji.error.message);
    return handleOkResp(emoji.value, res, `Updated emoji with id: ${id}`);
  }
);

router.delete(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const emoji = await EmojiRepository.deleteSingle(id);
      if (emoji.isErr) return handleErrorResp(500, res, emoji.error.message);
      return handleOkResp(emoji.value, res, `Deleted emoji with id: ${id}`);
    } catch (error) {
      if (error instanceof z.ZodError)
        return handleErrorResp(400, res, error.message);
      return handleErrorResp(500, res, `Unknown error ${error}`);
    }
  }
);

export default router;
