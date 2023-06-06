import z from "zod";
import { BaseModelSchema, ModelIdSchema } from "./baseModels";

export const FundsAccount = z.object({
  userId: z.string({ required_error: "Property `userId` is required" }).nonempty(),
  balance: z.number({ required_error: "Property `balance` is required" }),
  balanceBlocked: z.number({ required_error: "Property `balanceBlocked` is required" }),
}).merge(BaseModelSchema);

export type FundsAccount = z.infer<typeof FundsAccount>;


export const FundsAccountCreateSchema = z.object({
  userId: z.string({ required_error: "Property `userId` is required" }).nonempty(),
  balance: z.number({ required_error: "Property `balance` is required" }),
  balanceBlocked: z.number({ required_error: "Property `balanceBlocked` is required" }),
});

export type FundsAccountCreate = z.infer<typeof FundsAccountCreateSchema>;


export const FundsAccountUpdateSchema = z.object({
  userId: z.string({ required_error: "Property `userId` is required" }).nonempty().optional(),
  balance: z.number({ required_error: "Property `balance` is required" }).optional(),
  balanceBlocked: z.number({ required_error: "Property `balanceBlocked` is required" }).optional(),
})//.merge(ModelIdSchema);

export type FundsAccountUpdate = z.infer<typeof FundsAccountUpdateSchema>;
