import { Result } from "@badrap/result";
import { Decimal, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Offer, OfferCreate, OfferUpdate } from '../models';
import prisma from '../client';

export const getAll = async (): Promise<Result<Offer[], Error>> => {
    try {
        const result = await prisma.offer.findMany();
        const aa = Array(result.length).fill(undefined);
        for(let i = 0; i < result.length; i++) {
            aa[i] = { ...result[i], price: result[i].price.toNumber() };
        }
        return Result.ok(aa);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}


export const getSingle = async (id: string): Promise<Result<Offer | null, Error>> => {
    try {
        var result = await prisma.offer.findUnique({ where: { id } });
        if (result && result.price) {
             var a = { ...result, price: result.price.toNumber() };
             return Result.ok(a);
          }
        return Result.ok(null);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const createSingle = async (data: OfferCreate): Promise<Result<Offer, Error>> => {
    try {
        const result = await prisma.offer.create({ data });
        if (result && result.price) {
            var a = { ...result, price: result.price.toNumber() };
            return Result.ok(a);
         }
       return Result.err(new Error(`aaaaaa ${result}`));
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const updateSingle = async (id: string, data: OfferUpdate): Promise<Result<Offer, Error>> => {
    try {
        const result = await prisma.offer.update({ where: { id }, data });
        if (result && result.price) {
            var a = { ...result, price: result.price.toNumber() };
            return Result.ok(a);
         }
       return Result.err(new Error(`aaaaaa ${result}`));
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const deleteSingle = async (id: string) => {
    try {
        const result = await prisma.offer.delete({ where: { id } });
        return Result.ok(result);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}