import { Request, Response } from "express";
import { Revenium } from "../models/revenium";
import { logger } from "../models/Logger";
import { RES_HTTP_MESSAGES } from "../utils/constants/httpMessage";
import { PerplexityService } from "./perplexity.service";
import { verifyParams } from "../utils/verifyParams";
import {
  PERPLEXITY_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
  PERPLEXITY_MISSING_REQUIRED_PARAMS_MESSAGE,
  PERPLEXITY_MODEL_NOT_SUPPORTED_MESSAGE,
  PERPLEXITY_MODELS,
} from "./utils/constants/constants";

class PerplexityController {
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
        message: `${RES_HTTP_MESSAGES[400]} - ${PERPLEXITY_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: PERPLEXITY_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }
    if (!PERPLEXITY_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${PERPLEXITY_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: PERPLEXITY_MODELS,
          },
        ],
      });
      return;
    }
    const perplexityService = new PerplexityService(model, "user");
    try {
      const response = await perplexityService.createStream(question);
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
            content: "Check your Perplexity credentials",
          },
        ],
      });
    }
  };

  public basic = async (req: Request, res: Response) => {
    logger.debug("Processing basic request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);
    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${PERPLEXITY_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: PERPLEXITY_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }
    if (!PERPLEXITY_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${PERPLEXITY_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: PERPLEXITY_MODELS,
          },
        ],
      });
      return;
    }
    const perplexityService = new PerplexityService(model, "user");
    try {
      const response = await perplexityService.createBasic(question);
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
            content: "Check your Perplexity credentials",
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
        message: `${RES_HTTP_MESSAGES[400]} - ${PERPLEXITY_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: PERPLEXITY_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }
    if (!PERPLEXITY_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${PERPLEXITY_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: PERPLEXITY_MODELS,
          },
        ],
      });
      return;
    }
    const perplexityService = new PerplexityService(model, "user");
    try {
      const response = await perplexityService.createEnhanced(question);
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
            content: "Check your Perplexity credentials",
          },
        ],
      });
    }
  };
  public metadatas = async (req: Request, res: Response) => {
    logger.debug("Processing metadatas request");
  };
}

export const perplexityController = new PerplexityController();
