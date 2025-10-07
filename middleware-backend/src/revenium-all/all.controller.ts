import { Request, Response } from "express";
import { logger } from "../models/Logger";
import { Revenium } from "../models/revenium";
import { RES_HTTP_MESSAGES } from "../utils/constants/httpMessage";
import {
  ALL_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
  ALL_MISSING_REQUIRED_PARAMS_MESSAGE,
  ALL_MODEL_NOT_SUPPORTED_MESSAGE,
  ALL_MODELS,
} from "./utils/constants/constants";
import { verifyParams } from "../utils/verifyParams";
import { AllService } from "./all.service";

class AllController {
  private revenium: Revenium;

  constructor() {
    this.revenium = new Revenium();
    this.revenium.verifyEnv = this.revenium.verifyEnv.bind(this);
    this.revenium.verifyBaseUrl = this.revenium.verifyBaseUrl.bind(this);
  }
  public basic = async (req: Request, res: Response) => {
    logger.debug("Processing basic request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);

    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${ALL_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: ALL_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }

    if (!ALL_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${ALL_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: ALL_MODELS,
          },
        ],
      });
      return;
    }

    const allService = new AllService(model, "sonar-pro", "user", "user");
    try {
      const response = await allService.createGenerateContent(question);
      res.status(200).json({
        message: RES_HTTP_MESSAGES[200],
        status: 200,
        data: [
          {
            content: {
              response,
              length: {
                googleResult: 0,
                vertexResult: 0,
                perplexityResult: 0,
              },
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
            content: "Check All credentials: google, vertex and perplexity",
          },
        ],
      });
    }
  };

  public streaming = async (req: Request, res: Response) => {
    logger.debug("Processing streaming request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);
    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${ALL_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: ALL_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }
    if (!ALL_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${ALL_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: ALL_MODELS,
          },
        ],
      });
      return;
    }
    const allService = new AllService(model, "sonar-pro", "user", "user");
    try {
      const response = await allService.createStream(question);
      res.status(200).json({
        message: RES_HTTP_MESSAGES[200],
        status: 200,
        data: [
          {
            content: {
              response,
              length: {
                googleResult: response.googleResult.length,
                vertexResult: response.vertexResult.length,
                perplexityResult: response.perplexityResult.length,
              },
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
            content: "Check All credentials: google, vertex and perplexity",
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
        message: `${RES_HTTP_MESSAGES[400]} - ${ALL_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: ALL_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }
    if (!ALL_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${ALL_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: ALL_MODELS,
          },
        ],
      });
      return;
    }
    const allService = new AllService(model, "sonar-pro", "user", "user");
    try {
      const response = await allService.createEmbedContent(question);
      res.status(200).json({
        message: RES_HTTP_MESSAGES[200],
        status: 200,
        data: [
          {
            content: {
              response,
              length: {
                googleResult: 0,
                vertexResult: 0,
                perplexityResult: 0,
              },
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
            content: "Check All credentials: google, vertex and perplexity",
          },
        ],
      });
    }
  };
}

export const allController = new AllController();
