import { Router } from "express";
import { allController as AllController } from "./all.controller";

export const routerAll: Router = Router();
routerAll.post("/basics", AllController.basic);
routerAll.post("/streams", AllController.streaming);
routerAll.post("/embeddings", AllController.embeddings);
