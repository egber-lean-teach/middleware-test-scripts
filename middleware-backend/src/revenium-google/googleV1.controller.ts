import { Request, Response } from "express";
import { Revenium } from "../models/revenium";
import { logger } from "../models/Logger";
import { verifyParams } from "../utils/verifyParams";
import { RES_HTTP_MESSAGES } from "../utils/constants/httpMessage";
import {
  GOOGLE_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE,
  GOOGLE_MISSING_REQUIRED_PARAMS_MESSAGE,
  GOOGLE_MODEL_NOT_SUPPORTED_MESSAGE,
  GOOGLE_MODELS,
} from "./utils/constants/constants";
import { GoogleServiceV1 } from "./googleV1.service";

class GoogleControllerV1 {
  private revenium: Revenium;

  constructor() {
    this.revenium = new Revenium();
    this.revenium.verifyEnv = this.revenium.verifyEnv.bind(this);
  }
  public streaming = async (req: Request, res: Response) => {
    logger.debug("Processing streaming v1 request");
    this.revenium.verifyEnv(req, res);
    const { question, model } = req.body;
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
    const googleService = new GoogleServiceV1();
    try {
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

export const googleControllerV1 = new GoogleControllerV1();
