import z from "zod";
import { BaseModelSchema } from "./baseModels";

export const Channel = z.object({
  name: z.string({ required_error: "Property `name` is required" }).nonempty(),
  description: z.string().nullable().optional(),
}).merge(BaseModelSchema);

export type Channel = z.infer<typeof Channel>;


export const ChannelCreateSchema = z.object({
  name: z.string({ required_error: "Property `name` is required" }).nonempty(),
  description: z.string().nullable().optional(),
});

export type ChannelCreate = z.infer<typeof ChannelCreateSchema>;
