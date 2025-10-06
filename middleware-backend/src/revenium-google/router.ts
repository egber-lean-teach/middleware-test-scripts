import { Router } from "express";
import { googleController as GoogleController } from "./google.controller";
import { googleControllerV1 as GoogleControllerV1 } from "./googleV1.controller";

export const routerGoogle: Router = Router();
routerGoogle.get("/types", GoogleController.getAllTypesGoogle);
routerGoogle.post("/streams", GoogleController.streaming);
routerGoogle.post("/basics", GoogleController.basic);
routerGoogle.post("/embeddings", GoogleController.embeddings);
routerGoogle.post("/enhanced", GoogleController.enhanced);
routerGoogle.post("/v1/streams", GoogleControllerV1.streaming);
