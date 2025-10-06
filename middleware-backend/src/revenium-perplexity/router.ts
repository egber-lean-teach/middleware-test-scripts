import { Router } from "express";
import { perplexityController as PerplexityController } from "./perplexity.controller";

export const routerPerplexity: Router = Router();
routerPerplexity.post("/streams", PerplexityController.streaming);
routerPerplexity.post("/basics", PerplexityController.basic);
routerPerplexity.post("/enhanced", PerplexityController.enhanced);
routerPerplexity.post("/metadatas", PerplexityController.metadatas);
