import nodemailer from "nodemailer"

export async function getMailClient() {
  // Create a transporter object using the test SMTP transport
  // return nodemailer.createTransport({
  // host: "sandbox.smtp.mailtrap.io",
  // port: 2525,
  // auth: {
  // user: "9b68964d89c76b",
  // pass: "504fd857c63fd9",
  // },
  // })
  const account = await nodemailer.createTestAccount()

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  })
}
