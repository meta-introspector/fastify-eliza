// taken from https://github.com/nikesh-ag/fastify-graphql-ts-observ-template.git
import fp from "fastify-plugin";
import openTelemetryPlugin, {
  OpenTelemetryPluginOptions,
} from "@autotelic/fastify-opentelemetry";
import { createSdk } from "../config/tracing-config.js";

//import { createSdk } from "../config/tracing-config.ts";

export default fp<OpenTelemetryPluginOptions>(
  async (fastify, _opts) => {
    createSdk(fastify);
    fastify.register(openTelemetryPlugin,{wrapRoutes: true});
  });
    
      //formatSpanName: (request:any) => `${request.url} - ${request.method}`,
      //}
    //);
    //},
    /*
    {
    name: "tracingPlugin",
    fastify: "3.x",
    dependencies: [],
    decorators: { fastify: ["config"] },
    }*/
//);
