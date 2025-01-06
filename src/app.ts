import { FastifyPluginAsync } from 'fastify';
import fastifyPrintRoutes from 'fastify-print-routes'
import directClient from './routes/root.js';
import tracing from './plugins/tracing.js';
import config from './plugins/config.js';
//import fastifyEnv from "@fastify/env";

class AppOptions{}

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  void fastify.register(fastifyPrintRoutes)
  void fastify.register(directClient)
  void fastify.register(tracing)
  void fastify.register(config)

    .ready((err) => {
      if (err) console.error(err)
      console.log(fastify.config) // or fastify[options.confKey]
      //console.log(fastify.getEnvs())
      // output: { PORT: 3000 }
  })
};

export default app;
