import { Router } from "express";
import { create } from "./create";

const router = Router();

router.post("/", create);

export { router };