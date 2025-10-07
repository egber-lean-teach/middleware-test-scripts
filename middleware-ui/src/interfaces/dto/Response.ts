// Base response interface
export interface IResponse {
  status: string;
  message: string;
  data: [
    {
      content: IResponseData | IEmbeddingResponseData | IAllResponseData;
    }
  ];
}

// All middleware response data
export interface IAllResponseData {
  response: {
    googleResult: string;
    vertexResult: string;
    perplexityResult: string;
  };
  length: {
    googleResult: number;
    vertexResult: number;
    perplexityResult: number;
  };
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
  data: IResponseData | IEmbeddingResponseData | IAllResponseData
): data is IEmbeddingResponseData => {
  return (
    Array.isArray((data as IEmbeddingResponseData).response) &&
    (data as IEmbeddingResponseData).response.length > 0 &&
    typeof (data as IEmbeddingResponseData).response[0] === "object" &&
    "values" in (data as IEmbeddingResponseData).response[0]
  );
};

export const isTextResponse = (
  data: IResponseData | IEmbeddingResponseData | IAllResponseData
): data is IResponseData => {
  return typeof (data as IResponseData).response === "string";
};

export const isAllResponse = (
  data: IResponseData | IEmbeddingResponseData | IAllResponseData
): data is IAllResponseData => {
  return (
    typeof data === "object" &&
    data !== null &&
    "response" in data &&
    "length" in data &&
    typeof (data as IAllResponseData).response === "object" &&
    typeof (data as IAllResponseData).length === "object" &&
    "googleResult" in (data as IAllResponseData).response &&
    "vertexResult" in (data as IAllResponseData).response &&
    "perplexityResult" in (data as IAllResponseData).response &&
    typeof (data as IAllResponseData).response.googleResult === "string" &&
    typeof (data as IAllResponseData).response.vertexResult === "string" &&
    typeof (data as IAllResponseData).response.perplexityResult === "string"
  );
};
