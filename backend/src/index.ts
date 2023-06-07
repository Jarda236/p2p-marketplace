import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userController, offerController, itemController, fundsAccountController, counterOfferController } from "./controller";

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(cors());

api.use("/users", userController);
api.use("/offers", offerController);
api.use("/items", itemController);
api.use("/funds", fundsAccountController);
api.use("/counter-offer", counterOfferController);

api.listen(port, () => console.log(`[P-2-P Marketplace] is listening on port ${port}`));
