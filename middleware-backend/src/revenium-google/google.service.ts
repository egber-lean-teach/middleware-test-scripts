import { GoogleAiReveniumMiddleware } from "@revenium/google";

export class GoogleService {
  private client: GoogleAiReveniumMiddleware;
  private model: string;

  constructor(model: string) {
    this.client = new GoogleAiReveniumMiddleware();
    this.model = model;
  }

  public createStream = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel({
      model: this.model ?? "gemini-2.0-flash-001",
    });

    try {
      const result: any = await generativeModel.generateContentStream({
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
        model: this.model ?? "gemini-2.0-flash-001",
      });

      if (!result) throw new Error("No result");
      const asyncIterable = result?.[Symbol.asyncIterator]
        ? result
        : result?.stream;
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

  public createEnhancedGenerateContent = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel({
      model: this.model ?? "gemini-2.0-flash-001",
    });
    try {
      const result = await generativeModel.generateContent(question);
      if (!result) throw new Error("Error to generate content");
      return `${result?.candidates?.[0]?.content?.parts?.[0]?.text?.substring(
        0,
        100
      )}...`;
    } catch (error) {
      throw error;
    }
  };

  public createGenerateContent = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel({
      model: this.model ?? "gemini-2.0-flash-001",
    });
    try {
      const result = await generativeModel.generateContent(question);
      if (!result) throw new Error("Error to generate content");
      console.log("result", result);
      return result?.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      throw error;
    }
  };

  public createEmbedContent = async (question: string) => {
    const generativeModel = this.client.getGenerativeModel({
      model: this.model ?? "text-embedding-004",
    });
    const contents = question.split("?");
    try {
      const result = await generativeModel.embedContent({
        contents,
        model: this.model ?? "text-embedding-004",
      });
      if (!result) throw new Error("Error to generate content");
      return result?.embeddings ?? result?.embeddings?.[0];
    } catch (error) {
      throw error;
    }
  };
}
