import { error } from "console"
import { FastifyInstance } from "fastify"
import { ZodError } from "zod"
import { ClientError } from "./errors/client-error"

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (err, request, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: "Invalid input",
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof ClientError) {
    return reply.code(400).send({ message: error.message })
  }

  reply.code(500).send({ message: "Internal server error" })
}
