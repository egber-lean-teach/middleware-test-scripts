import { Role } from "../interfaces/role";
import { GoogleService } from "../revenium-google/google.service";
import { PerplexityService } from "../revenium-perplexity/perplexity.service";
import { VertexService } from "../revenium-vertex/vertex.service";

export class AllService {
  private model: string = "";
  private vertexRole: Role = "user";
  private perplexityRole: Role = "user";
  private modelPerplexity: string = "sonar-pro";
  private googleService: GoogleService;
  private vertexService: VertexService;
  private perplexityService: PerplexityService;

  constructor(
    modelGoogle: string,
    modelPerplexity: string,
    vertexRole: Role,
    perplexityRole: Role
  ) {
    this.model = modelGoogle ?? this.model;
    this.vertexRole = vertexRole ?? this.vertexRole;
    this.perplexityRole = perplexityRole ?? this.perplexityRole;
    this.modelPerplexity = modelPerplexity ?? this.modelPerplexity;
    this.googleService = new GoogleService(this.model);
    this.vertexService = new VertexService(this.model, this.vertexRole);
    this.perplexityService = new PerplexityService(
      this.modelPerplexity,
      this.perplexityRole
    );
  }
  public createGenerateContent = async (question: string) => {
    try {
      const googleResult = await this.googleService.createGenerateContent(
        question
      );
      const vertexResult = await this.vertexService.createGenerateContent(
        question
      );
      const perplexityResult = await this.perplexityService.createBasic(
        question
      );
      return {
        googleResult,
        vertexResult,
        perplexityResult,
      };
    } catch (error) {
      throw error;
    }
  };

  public createStream = async (question: string) => {
    try {
      const googleResult = await this.googleService.createStream(question);
      const vertexResult = await this.vertexService.createStream(question);
      const perplexityResult = await this.perplexityService.createStream(
        question
      );
      return {
        googleResult,
        vertexResult,
        perplexityResult,
      };
    } catch (error) {
      throw error;
    }
  };

  public createEmbedContent = async (question: string) => {
    console.log("model", this.model);
    console.log("modelPerplexity", this.modelPerplexity);
    console.log("vertexRole", this.vertexRole);
    console.log("perplexityRole", this.perplexityRole);
    console.log("question", question);
    console.log("googleService", this.googleService);
    console.log("vertexService", this.vertexService);
    try {
      const googleResult = await this.googleService.createEmbedContent(
        question
      );
      const vertexResult = await this.vertexService.createEmbedContent(
        question
      );
      return {
        googleResult,
        vertexResult,
        perplexityResult: {},
      };
    } catch (error) {
      throw error;
    }
  };
}
