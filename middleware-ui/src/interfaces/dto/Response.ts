// Base response interface
export interface IResponse {
  status: string;
  message: string;
  data: [
    {
      content: IResponseData | IEmbeddingResponseData;
    }
  ];
}

// Text response data
export interface IResponseData {
  response: string;
  length?: number;
}

// Embedding response data
export interface IEmbeddingResponseData {
  response: IEmbeddingItem[];
  length?: number;
}

export interface IEmbeddingItem {
  values: number[];
  statistics?: {
    truncated: boolean;
    tokenCount: number;
  };
}

// Type guards to check response type
export const isEmbeddingResponse = (
  data: IResponseData | IEmbeddingResponseData
): data is IEmbeddingResponseData => {
  return (
    Array.isArray(data.response) &&
    data.response.length > 0 &&
    typeof data.response[0] === "object" &&
    "values" in data.response[0]
  );
};

export const isTextResponse = (
  data: IResponseData | IEmbeddingResponseData
): data is IResponseData => {
  return typeof data.response === "string";
};
