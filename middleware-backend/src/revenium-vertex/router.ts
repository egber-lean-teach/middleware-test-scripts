import { Router } from "express";
import { vertexController as VertexController } from "./vertex.controller";

export const routerVertex: Router = Router();
routerVertex.post("/streams", VertexController.streaming);
routerVertex.post("/basics", VertexController.basic);
routerVertex.post("/embeddings", VertexController.embeddings);
routerVertex.post("/enhanced", VertexController.enhanced);
