import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { ClientError } from "../errors/client-error"
import { sendTripConfirmationEmail } from "../lib/emailUtil"
import { prisma } from "../lib/prisma"

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email()),
        }),
      },
    },
    async (request) => {
      const {
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite,
      } = request.body

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new ClientError("Invalid trip start date.")
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new ClientError("Invalid trip end date.")
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
            createMany: {
              data: [
                {
                  name: owner_name,
                  email: owner_email,
                  is_owner: true,
                },
                ...emails_to_invite.map((email) => ({
                  name: email,
                  email,
                  is_owner: false,
                })),
              ],
            },
          },
        },
      })

      await sendTripConfirmationEmail(
        owner_name,
        owner_email,
        trip.id,
        destination,
        starts_at,
        ends_at
      )

      return { tripID: trip.id }
    }
  )
}
