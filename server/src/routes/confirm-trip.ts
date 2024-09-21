import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { env } from "process"
import z from "zod"
import { sendTripInvitationEmail } from "../lib/emailUtil"
import { prisma } from "../lib/prisma"
import { ClientError } from "../errors/client-error"

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },

    async (request, reply) => {
      const { tripId } = request.params

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          participants: {
            where: {
              is_owner: true,
            },
          },
        },
      })

      if (!trip) {
        throw new ClientError("Trip not found")
      }

      if (trip.is_confirmed) {
        return reply.redirect(`${process.env.WEB_BASE_URL}/trips/${tripId}`)
      }

      await prisma.trip.update({
        where: {
          id: tripId,
        },
        data: {
          is_confirmed: true,
        },
      })

      await Promise.all(
        trip.participants.map((participant) =>
          sendTripInvitationEmail(participant.email, trip, participant.id)
        )
      )

      return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`)
    }
  )
}
