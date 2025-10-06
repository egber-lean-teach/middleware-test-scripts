export interface IResponseEmbedding {
  status: string;
  message: string;
  data: [
    {
      content: IResponseDataEmbedding;
    }
  ];
}

export interface IResponseDataEmbedding {
  response: [];
  length?: number;
}
