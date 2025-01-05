import { FastifyPluginAsync } from 'fastify';
import fastifyPrintRoutes from 'fastify-print-routes'
import directClient from './routes/root.js';

class AppOptions{}

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  void fastify.register(fastifyPrintRoutes)
  void fastify.register(directClient)
};

export default app;
