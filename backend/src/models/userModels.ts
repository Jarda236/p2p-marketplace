import z from 'zod';
import { BaseModelSchema, ModelIdSchema } from './baseModels';

export const User = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    email: z.string({ required_error: 'Property `email` is required' }).nonempty(),
    picture: z.string().nullable().optional(),
}).merge(BaseModelSchema)

export type User = z.infer<typeof User>;


export const UserCreateSchema = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    email: z.string({ required_error: 'Property `email` is required' }).nonempty(),
    picture: z.string().nullable().optional(),
})

export type UserCreate = z.infer<typeof UserCreateSchema>;


export const UserUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    picture: z.string().nullable().optional(),
}).merge(ModelIdSchema)

export type UserUpdate = z.infer<typeof UserUpdateSchema>;


