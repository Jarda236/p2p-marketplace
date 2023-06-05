import z from 'zod';


export const ModelIdSchema = z.object({
    id: z.string(),
})

export type ModelId = z.infer<typeof ModelIdSchema>;


export const BaseModelSchema = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
}).merge(ModelIdSchema);

export type BaseModel = z.infer<typeof BaseModelSchema>;


export const ParamsWithIdSchema = z.object({
    id: z.string({ required_error: 'Missing `id` in url parameters' }).nonempty(),
})

export type ParamsWithId = z.infer<typeof ParamsWithIdSchema>;


export const HeadersWithUserIdSchema = z.object({
    ['X-User']: z.string({ required_error: 'Missing `X-User` user in headers' }).nonempty(),
})

export type HeadersWithUserId = z.infer<typeof HeadersWithUserIdSchema>;