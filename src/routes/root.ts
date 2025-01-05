import { FastifyPluginAsync    } from "fastify"
const schema = {    schema: {  } };
function handler (req :any , reply:any) {
  reply.status(200).send([{text:"Work in progress"}]);
}
const directClient: FastifyPluginAsync = async (fastify): Promise<void> => {
  //  fastify.post( "/TINE-IntrospectorIsNotEliza/message",schema,handler)
  fastify.post("/:agentId/message", schema, handler);
}
export default directClient;
