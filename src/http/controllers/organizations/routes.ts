import { Router } from "express";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { list } from "./list";

const router = Router();

router.get("/", list);
router.post("/register", create);
router.post("/session", authenticate);

export { router };