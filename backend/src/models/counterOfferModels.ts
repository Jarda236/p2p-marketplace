import z from "zod";
import { BaseModelSchema, ModelIdSchema } from "./baseModels";

export const CounterOffer = z.object({
  offerId: z.string({ required_error: "Property `offerId` is required" }).nonempty(),
  userId: z.string({ required_error: "Property `userId` is required" }).nonempty(),
  status: z.string({ required_error: "Property `status` is required" }).nonempty(),
}).merge(BaseModelSchema);

export type CounterOffer = z.infer<typeof CounterOffer>;


export const CounterOfferCreateSchema = z.object({
  offerId: z.string({ required_error: "Property `offerId` is required" }).nonempty(),
  userId: z.string({ required_error: "Property `userId` is required" }).nonempty(),
  status: z.string({ required_error: "Property `status` is required" }).nonempty(),
});

export type CounterOfferCreate = z.infer<typeof CounterOfferCreateSchema>;


export const CounterOfferUpdateSchema = z.object({
  status: z.string({ required_error: "Property `status` is required" }).nonempty().optional(),
}).merge(ModelIdSchema);

export type CounterOfferUpdate = z.infer<typeof CounterOfferUpdateSchema>;