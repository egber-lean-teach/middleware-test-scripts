import { VertexAIReveniumMiddlewareV2 } from "@revenium/vertex";
import { Role } from "../interfaces/role";

export class VertexService {
  private client: VertexAIReveniumMiddlewareV2;
  private model: string = "";
  private role: Role = "user";

  constructor(model: string, role: Role) {
    this.client = new VertexAIReveniumMiddlewareV2();
    this.model = model;
    this.role = role;
  }

  public createStream = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel(
      this.model ?? "gemini-2.0-flash-001"
    );

    try {
      const result = await generativeModel.generateContentStream({
        model: this.model ?? "gemini-2.0-flash-001",
        contents: [
          {
            role: this.role ?? "user",
            parts: [{ text: question }],
          },
        ],
      });
      if (!result) {
        console.log("No result received from generateContentStream");
        throw new Error("No result received from generateContentStream");
      }
      const asyncIterable = result?.[Symbol.asyncIterator] ? result : result;
      if (!asyncIterable || !asyncIterable[Symbol.asyncIterator]) {
        throw new Error("No async iterable stream found in result");
      }
      let fullText = "";
      for await (const chunk of asyncIterable) {
        const text =
          chunk?.candidates?.[0]?.content?.parts
            ?.map((p: any) => p?.text || "")
            .join("") ?? "";

        if (text) {
          process.stdout.write(text);
          fullText += text;
        }
      }
      return fullText;
    } catch (error) {
      throw error;
    }
  };

  public createGenerateContent = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel(
      this.model ?? "gemini-2.0-flash-001"
    );
    try {
      const result = await generativeModel.generateContent({
        request: question,
        role: this.role ?? "user",
      });
      if (!result) throw new Error("Error to generate content");
      return result?.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      throw error;
    }
  };

  public createEmbedContent = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel(
      this.model ?? "text-embedding-004"
    );
    const contents = question.split("?");
    try {
      const result = await generativeModel.embedContent({
        contents,
      });
      if (!result) throw new Error("Error to generate content");
      console.log("result", result);
      return result?.embeddings ?? result?.embeddings?.[0];
    } catch (error) {
      throw error;
    }
  };

  public createEnhancedGenerateContent = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel(
      this.model ?? "gemini-2.0-flash-001"
    );
    try {
      const result = await generativeModel.generateContent({
        request: question,
        role: this.role ?? "user",
      });
      if (!result) throw new Error("Error to generate content");
      return `${result?.candidates?.[0]?.content?.parts?.[0]?.text?.substring(
        0,
        100
      )}...`;
    } catch (error) {
      throw error;
    }
  };
}
