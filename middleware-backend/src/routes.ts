import { Router } from "express";
import { routerGoogle } from "./revenium-google/router";
import { routerPerplexity } from "./revenium-perplexity/router";
import { routerVertex } from "./revenium-vertex/router";
import { routerAll } from "./revenium-all/router";

export const router: Router = Router();
router.use("/google", routerGoogle);
router.use("/perplexity", routerPerplexity);
router.use("/vertex", routerVertex);
router.use("/all", routerAll);
