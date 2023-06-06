import z from "zod";
import { BaseModelSchema, ModelIdSchema } from "./baseModels";

export const CounterOffer = z.object({
  offerId: z.string({ required_error: "Property `offerId` is required" }).nonempty(),
  userId: z.string({ required_error: "Property `userId` is required" }).nonempty(),
  status: z.boolean({ required_error: "Property `status` is required" }).nullable(),
  price: z.number({ required_error: "Property `price` is required" }),
}).merge(BaseModelSchema);

export type CounterOffer = z.infer<typeof CounterOffer>;


export const CounterOfferCreateSchema = z.object({
  offerId: z.string({ required_error: "Property `offerId` is required" }).nonempty(),
  userId: z.string({ required_error: "Property `userId` is required" }).nonempty(),
  status: z.boolean({ required_error: "Property `status` is required" }).nullable(),
  price: z.number({ required_error: "Property `price` is required" }),
  itemsID: z.array(z.string()),
});

export type CounterOfferCreate = z.infer<typeof CounterOfferCreateSchema>;


export const CounterOfferUpdateSchema = z.object({
  status: z.boolean({ required_error: "Property `status` is required" }).nullable().optional(),
  price: z.number({ required_error: "Property `price` is required" }).optional(),
  itemsID: z.array(z.string()).optional(),
}).merge(ModelIdSchema);

export type CounterOfferUpdate = z.infer<typeof CounterOfferUpdateSchema>;