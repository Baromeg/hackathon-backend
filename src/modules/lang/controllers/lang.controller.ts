import { FastifyReply, FastifyRequest } from "fastify";
import LangChainService from "../utils/lang.service";
import { RouteGenericInterfaceLandModel } from "../types/req.interface";

export const langChainEndpoint = async (
  req: FastifyRequest<RouteGenericInterfaceLandModel>,
  rep: FastifyReply
) => {
  const subject = req.body.subject;
  const context = req.body.context;
  const level = req.body.level;
  const method = req.body.method;
  try {
    const response = await LangChainService.prompt(
      subject,
      context,
      level,
      method
    );
    const data = JSON.parse(response);
    rep.status(200).send({ data });
  } catch (err) {
    rep.status(500).send(err);
  }
};
