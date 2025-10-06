import { Request, Response } from "express";
import {
  GOOGLE_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
  GOOGLE_MISSING_REQUIRED_PARAMS_MESSAGE,
  GOOGLE_MODEL_NOT_SUPPORTED_MESSAGE,
  GOOGLE_MODELS,
  GOOGLE_MODELS_EMBEDDINGS,
  googleTypes,
} from "./utils/constants/constants";
import { GoogleService } from "./google.service";
import { verifyParams } from "../utils/verifyParams";
import { RES_HTTP_MESSAGES } from "../utils/constants/httpMessage";
import { logger } from "../models/Logger";
import { Revenium } from "../models/revenium";

export class GoogleController {
  private revenium: Revenium;

  constructor() {
    this.revenium = new Revenium();
    this.revenium.verifyEnv = this.revenium.verifyEnv.bind(this);
    this.revenium.verifyBaseUrl = this.revenium.verifyBaseUrl.bind(this);
  }

  public getAllTypesGoogle = (_: Request, res: Response) => {
    res.status(200).json({
      message: "get All types google",
      status: 200,
      data: googleTypes,
    });
  };

  public streaming = async (req: Request, res: Response) => {
    logger.debug("Processing streaming request");
    this.revenium.verifyEnv(req, res);
    const { question, model, baseUrl } = req.body;
    this.revenium.verifyBaseUrl(baseUrl);

    if (!verifyParams([question, model])) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }
    if (!GOOGLE_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_MODELS,
          },
        ],
      });
      return;
    }
    const googleService = new GoogleService(model);
    try {
      const response = await googleService.createStream(question);
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
            content: "",
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
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }

    if (!GOOGLE_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_MODELS,
          },
        ],
      });
      return;
    }
    const googleService = new GoogleService(model);
    try {
      const response = await googleService.createGenerateContent(question);
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
            content: "",
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
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }

    if (!GOOGLE_MODELS_EMBEDDINGS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_MODELS_EMBEDDINGS,
          },
        ],
      });
      return;
    }

    const googleService = new GoogleService(model);
    try {
      const response = await googleService.createEmbedContent(question);
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
            content: "",
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
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MISSING_REQUIRED_PARAMS_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
          },
        ],
      });
      return;
    }
    if (!GOOGLE_MODELS.includes(model)) {
      res.status(400).json({
        message: `${RES_HTTP_MESSAGES[400]} - ${GOOGLE_MODEL_NOT_SUPPORTED_MESSAGE}`,
        status: 400,
        data: [
          {
            content: GOOGLE_MODELS,
          },
        ],
      });
      return;
    }
    const googleService = new GoogleService(model);
    try {
      const response = await googleService.createEnhancedGenerateContent(
        question
      );
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
            content: "",
          },
        ],
      });
    }
  };
}

export const googleController = new GoogleController();
