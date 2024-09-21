// emailUtils.ts
import dayjs from "dayjs"
import { env } from "process"
import { getMailClient } from "./mail"

export async function sendTripInvitationEmail(
  participantEmail: string,
  trip: any,
  participantId: string
) {
  const formattedStartsAt = dayjs(trip.starts_at).format("LL")
  const formattedEndsAt = dayjs(trip.ends_at).format("LL")
  const confirmationLink = `${env.API_BASE_URL}/participants/${participantId}/confirm`

  const mail = await getMailClient()
  await mail.sendMail({
    from: {
      name: "plann.er Team",
      address: "oi@plann.er",
    },
    to: participantEmail,
    subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartsAt}`,
    html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
        <p>You have been invited to participate in a trip to <strong>${trip.destination}</strong> on the dates <strong>${formattedStartsAt}</strong> to <strong>${formattedEndsAt}</strong>.</p>
        <p>To confirm your presence on the trip, click on the link below:</p> <br />
        <p> <a href="${confirmationLink}">Confirm attendance</a> </p> <br/> 
        <p>If you don't know what this email is about, just ignore this email.</p>
      </div>
    `.trim(),
  })
}

export async function sendTripConfirmationEmail(
  ownerName: string,
  ownerEmail: string,
  tripId: string,
  destination: string,
  startsAt: Date,
  endsAt: Date
) {
  const formattedStartsAt = dayjs(startsAt).format("LL")
  const formattedEndsAt = dayjs(endsAt).format("LL")
  const confirmationLink = `${env.API_BASE_URL}/trips/${tripId}/confirm`

  const mail = await getMailClient()
  await mail.sendMail({
    from: {
      name: "plann.er Team",
      address: "team@plann.er",
    },
    to: {
      name: ownerName,
      address: ownerEmail,
    },
    subject: `Please confirm your trip to ${destination} in ${formattedStartsAt}`,
    html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6">
        <p>You have been invited to participate in a trip to <strong>${destination}</strong> on the dates from <strong>${formattedStartsAt}</strong> to <strong>${formattedEndsAt}</strong>.</p> <br /> 
        <p>To confirm your presence on the trip, click on the link below:</p> <br />
        <p><a href="${confirmationLink}">Confirm attendance</a></p> <br/> 
        <p>If you don't know what this email is about, just ignore this email.</p>
      </div>
    `.trim(),
  })
}
