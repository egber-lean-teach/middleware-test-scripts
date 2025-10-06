export interface IMiddleware {
  name: string;
  description: string;
  key_name: string;
  isSelected: boolean;
  status: string;
}

export const CURRENT_MIDDLEWARES: IMiddleware[] = [
  {
    name: "Google",
    description: "@revenium/google",
    key_name: "google",
    isSelected: true,
    status: "working",
  },

  {
    name: "Vertex",
    description: "@revenium/vertex",
    key_name: "vertex",
    isSelected: false,
    status: "working",
  },
  {
    name: "Perplexity",
    description: "@revenium/perplexity",
    key_name: "perplexity",
    isSelected: false,
    status: "working",
  },
  {
    name: "Google V1",
    description: "@revenium/google",
    key_name: "google_V1",
    isSelected: true,
    status: "no working",
  },
];
