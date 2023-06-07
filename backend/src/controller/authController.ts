import { Router } from "express";
import { UserRepository } from "../repository";
import { handleErrorResp, handleOkResp } from "../utils";
import { AuthenticatedRequest, authenticate } from "../utils/middleware/authenticate";

const router = Router();

router.get("/", authenticate, async (req: AuthenticatedRequest, res) => {
    const user = await UserRepository.getSingle(req.user!.id);
    if(!user){
        return handleErrorResp(404, res, "User not found");
    }
    return handleOkResp(user, res, `User is found with id: ${req.user!.id}`);
});

  export default router;