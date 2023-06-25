import { OpenAI } from "langchain/llms/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { constructPrompt, getAWikipidiaPageURL } from "./constants";

class LangChainService {
  private _model: OpenAI;
  private _conversation: ConversationChain;
  private _memory: BufferMemory;
  private _withinScope: string = "";
  private _graph_data: Array<any>;

  get model() {
    return this._model;
  }

  get Conversation(): ConversationChain {
    return this._conversation;
  }

  get graphData() {
    return this._graph_data;
  }

  set graphData(object) {
    this._graph_data = object;
  }

  public pushToSequence(newSubjectGraph) {
    this._graph_data.push(newSubjectGraph);
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
    this._withinScope = "";
    this._graph_data = new Array();
  }

  public async prompt(
    subject: string,
    context: string,
    level: string,
    method: string
  ): Promise<string> {
    const constructedPrompt = constructPrompt(
      subject,
      context,
      level,
      method,
      this._withinScope
    );
    console.log("constructedPrompt", constructedPrompt);
    const response = await this._conversation.call({
      input: constructedPrompt,
    });
    this._withinScope = subject;
    return response.response;
  }
}

export default new LangChainService();
