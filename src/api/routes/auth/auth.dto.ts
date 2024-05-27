import { z } from 'zod'

const registerDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string()
})

const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type registerDtoType = z.infer<typeof registerDto>
type loginDtoType = z.infer<typeof loginDto>

export { registerDto, loginDto, type registerDtoType, type loginDtoType }
