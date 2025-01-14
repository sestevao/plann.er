import cors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { env } from "process"

import { confirmParticipant } from "./routes/confirm-participant"
import { confirmTrip } from "./routes/confirm-trip"
import { createActivity } from "./routes/create-activity"
import { createInvite } from "./routes/create-invite"
import { createTrip } from "./routes/create-trip"
import { getActivities } from "./routes/get-activities"
import { getLinks } from "./routes/get-links"
import { getParticipant } from "./routes/get-participant"
import { getParticipants } from "./routes/get-participants"
import { getTripDetails } from "./routes/get-trip-details"
import { updateTrip } from "./routes/update-trip"

const app = fastify()

app.register(cors, {
  origin: "*",
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.listen(
  { port: parseInt(env.PORT || "3333"), host: "localhost" },
  (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log(`Server running at ${address}`)
  }
)
