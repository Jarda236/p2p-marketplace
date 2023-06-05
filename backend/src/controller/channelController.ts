import { Router } from "express";
import { ChannelCreateSchema, ParamsWithIdSchema } from "../models";
import { ChannelRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { validate } from "../utils/middleware/validate";

const router = Router();

router.get("/", async (_, res) => {
  const channels = await ChannelRepository.getAll();
  if (channels.isErr) return handleErrorResp(500, res, channels.error.message);

  return handleOkResp(
    channels.value,
    res,
    `Listed ${channels.value.length} channels`
  );
});

router.get(
  "/:id",
  validate({ params: ParamsWithIdSchema }),
  async (req, res) => {
    const { id } = req.params;
    const channel = await ChannelRepository.getSingle(id);
    if (channel.isErr) return handleErrorResp(500, res, channel.error.message);
    return handleOkResp(channel.value, res, `Listed channel with id: ${id}`);
  }
);

router.post("/", validate({ body: ChannelCreateSchema }), async (req, res) => {
  const data = req.body;
  // TODO: Auth
  const channel = await ChannelRepository.createSingle(data);
  if (channel.isErr) return handleErrorResp(500, res, channel.error.message);

  return handleOkResp(
    channel.value,
    res,
    `Created channel with id: ${channel.value?.id}`
  );
});

export default router;
