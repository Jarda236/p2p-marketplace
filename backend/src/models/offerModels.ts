import z from 'zod';

import { BaseModelSchema, ModelIdSchema } from './baseModels';

export const OfferSchema = z.object({
    userId: z.string({ required_error: 'Property `userId` is required' }).nonempty(),
    transactionId: z.string({ required_error: 'Property `transactionId` is required' }).nonempty(),
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    description: z.string({ required_error: 'Property `description` is required' }).nonempty(),
    price: z.number({ required_error: 'Property `price` is required' }),
    category: z.array(z.string()),
    picture: z.string({ required_error: 'Property `picture` is required' }).nonempty(),
    sold_at: z.date().optional(),
}).merge(BaseModelSchema)

export type Offer = z.infer<typeof OfferSchema>;


export const OfferCreateSchema = z.object({
    userId: z.string({ required_error: 'Property `userId` is required' }).nonempty(),
    transactionId: z.string({ required_error: 'Property `transactionId` is required' }).nonempty(),
    name: z.string({ required_error: 'Property `name` is required' }).nonempty(),
    description: z.string({ required_error: 'Property `description` is required' }).nonempty(),
    price: z.number({ required_error: 'Property `price` is required' }),
    category: z.array(z.string()),
    picture: z.string({ required_error: 'Property `picture` is required' }).nonempty(),
})

export type OfferCreate = z.infer<typeof OfferCreateSchema>;


export const OfferUpdateSchema = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty().optional(),
    description: z.string({ required_error: 'Property `description` is required' }).nonempty().optional(),
    price: z.number({ required_error: 'Property `price` is required' }).optional(),
    category: z.array(z.string()).optional(),
    picture: z.string({ required_error: 'Property `picture` is required' }).nonempty().optional(),
}).merge(ModelIdSchema)

export type OfferUpdate = z.infer<typeof OfferUpdateSchema>;
