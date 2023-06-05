import z from 'zod';

import { BaseModelSchema, ModelIdSchema } from './baseModels';

export const EmojiSchema = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    code: z.string({ required_error: 'Property `code` is required' }).nonempty(),
}).merge(BaseModelSchema)

export type Emoji = z.infer<typeof EmojiSchema>;


export const EmojiCreateSchema = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    code: z.string({ required_error: 'Property `code` is required' }).nonempty(),
})

export type EmojiCreate = z.infer<typeof EmojiCreateSchema>;


export const EmojiUpdateSchema = z.object({
    name: z.string().optional(),
    code: z.string().optional(),
}).merge(ModelIdSchema)

export type EmojiUpdate = z.infer<typeof EmojiUpdateSchema>;


