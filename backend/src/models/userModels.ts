import z from 'zod';
import { BaseModelSchema, ModelIdSchema } from './baseModels';
import { FundsAccount } from './fundsAccountModels';

export const UserSchema = z.object({
    name: z.string({ required_error: 'Property name is required' }).nonempty(),
    password_hash: z.string({ required_error: 'Property password_hash is required' }).nonempty(),
    email: z.string({ required_error: 'Property email is required' }).nonempty(),
    phone: z.string({ required_error: 'Property phone is required' }).nonempty(),
    city: z.string({ required_error: 'Property city is required' }).nonempty(),
    createdAt: z.date({required_error: 'createdAt required' }),
    rating_sum: z.number({required_error: 'rating_sum required' }),
    rating_count: z.number({required_error: 'rating_count required' }),
    id: z.string({required_error: 'id required' }),
    image: z.string().nullable().nullable().optional(),
    deletedAt: z.date().nullable(),
    fundsAccount: z.object({
        userId: z.string({ required_error: "Property `userId` is required" }).nonempty(),
        balance: z.number({ required_error: "Property `balance` is required" }),
        balanceBlocked: z.number({ required_error: "Property `balanceBlocked` is required" }),
      }).merge(BaseModelSchema).nullable()
}).merge(BaseModelSchema);

export type User = z.infer<typeof UserSchema>;


export const UserCreateSchema = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    password_hash: z.string({ required_error: 'Property `password_hash` is required' }).nonempty(),
    email: z.string({ required_error: 'Property `email` is required' }).nonempty(),
    phone: z.string({ required_error: 'Property `phone` is required' }).nonempty(),
    city: z.string({ required_error: 'Property `address` is required' }).nonempty(),
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
    city: z.string({ required_error: 'Property `address` is required' }).nonempty().optional(),
    rating_sum: z.number().optional(),
    rating_count: z.number().optional(),
    image: z.string().optional(),
    deleted_at: z.date().nullable().optional(),
})//.merge(ModelIdSchema)

export type UserUpdate = z.infer<typeof UserUpdateSchema>;


