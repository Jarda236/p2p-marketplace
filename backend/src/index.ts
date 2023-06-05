import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userController, emojiController, channelController, messageController, } from "./controller";

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(cors());

api.use("/users", userController);
api.use("/emojis", emojiController);
api.use("/channels", channelController);
api.use("/messages", messageController);

api.listen(port, () => console.log(`[Start Wars Slack Server] is listening on port ${port}`));
