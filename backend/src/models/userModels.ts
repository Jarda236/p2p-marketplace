import z from 'zod';
import { BaseModelSchema, ModelIdSchema } from './baseModels';

export const UserSchema = z.object({
    name: z.string({ required_error: 'Property name is required' }).nonempty(),
    password_hash: z.string({ required_error: 'Property password_hash is required' }).nonempty(),
    email: z.string({ required_error: 'Property email is required' }).nonempty(),
    phone: z.string({ required_error: 'Property phone is required' }).nonempty(),
    address: z.string({ required_error: 'Property address is required' }).nonempty(),
    createdAt: z.date(),
    rating_sum: z.number(),
    rating_count: z.number(),
    id: z.string(),
    image: z.string().nullable().optional(),
    deletedAt: z.date().nullable().optional(),
    updatedAt: z.date().optional(),
}).merge(BaseModelSchema);

export type User = z.infer<typeof UserSchema>;


export const UserCreateSchema = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    password_hash: z.string({ required_error: 'Property `password_hash` is required' }).nonempty(),
    email: z.string({ required_error: 'Property `email` is required' }).nonempty(),
    phone: z.string({ required_error: 'Property `phone` is required' }).nonempty(),
    address: z.string({ required_error: 'Property `address` is required' }).nonempty(),
    created_at: z.date(),
    rating_sum: z.number(),
    rating_count: z.number(),
    image: z.string().optional(),
    updated_at: z.date().optional(),
    deleted_at: z.date().nullable().optional(),
})

export type UserCreate = z.infer<typeof UserCreateSchema>;


export const UserUpdateSchema = z.object({
    name: z.string().optional(),
    password_hash: z.string({ required_error: 'Property `password_hash` is required' }).nonempty().optional(),
    email: z.string().optional(),
    phone: z.string({ required_error: 'Property `phone` is required' }).nonempty().optional(),
    address: z.string({ required_error: 'Property `address` is required' }).nonempty().optional(),
    rating_sum: z.number().optional(),
    rating_count: z.number().optional(),
    image: z.string().optional(),
    deleted_at: z.date().nullable().optional(),
}).merge(ModelIdSchema)

export type UserUpdate = z.infer<typeof UserUpdateSchema>;


