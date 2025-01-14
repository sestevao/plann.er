import z from "zod"

const envSchema = z.object({
  API_BASE_URL: z.string(),
  DATABASE_URL: z.string(),
  WEB_BASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
