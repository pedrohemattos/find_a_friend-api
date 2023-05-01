import { Router } from "express";

import { create } from "./create";
import { listAll } from './listAll';

const router = Router();

router.post("/", create);
router.get("/", listAll);

export { router };

