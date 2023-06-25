import { FastifyReply, FastifyRequest } from "fastify";
import LangChainService from "../utils/lang.service";
import { RouteGenericInterfaceLandModel } from "../types/req.interface";

export const langChainEndpoint = async (
  req: FastifyRequest<RouteGenericInterfaceLandModel>,
  rep: FastifyReply
) => {
  const subject = req.body.subject;
  const context = req.body.context;
  const level = req.body.audience;
  const method = req.body.intent;
  try {
    LangChainService.initNewConversation();
    const response = await LangChainService.prompt(
      subject,
      context,
      level,
      method
    );
    const data = JSON.parse(response);
    LangChainService.pushToSequence(data);
    rep.status(200).send({ ...data });
  } catch (err) {
    rep.status(500).send(err);
  }
};

export const langChainEndpointContinueConversation = async (
  req: FastifyRequest<RouteGenericInterfaceLandModel>,
  rep: FastifyReply
) => {
  const subject = req.body.subject;
  const context = req.body.context;
  const level = req.body.audience;
  const method = req.body.intent;
  if (!LangChainService.model)
    rep.status(404).send({ error: "Conversation is not initiated." });
  try {
    const response = await LangChainService.prompt(
      subject,
      context,
      level,
      method
    );
    const data = JSON.parse(response);
    LangChainService.pushToSequence(data);
    rep.status(200).send({ ...data });
  } catch (err) {
    rep.status(500).send(err);
  }
};

export const langChainEndpointGetGraphData = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  rep.status(200).send(LangChainService.graphData);
};
