import {
  RequestHeadersDefault,
  RequestParamsDefault,
  RequestQuerystringDefault,
} from "fastify";
import { ReplyGenericInterface } from "fastify/types/reply";

export interface RequestGenericInterfaceLangModel {
  Body: {
    subject: string;
    level: string;
    method: string;
  };
  Querystring?: RequestQuerystringDefault;
  Params?: RequestParamsDefault;
  Headers?: RequestHeadersDefault;
}

export interface RouteGenericInterfaceLandModel
  extends RequestGenericInterfaceLangModel,
    ReplyGenericInterface {}
