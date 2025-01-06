import fp from "fastify-plugin";

import { registerInstrumentations } from '@opentelemetry/instrumentation';
//import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
//import { trace } from '@opentelemetry/api';

//import { NodeSDK } from '@opentelemetry/sdk-node';
//import { SpanExporter, Span } from '@opentelemetry/sdk-trace-base';
// , ExportResult
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
//import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
//import {  PeriodicExportingMetricReader,  ConsoleMetricExporter,} from '@opentelemetry/sdk-metrics';
//import * as opentelemetry from '@opentelemetry/api';
//import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
//import { Resource } from '@opentelemetry/resources';
//import {  ATTR_SERVICE_NAME,  ATTR_SERVICE_VERSION,} from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
//import { wrapTracer } from '@opentelemetry/api/experimental';


//import { metrics } from "@opentelemetry/api";
import {	getNodeAutoInstrumentations,} from "@opentelemetry/auto-instrumentations-node";
//import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
//import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
//import { B3InjectEncoding, B3Propagator } from "@opentelemetry/propagator-b3";
import { Resource } from "@opentelemetry/resources";
import {	ATTR_SERVICE_NAME,	ATTR_SERVICE_VERSION,} from "@opentelemetry/semantic-conventions";
//import { setupNodeMetrics } from "@sesamecare-oss/opentelemetry-node-metrics";
import { createSdk } from "../config/tracing-config.js";
// from nestjs-fastify-prisma-otel-boilerplate/src/lib/metrics.ts

//Specify zipkin url. default url is http://localhost:9411/api/v2/spans
// docker run -d -p 9411:9411 openzipkin/zipkin
const zipkinUrl = 'http://localhost';
const zipkinPort = '9411';
const zipkinPath = '/api/v2/spans';
const zipkinURL = `${zipkinUrl}:${zipkinPort}${zipkinPath}`;

const options = {
    headers: {
	'module': 'mainai16z',
    },
    url: zipkinURL,
    serviceName: 'ai16z',

    // optional interceptor
    getExportRequestHeaders: () => {
	return {
            'module': 'mainai16z',
	}
    }
}
const traceExporter_zipkin = new ZipkinExporter(options);
const traceExporter = new ConsoleSpanExporter();

//const resource = new Resource({	[ATTR_SERVICE_NAME]: "introspector",	[ATTR_SERVICE_VERSION]: "0.0.1",});

import { NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
const txz=new SimpleSpanProcessor(traceExporter_zipkin);
const tx=new SimpleSpanProcessor(traceExporter);
//const tx2=new SimpleSpanProcessor(myExporter);


const serviceName = 'eliza-agent';
const provider = new NodeTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
    [ATTR_SERVICE_VERSION]: '1.0',    }),
  spanProcessors: [
    txz,
    tx
    //	tx2
  ]
});

// Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
provider.register();

registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HttpInstrumentation(),
  ],
});

//const log = import ('pino')({ level: 'info' })
//import {pino, type Logger} from 'pino'

console.log("setup tracing!")

//pino
//} catch(error){
  //elizaLogger.log("ERROR",error)
//}

// wrapper
//const tracer = wrapTracer(opentelemetry.trace.getTracer('ai16z-agent'))


export default fp//<OpenTelemetryPluginOptions>
(
  async (fastify, _opts) => {
    createSdk(fastify);
    //fastify.register(openTelemetryPlugin,{wrapRoutes: true});
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
