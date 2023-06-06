import z from 'zod';

import { BaseModelSchema, ModelIdSchema } from './baseModels';

export const OfferSchema = z.object({
    userId: z.string({ required_error: 'Property `userId` is required' }).nonempty(),
    price: z.number({ required_error: 'Property `price` is required' }),
    image: z.string({ required_error: 'Property `picture` is required' }).nonempty(),  
    itemId: z.string({ required_error: 'Property `itemId` is required' }).nonempty(),
}).merge(BaseModelSchema)

export type Offer = z.infer<typeof OfferSchema>;


export const OfferCreateSchema = z.object({
    userId: z.string({ required_error: 'Property `userId` is required' }).nonempty(),
    userName: z.string({ required_error: 'Property `userName` is required' }).nonempty(),
    price: z.number({ required_error: 'Property `price` is required' }),
    image: z.string({ required_error: 'Property `picture` is required' }).nonempty(),
    itemId: z.string({ required_error: 'Property `itemId` is required' }).nonempty(),
})

export type OfferCreate = z.infer<typeof OfferCreateSchema>;


export const OfferUpdateSchema = z.object({
    name: z.string({ required_error: 'Property `name` is required' }).nonempty().optional(),
    price: z.number({ required_error: 'Property `price` is required' }).optional(),
    image: z.string({ required_error: 'Property `picture` is required' }).nonempty().optional(),
})//.merge(ModelIdSchema)

export type OfferUpdate = z.infer<typeof OfferUpdateSchema>;
