import { OpenAI } from "langchain/llms/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { constructPrompt } from "./constants";

class LangChainService {
  private _model: OpenAI;
  private _conversation: ConversationChain;
  private _memory: BufferMemory;

  get model() {
    return this._model;
  }

  get Conversation(): ConversationChain {
    return this._conversation;
  }

  private createModel(
    modelName: string,
    temperature: number,
    openAIApiKey: string,
    maxTokens: number
  ) {
    this._model = new OpenAI({
      modelName: modelName,
      temperature: temperature,
      openAIApiKey: openAIApiKey,
      maxTokens: maxTokens,
    });
  }

  private createMemory() {
    this._memory = new BufferMemory();
  }

  private createConversation() {
    this._conversation = new ConversationChain({
      llm: this.model,
      memory: this._memory,
    });
  }

  public initNewConversation() {
    this.createModel(
      "gpt-3.5-turbo-16k-0613",
      0.6,
      process.env.OPEN_API_KEY!,
      1500
    );
    this.createMemory();
    this.createConversation();
  }

  public async prompt(
    subject: string,
    context: string,
    level: string,
    method: string
  ): Promise<string> {
    const constructedPrompt = constructPrompt(subject, context, level, method);
    const response = await this._conversation.call({
      input: constructedPrompt,
    });
    return response.response;
  }
}

export default new LangChainService();
