import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userController, offerController, itemController, fundsAccountController, counterOfferController, imageController } from "./controller";

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(cors());

const apiRouter = express.Router();
api.use("/api", apiRouter);

apiRouter.use("/users", userController);
apiRouter.use("/offers", offerController);
apiRouter.use("/items", itemController);
apiRouter.use("/images", imageController);
apiRouter.use("/funds", fundsAccountController);
apiRouter.use("/counter-offer", counterOfferController);
apiRouter.use("/auth", authController);

api.listen(port, () => console.log(`[P-2-P Marketplace] is listening on port ${port}`));
