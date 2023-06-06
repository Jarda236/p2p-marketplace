import z from "zod";
import { BaseModelSchema, ModelIdSchema } from "./baseModels";

export const Transaction = z.object({
  sellerId: z.string({ required_error: "Property `sellerId` is required" }).nonempty(),
  buyerId: z.string({ required_error: "Property `byuerId` is required" }).nonempty(),
  amount: z.number({ required_error: "Property `amout` is required" }),
  status: z.string({ required_error: "Property `status` is required" }).nonempty(),
}).merge(BaseModelSchema);

export type Transaction = z.infer<typeof Transaction>;


export const TransactionCreateSchema = z.object({
  offerId: z.string({ required_error: "Property `offerId` is required" }).nonempty(),
  sellerId: z.string({ required_error: "Property `sellerId` is required" }).nonempty(),
  buyerId: z.string({ required_error: "Property `byuerId` is required" }).nonempty(),
  status: z.string({ required_error: "Property `status` is required" }).nonempty(),
  amount: z.number({ required_error: "Property `amout` is required" }),
});

export type TransactionCreate = z.infer<typeof TransactionCreateSchema>;


export const TransactionUpdateSchema = z.object({
  status: z.string({ required_error: "Property `status` is required" }).nonempty().optional(),
}).merge(ModelIdSchema);

export type TransactionUpdate = z.infer<typeof TransactionUpdateSchema>;