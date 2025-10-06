import { IType } from "../../../interfaces";

export const googleTypes: IType[] = [
  {
    name: "streaming",
    description: "streaming",
    id: "1",
  },
  {
    name: "enhanced",
    description: "enhanced",
    id: "2",
  },
  {
    name: "embeddings",
    description: "embeddings",
    id: "3",
  },
];

export const GOOGLE_MODELS: string[] = [
  "gemini-2.0-flash-001",
  "gemini-2.0-flash-002",
  "gemini-2.0-flash-003",
  "gemini-2.0-flash-004",
  "gemini-2.0-flash-005",
  "gemini-2.0-flash-006",
  "text-embedding-004",
];

export const GOOGLE_MODELS_EMBEDDINGS: string[] = ["text-embedding-004"];

export const REVENIUM_METERING_BASE_URL: string = "https://api.revenium/meter";
export const REVENIUM_METERING_API_KEY_MESSAGE: string =
  "Metering api key is required";
export const REVENIUM_METERING_BASE_URL_MESSAGE: string =
  "Metering base url is required";
export const GOOGLE_API_KEY_MESSAGE: string = "Google api key is required";
export const GOOGLE_MISSING_REQUIRED_PARAMS_MESSAGE: string =
  "Missing required parameters";
export const GOOGLE_MODEL_NOT_SUPPORTED_MESSAGE: string = "Model not supported";
export const GOOGLE_IS_REQUIRED_MODEL_AND_QUESTION_MESSAGE: string =
  "Is required question and model";
