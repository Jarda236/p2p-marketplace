import z from 'zod';

import { BaseModelSchema, ModelIdSchema } from './baseModels';

export const ItemSchema = z.object({
    userId: z.string({ required_error: 'Property `userId` is required' }).nonempty(),
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    description: z.string({ required_error: 'Property `description` is required' }).nonempty(),
    category: z.string({ required_error: 'Property `category` is required' }).nonempty(),
    image: z.string({ required_error: 'Property `image` is required' }).nonempty(), 
    status: z.boolean({ required_error: 'Property `status` is required' }).nullable(),
}).merge(BaseModelSchema)

export type Item = z.infer<typeof ItemSchema>;


export const ItemCreateSchema = z.object({
    userId: z.string({ required_error: 'Property `userId` is required' }).nonempty(),
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    description: z.string({ required_error: 'Property `description` is required' }).nonempty(),
    category: z.string({ required_error: 'Property `category` is required' }).nonempty(),
    image: z.string({ required_error: 'Property `image` is required' }).nonempty(),
    status: z.boolean({ required_error: 'Property `status` is required' }).nullable().optional(),
})

export type ItemCreate = z.infer<typeof ItemCreateSchema>;


export const ItemUpdateSchema = z.object({
    userId: z.string({ required_error: 'Property `userId` is required' }).nonempty().optional(),
    name: z.string({ required_error: 'Property `name` is required' }).nonempty().optional(),
    description: z.string({ required_error: 'Property `description` is required' }).nonempty().optional(),
    category: z.string({ required_error: 'Property `category` is required' }).nonempty().optional(),
    image: z.string({ required_error: 'Property `image` is required' }).nonempty().optional(), 
    status: z.boolean({ required_error: 'Property `status` is required' }).nullable().optional(),
})//.merge(ModelIdSchema)

export type ItemUpdate = z.infer<typeof ItemUpdateSchema>;
