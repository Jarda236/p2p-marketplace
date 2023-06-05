import z from "zod";
import { BaseModelSchema, ModelIdSchema } from "./baseModels";

export const Message = z.object({
  content: z.string({ required_error: "Property `content` is required" }).nonempty(),
  channelId: z.string({ required_error: "Property `channelId` is required" }).nonempty(),
  edited: z.boolean().optional(),
}).merge(BaseModelSchema);

export type Message = z.infer<typeof Message>;


export const MessageCreateSchema = z.object({
  content: z.string({ required_error: "Property `content` is required" }).nonempty(),
  channelId: z.string({ required_error: "Property `channelId` is required" }).nonempty(),
});

export type MessageCreate = z.infer<typeof MessageCreateSchema>;


export const MessageUpdateSchema = z.object({
  content: z.string({ required_error: "Property `content` is required" }).nonempty(),
  channelId: z.string({ required_error: "Property `channelId` is required" }).nonempty(),
}).merge(ModelIdSchema);

export type MessageUpdate = z.infer<typeof MessageUpdateSchema>;


export const MessageToggleReactionSchema = z.object({
  messageId: z.string({ required_error: "Property `messageId` is required" }).nonempty(),
  emojiCode: z.string({ required_error: "Property `emojiCode` is required" }).nonempty(),
});

export type MessageToggleReaction = z.infer<typeof MessageToggleReactionSchema>;
