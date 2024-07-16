import * as z from 'zod'

export const  userProfileSchema = z.object({
    bio: z.string().optional()
})
