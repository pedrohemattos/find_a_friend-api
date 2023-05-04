import { Router } from "express";

import { register } from "./register";
import { details } from "./details";
import { search } from './search';
import { filter } from "./filter";

const router = Router();

router.post("/", register);
router.get("/details/:id", details);
router.get("/cities/:city", search);
router.get("/filter", filter);

export { router };

