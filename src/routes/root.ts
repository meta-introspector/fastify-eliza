import { FastifyPluginAsync } from 'fastify'

// const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
//   fastify.get('/', async function (request, reply) {
//     return { root: true }
//   })
// }

//import Fastify from "fastify";
//import fastifyCors from "fastify-cors";
//import fastifyMultipart from "fastify-multipart";
//import { elizaLogger, stringToUuid, composeContext, generateMessageResponse, ModelClass, Content, Memory } from "@elizaos/core";
//import { createApiRouter } from "./api";
//import * as fs from "fs";
//import * as path from "path";

import { FastifyPluginAsync
    //, FastifyRequest 
    } from "fastify"

const directClient: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

          fastify.post("/:agentId/message", 
            {           
                schema: {
                    file : {
                        type:"object"
                    },
                    body: {
                        type: "object",
                        properties : {
                            userName: { type:"string"}
                        }
                    },
                    params: {
                        type: 'object',
                        properties: {
                            agentId: { type: 'string' }
                        },
                        required: ['agentId']
                    }
                }
             } ,async (req , reply) => {
            const agentId = "" ; //req.params.agentId;
            const roomId = ""; //stringToUuid(req.body.roomId ?? "default-room-" + agentId);
            const userId = ""; //stringToUuid(req.body.userId ?? "user");

            let runtime = undefined;
            //let runtime = this.agents.get(agentId);

            // if runtime is null, look for runtime with the same name
            if (!runtime) {
               // runtime = Array.from(this.agents.values()).find(
                    //(a) => a.character.name.toLowerCase() === agentId.toLowerCase()
                //);
            }

            if (!runtime) {
                reply.status(404).send("Agent not found");
                return;
            }

            /* await runtime.ensureConnection(
                userId,
                roomId,
                "",//req.body.userName,
               "",// req.body.name,
                "direct"
            ); */

            const text = ""//req.body.text;
            const messageId = stringToUuid(Date.now().toString());

            /* const attachments: Media[] = [];
            if (req.file) {
                const filePath = path.join(uploadDir, req.file.filename);
                attachments.push({
                    id: Date.now().toString(),
                    url: filePath,
                    title: req.file.originalname,
                    source: "direct",
                    description: `Uploaded file: ${req.file.originalname}`,
                    text: "",
                    contentType: req.file.mimetype,
                });
            } */

            /* const content: Content = {
                text,
                attachments,
                source: "direct",
                inReplyTo: undefined,
            }; */

            /* const userMessage = {
                content,
                userId,
                roomId,
                agentId: runtime.agentId,
            };

            const memory: Memory = {
                id: stringToUuid(messageId + "-" + userId),
                ...userMessage,
                agentId: runtime.agentId,
                userId,
                roomId,
                content,
                createdAt: Date.now(),
            };

            await runtime.messageManager.addEmbeddingToMemory(memory);
            await runtime.messageManager.createMemory(memory);

            let state = await runtime.composeState(userMessage, {
                agentName: runtime.character.name,
            });

            const context = composeContext({
                state,
                template: messageHandlerTemplate,
            });

            const response = await generateMessageResponse({
                runtime: runtime,
                context,
                modelClass: ModelClass.LARGE,
            });

            if (!response) {
                reply.status(500).send("No response from generateMessageResponse");
                return;
            }

            // save response to memory
            const responseMessage: Memory = {
                id: stringToUuid(messageId + "-" + runtime.agentId),
                ...userMessage,
                userId: runtime.agentId,
                content: response,
                embedding: getEmbeddingZeroVector(),
                createdAt: Date.now(),
            };

            await runtime.messageManager.createMemory(responseMessage);

            state = await runtime.updateRecentMessageState(state);

            let message = null as Content | null;

            await runtime.processActions(
                memory,
                [responseMessage],
                state,
                async (newMessages: Content | null) => {
                    message = newMessages;
                    return [memory];
                }
            );

            await runtime.evaluate(memory, state);

            // Check if we should suppress the initial message
            //const action = runtime.actions.find(
            //    (a) => a.name === response.action
            //);
            const shouldSuppressInitialMessage = false;//action?.suppressInitialMessage;

            if (!shouldSuppressInitialMessage) {
                if (message) {
                    reply.send([response, message]);
                } else {
                    reply.send([response]);
                }
            } else {
                if (message) {
                    reply.send([message]);
                } else {
                    reply.send([]);
                }
            } */
        });
}

export default directClient;
//   fastify.get('/', async function (request, reply) {
//     return 'this is an example'
//   })

//   fastify.post(
//     "/:agentId/message",
//     //upload.single("file"),
//     async (req, res) => {
//                 const agentId = req?.params?["agentId"]
//                 const roomId = stringToUuid(
//                     req.body.roomId ?? "default-room-" + agentId
//                 );
//                 req
//                 const userId = stringToUuid(req.body.userId ?? "user");

//                 let runtime = this.agents.get(agentId);

//                 // if runtime is null, look for runtime with the same name
//                 if (!runtime) {
//                     runtime = Array.from(this.agents.values()).find(
//                         (a) =>
//                             a.character.name.toLowerCase() ===
//                             agentId.toLowerCase()
//                     );
//                 }

//                 if (!runtime) {
//                     res.status(404).send("Agent not found");
//                     return;
//                 }

//                 await runtime.ensureConnection(
//                     userId,
//                     roomId,
//                     req.body.userName,
//                     req.body.name,
//                     "direct"
//                 );

//                 const text = req.body.text;
//                 const messageId = stringToUuid(Date.now().toString());

//                 const attachments: Media[] = [];
//                 if (req.file) {
//                     const filePath = path.join(
//                         process.cwd(),
//                         "data",
//                         "uploads",
//                         req.file.filename
//                     );
//                     attachments.push({
//                         id: Date.now().toString(),
//                         url: filePath,
//                         title: req.file.originalname,
//                         source: "direct",
//                         description: `Uploaded file: ${req.file.originalname}`,
//                         text: "",
//                         contentType: req.file.mimetype,
//                     });
//                 }

//                 const content: Content = {
//                     text,
//                     attachments,
//                     source: "direct",
//                     inReplyTo: undefined,
//                 };

//                 const userMessage = {
//                     content,
//                     userId,
//                     roomId,
//                     agentId: runtime.agentId,
//                 };

//                 const memory: Memory = {
//                     id: stringToUuid(messageId + "-" + userId),
//                     ...userMessage,
//                     agentId: runtime.agentId,
//                     userId,
//                     roomId,
//                     content,
//                     createdAt: Date.now(),
//                 };

//                 await runtime.messageManager.addEmbeddingToMemory(memory);
//                 await runtime.messageManager.createMemory(memory);

//                 let state = await runtime.composeState(userMessage, {
//                     agentName: runtime.character.name,
//                 });

//                 const context = composeContext({
//                     state,
//                     template: messageHandlerTemplate,
//                 });

//                 const response = await generateMessageResponse({
//                     runtime: runtime,
//                     context,
//                     modelClass: ModelClass.LARGE,
//                 });

//                 if (!response) {
//                     res.status(500).send(
//                         "No response from generateMessageResponse"
//                     );
//                     return;
//                 }

//                 // save response to memory
//                 const responseMessage: Memory = {
//                     id: stringToUuid(messageId + "-" + runtime.agentId),
//                     ...userMessage,
//                     userId: runtime.agentId,
//                     content: response,
//                     embedding: getEmbeddingZeroVector(),
//                     createdAt: Date.now(),
//                 };

//                 await runtime.messageManager.createMemory(responseMessage);

//                 state = await runtime.updateRecentMessageState(state);

//                 let message = null as Content | null;

//                 await runtime.processActions(
//                     memory,
//                     [responseMessage],
//                     state,
//                     async (newMessages) => {
//                         message = newMessages;
//                         return [memory];
//                     }
//                 );

//                 await runtime.evaluate(memory, state);

//                 // Check if we should suppress the initial message
//                 const action = runtime.actions.find(
//                     (a) => a.name === response.action
//                 );
//                 const shouldSuppressInitialMessage =
//                     action?.suppressInitialMessage;

//                 if (!shouldSuppressInitialMessage) {
//                     if (message) {
//                         res.json([response, message]);
//                     } else {
//                         res.json([response]);
//                     }
//                 } else {
//                     if (message) {
//                         res.json([message]);
//                     } else {
//                         res.json([]);
//                     }
//                 }
//             }
//         );

//   // from cloud-deployment-eliza/packages/client-direct/src/index.ts
//}

// export default example;
// function stringToUuid(arg0: any) {
//     throw new Error("Function not implemented.");
// }


// const fastify = Fastify();

// //fastify.register(fastifyCors);
// //fastify.register(fastifyMultipart);

// const uploadDir = path.join(process.cwd(), "data", "uploads");

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

const messageCompletionFooter = "FIXME"
const messageHandlerTemplate = `# Action Examples
{{actionExamples}}
(Action examples are for reference only. Do not use the information from them in your response.)

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachm[...]

{{messageDirections}}

{{recentMessages}}

{{actions}}

# Instructions: Write the next message for {{agentName}}.
` + messageCompletionFooter;
class AgentCharacter {

    name: String = "noname"
}
class Content {}
class Memory {}
class Media {}
class AgentRuntime {
    composeState(userMessage: { content: Content; userId: string; roomId: string; agentId: any; }, arg1: { agentName: String; }) {
        throw new Error("Method not implemented.");
    }
    updateRecentMessageState(state: any): any {
        throw new Error("Method not implemented.");
    }
    processActions(memory: Memory, arg1: Memory[], state: any, arg3: (newMessages: any) => Promise<Memory[]>) {
        throw new Error("Method not implemented.");
    }
    evaluate(memory: Memory, state: any) {
        throw new Error("Method not implemented.");
    }
    character: AgentCharacter = new AgentCharacter;
    agentId: any;
    messageManager: any;
    actions: any;
    ensureConnection(  userId:string,        roomId:string, userName:string,  name:string, connection:string) {
        return undefined
    }
}
/*
class Logger {
    error(err: Error) {
        throw new Error("Method not implemented.");
    }
    success(arg0: string) {
        throw new Error("Method not implemented.");
    }
    log(arg0: string) {
        throw new Error("Method not implemented.");
    }

}*/
//const elizaLogger = new Logger()

class ModelClass {
    static LARGE: any;
}

// export class DirectClient {
//     public app = fastify;
//     private agents: Map<string, AgentRuntime>; // container management
//     private server: any; // Store server instance
//     //public startAgent: Function; // Store startAgent functor

//     constructor() {
//         elizaLogger.log("DirectClient constructor");
//         this.agents = new Map();

//         //this.app.register(createApiRouter(this.agents, this));


//     // agent/src/index.ts:startAgent calls this
//     public registerAgent(runtime: AgentRuntime) {
//         this.agents.set(runtime.agentId, runtime);
//     }

//     public unregisterAgent(runtime: AgentRuntime) {
//         this.agents.delete(runtime.agentId);
//     }

//     public start(port: number) {
//         this.server = this.app.listen(port, (err, address) => {
//             if (err) {
//                 elizaLogger.error(err);
//                 process.exit(1);
//             }
//             elizaLogger.success(`REST API bound to ${address}. If running locally, access it at http://localhost:${port}.`);
//         });

//         // Handle graceful shutdown
//         const gracefulShutdown = () => {
//             elizaLogger.log("Received shutdown signal, closing server...");
//             this.server.close(() => {
//                 elizaLogger.success("Server closed successfully");
//                 process.exit(0);
//             });

//             // Force close after 5 seconds if server hasn't closed
//             setTimeout(() => {
//                 elizaLogger.error("Could not close connections in time, forcefully shutting down");
//                 process.exit(1);
//             }, 5000);
//         };

//         // Handle different shutdown signals
//         process.on("SIGTERM", gracefulShutdown);
//         process.on("SIGINT", gracefulShutdown);
//     }

//     public stop() {
//         if (this.server) {
//             this.server.close(() => {
//                 elizaLogger.success("Server stopped");
//             });
//         }
//     }
// }
// interface IAgentRuntime {}
// export const DirectClientInterface: Client = {
//     start: async (_runtime: IAgentRuntime) => {
//         elizaLogger.log("DirectClientInterface start");
//         const client = new DirectClient();
//         const serverPort = parseInt(settings.SERVER_PORT || "3000");
//         client.start(serverPort);
//         return client;
//     },
//     stop: async (_runtime: IAgentRuntime, client?: Client) => {
//         if (client instanceof DirectClient) {
//             client.stop();
//         }
//     },
// };

// export default DirectClientInterface;

function stringToUuid(arg0: string) {
    throw new Error("Function not implemented.");
}

function composeContext(arg0: { state: any; template: string; }) {
    throw new Error("Function not implemented.");
}

function generateMessageResponse(arg0: { runtime: AgentRuntime; context: any; modelClass: any; }) {
    throw new Error("Function not implemented.");
}

function getEmbeddingZeroVector() {
    throw new Error("Function not implemented.");
}


export default directClient;
