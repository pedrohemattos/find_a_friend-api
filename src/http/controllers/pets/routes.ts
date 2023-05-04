import { Router } from "express";

import { register } from "./register";
import { details } from "./details";
import { search } from './search';
import { filter } from "./filter";

import { verifyJWT } from "../../middlewares/verify-jwt";

const router = Router();

router.get("/cities/:city", search);
router.get("/details/:id", details);
router.get("/filter", filter);

/**Authenticated */
router.post("/", verifyJWT, register);

export { router };

