import z from "zod";

export const LoginRequest = z.object({
  username: z.string({ required_error: "Property `username` is required" }).nonempty(),
  password: z.string({ required_error: "Property `password` is required" }).nonempty(),
})

export type LoginRequest = z.infer<typeof LoginRequest>;