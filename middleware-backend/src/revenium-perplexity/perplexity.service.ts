import { PerplexityReveniumMiddleware } from "@revenium/perplexity";
import { Role } from "../interfaces/role";

export class PerplexityService {
  private client: PerplexityReveniumMiddleware;
  private model: string = "sonar-pro";
  private role: Role = "user";

  constructor(model: string, role: Role) {
    this.client = new PerplexityReveniumMiddleware();
    this.model = model ?? this.model;
    this.role = role ?? this.role;
  }

  createStream = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel(this.model);
    try {
      const result = await generativeModel.createChatCompletionStream({
        messages: [
          {
            role: this.role,
            content: question,
          },
        ],
      });
      if (!result) throw new Error("Error to generate content");
      let fullText = "";
      for await (const chunk of result) {
        fullText += chunk.choices[0]?.delta?.content || "";
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
      }
      return fullText;
    } catch (error) {
      throw error;
    }
  };

  createBasic = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel(this.model);
    try {
      const result = await generativeModel.createChatCompletion({
        model: this.model,
        messages: [
          {
            role: this.role,
            content: question,
          },
        ],
      });
      if (!result) throw new Error("Error to generate content");
      return result.choices[0]?.message?.content;
    } catch (error) {
      throw error;
    }
  };

  createEnhanced = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel(this.model);
    try {
      const result = await generativeModel.createChatCompletion({
        model: this.model,
        messages: [
          {
            role: this.role,
            content: question,
          },
        ],
      });
      if (!result) throw new Error("Error to generate content");
      return `${result.choices[0]?.message?.content?.substring(0, 100)}...`;
    } catch (error) {
      throw error;
    }
  };
}
