import { Router } from "express";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { list } from "./list";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { refresh } from "./refresh";

const router = Router();

router.post("/register", create);
router.post("/session", authenticate);

router.patch("/token/refresh", refresh)

/**Authenticated */
router.get("/", verifyJWT, list);

export { router };