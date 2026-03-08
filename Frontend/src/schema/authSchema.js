import { optional, z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateProfileSchema = z.object({
  fullname: z
    .string()
    .optional()
  ,
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .optional()
    .or(z.literal(""))
  ,
  currPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal(""))
  ,
  newPassword: z
    .string()
    .min(6, "New Password must be at least 6 characters")
    .optional()
    .or(z.literal(""))
  ,
  avatar: z
    .any()
    .optional()

}).refine((data) => !data.currPassword ||
  !data.newPassword || data.currPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"]
})