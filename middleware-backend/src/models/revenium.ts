import { Request, Response } from "express";
import { EnvManager } from "../utils/envManager";

export class Revenium {
  private apiKey: string = "";
  private envManager: EnvManager;

  constructor() {
    this.envManager = new EnvManager();
  }

  public verifyEnv = (_: Request, res: Response) => {
    const clientApiKey = process.env.GOOGLE_API_KEY;
    const reveniumApiKey = process.env.REVENIUM_METERING_API_KEY;
    const reveniumMeteringBaseUrl = process.env.REVENIUM_METERING_BASE_URL;
    if (!clientApiKey) {
      res.status(400).json({
        message: "Client API Key is not set",
        status: 400,
        data: [],
      });
      return;
    }
    if (!reveniumApiKey) {
      res.status(400).json({
        message: "Revenium API Key is not set",
        status: 400,
        data: [],
      });
      return;
    }
    if (!reveniumMeteringBaseUrl) {
      res.status(400).json({
        message: "Revenium Metering Base URL is not set",
        status: 400,
        data: [],
      });
      return;
    }
    this.apiKey = clientApiKey;
  };

  public verifyBaseUrl = (baseUrl: string) => {
    if (baseUrl) {
      this.envManager.updateEnvVariable("REVENIUM_METERING_BASE_URL", baseUrl);
    } else {
      this.envManager.updateEnvVariable(
        "REVENIUM_METERING_BASE_URL",
        "https://api.revenium/meter"
      );
    }
  };
}
