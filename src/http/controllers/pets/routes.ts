import { Router } from "express";

import { register } from "./register";
import { listAll } from './listAll';

const router = Router();

router.post("/", register);
router.get("/:city", listAll);

export { router };

