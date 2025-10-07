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
    isSelected: false, // This will be calculated dynamically
    status: "active",
  },
  {
    name: "Vertex",
    description: "@revenium/vertex",
    key_name: "vertex",
    isSelected: false, // This will be calculated dynamically
    status: "active",
  },
  {
    name: "Perplexity",
    description: "@revenium/perplexity",
    key_name: "perplexity",
    isSelected: false, // This will be calculated dynamically
    status: "active",
  },
  {
    name: "All",
    description: "@revenium/google, @revenium/vertex, @revenium/perplexity",
    key_name: "all",
    isSelected: false, // This will be calculated dynamically
    status: "active",
  },
  {
    name: "Google V1",
    description: "@revenium/google",
    key_name: "google_V1",
    isSelected: false, // This will be calculated dynamically
    status: "inactive",
  },
];
