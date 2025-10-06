import type { IRequest } from "../interfaces/dto/request";
import type { IResponse } from "../interfaces/dto/Response";

export class Service {
  public postRequest = async (
    request: IRequest,
    middleware: string
  ): Promise<IResponse> => {
    const buildGoogle = `${
      middleware.toLowerCase() === "google_v1"
        ? "google/v1"
        : middleware.toLowerCase()
    }`;
    const endpoint: string = `http://localhost:3000/api/revenium/${buildGoogle}/${request.type}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: request.prompt,
        model: request.model,
        baseUrl: request.environment,
      }),
    });
    return response.json();
  };
}

export const service = new Service();
