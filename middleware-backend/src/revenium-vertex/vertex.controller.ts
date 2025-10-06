import { Request, Response } from "express";
import { logger } from "../models/Logger";
import { Revenium } from "../models/revenium";
import { verifyParams } from "../utils/verifyParams";
import { RES_HTTP_MESSAGES } from "../utils/constants/httpMessage";
import { VertexService } from "../revenium-vertex/vertex.service";
import {
  VERTEX_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
  VERTEX_MISSING_REQUIRED_PARAMS_MESSAGE,
  VERTEX_MODEL_NOT_SUPPORTED_MESSAGE,
  VERTEX_MODELS,
} from "./utils/constants/constants";

class VertexController {
  private revenium: Revenium;

  constructor() {
    this.revenium = new Revenium();
    this.revenium.verifyEnv = this.revenium.verifyEnv.bind(this);
    this.revenium.verifyBaseUrl = this.revenium.verifyBaseUrl.bind(this);
  }
  public streaming = async (req: Request, res: Response) => {
    logger.debug("Processing streaming request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);
    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }

    if (!VERTEX_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_MODELS,
          },
        ],
      });
      return;
    }
    const vertexService = new VertexService(model, "user");
    try {
      const response = await vertexService.createStream(question);
      res.status(200).json({
        message: RES_HTTP_MESSAGES[200],
        status: 200,
        data: [
          {
            content: {
              response,
              length: response.length,
            },
          },
        ],
      });
    } catch (error) {
      res.status(500).json({
        message: RES_HTTP_MESSAGES[500],
        status: 500,
        data: [
          {
            content: "Check your Vertex credentials",
          },
        ],
      });
    }
  };

  public basic = async (req: Request, res: Response) => {
    logger.debug("Processing generate content request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);
    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }

    if (!VERTEX_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_MODELS,
          },
        ],
      });
      return;
    }
    const vertexService = new VertexService(model, "user");
    try {
      const response = await vertexService.createGenerateContent(question);
      res.status(200).json({
        message: RES_HTTP_MESSAGES[200],
        status: 200,
        data: [
          {
            content: {
              response,
              length: response.length,
            },
          },
        ],
      });
    } catch (error) {
      res.status(500).json({
        message: RES_HTTP_MESSAGES[500],
        status: 500,
        data: [
          {
            content: "Check your Vertex credentials",
          },
        ],
      });
    }
  };

  public embeddings = async (req: Request, res: Response) => {
    logger.debug("Processing embeddings request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);
    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }

    if (!VERTEX_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_MODELS,
          },
        ],
      });
      return;
    }
    const vertexService = new VertexService(model, "user");
    try {
      const response = await vertexService.createEmbedContent(question);
      res.status(200).json({
        message: RES_HTTP_MESSAGES[200],
        status: 200,
        data: [
          {
            content: {
              response,
              length: 0,
            },
          },
        ],
      });
    } catch (error) {
      res.status(500).json({
        message: RES_HTTP_MESSAGES[500],
        status: 500,
        data: [
          {
            content: "Check your Vertex credentials",
          },
        ],
      });
    }
  };

  public enhanced = async (req: Request, res: Response) => {
    logger.debug("Processing enhanced request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);
    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }

    if (!VERTEX_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${VERTEX_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: VERTEX_MODELS,
          },
        ],
      });
      return;
    }
    const vertexService = new VertexService(model, "user");

    try {
      const response = await vertexService.createEnhancedGenerateContent(
        question
      );
      res.status(200).json({
        message: RES_HTTP_MESSAGES[200],
        status: 200,
        data: [
          {
            content: {
              response,
              length: response?.length,
            },
          },
        ],
      });
    } catch (error) {
      res.status(500).json({
        message: RES_HTTP_MESSAGES[500],
        status: 500,
        data: [
          {
            content: "Check your Vertex credentials",
          },
        ],
      });
    }
  };
}

export const vertexController = new VertexController();
