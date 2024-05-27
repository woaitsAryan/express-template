import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  ENVIRONMENT: z.string(),
  DB_DATABASE: z.string(),
  DB_HOST: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_USER: z.string(),
  PORT: z.string().transform(Number),
  JWT_KEY: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
  REDIS_PASSWORD: z.string()
})

type EnvType = z.infer<typeof envSchema>

const getEnvHandler = (): EnvType => {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${parsed.error.message}`
    )
  }
  return parsed.data
}

const envHandler = getEnvHandler()

export default envHandler
