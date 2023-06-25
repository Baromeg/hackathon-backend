import { OpenAI } from "langchain/llms/openai";
import { constructPrompt } from "./constants";

class LangChainService {
  private _model: OpenAI;

  constructor() {
    this._model = new OpenAI({
      temperature: 0.6,
      openAIApiKey: process.env.OPEN_API_KEY!,
      maxTokens: 1500,
    });
  }

  get model() {
    return this._model;
  }

  public async prompt(
    subject: string,
    context: string,
    level: string,
    method: string
  ): Promise<string> {
    const constructedPrompt = constructPrompt(subject, context, level, method);
    const response = this._model.call(constructedPrompt);
    return response;
  }
}

export default new LangChainService();
