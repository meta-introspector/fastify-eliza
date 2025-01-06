// taken from https://github.com/nikesh-ag/fastify-graphql-ts-observ-template.git
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";

import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";

import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";

// import { loadConfig } from "../plugins/config";
import { FastifyInstance } from "fastify";

// loadConfig();

export const createSdk = (fastify: FastifyInstance): void => {
  console.log("fastify.config",fastify.config);
  const sdk = new NodeTracerProvider({
    resource: new Resource({
      [ATTR_SERVICE_NAME]:"eliza",
      [ATTR_SERVICE_VERSION]:      "0.0.1",
    }),
  });

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation({
        requestHook: (span, req) => {
          span.setAttribute("attr_key", "attr_value");
        },
      }),
      new GraphQLInstrumentation({
        depth: 3,
      }),
    ],
  });

  const zipkinUrl = 'http://localhost';
const zipkinPort = '9411';
const zipkinPath = '/api/v2/spans';
const zipkinURL = `${zipkinUrl}:${zipkinPort}${zipkinPath}`;

  //  if (fastify.config.ZIPKIN_EXPORTER === "true") {
    sdk.addSpanProcessor(
      new SimpleSpanProcessor(
        new ZipkinExporter({
          serviceName: "eliza-server",
          url: zipkinURL,
        })
      )
    );


  //  if (fastify.config.CONSOLE_EXPORTER === "true") {
    sdk.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  //}

  sdk.register();

  //   sdk.register({
  //     contextManager: new AsyncHooksContextManager().enable(),
  //     propagator: new HttpTraceContextPropagator(),
  //   })
};
