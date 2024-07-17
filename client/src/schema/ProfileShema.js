import * as z from "zod";

export const ProfileSchema = z.object({
  bio: z.string().max(500, "Bio should be at most 500 characters long"),
  profilePicture: z.any().optional(),
});
