import { Result } from "@badrap/result";
import { Decimal, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CounterOffer, CounterOfferCreate, CounterOfferUpdate } from '../models';
import prisma from '../client';

export const getAll = async (): Promise<Result<CounterOffer[], Error>> => {
    try {
        const co = await prisma.counterOffer.findMany();
        const aa = Array(co.length).fill(undefined);
        for(let i = 0; i < co.length; i++) {
            aa[i] = { ...co[i], amount: co[i].amount.toNumber() };
        }
        return Result.ok(aa);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}


export const getSingle = async (id: string): Promise<Result<CounterOffer | null, Error>> => {
    try {
        var co = await prisma.counterOffer.findUnique({ where: { id } });
        if (co && co.amount) {
             var a = { ...co, amount: co.amount.toNumber() };
             return Result.ok(a);
          }
        return Result.err(new Error(`aaaaaa ${co}`));
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const createSingle = async (data: CounterOfferCreate): Promise<Result<CounterOffer, Error>> => {
    try {
        const user = await prisma.counterOffer.create({ data });
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const updateSingle = async (id: string, data: UserUpdate): Promise<Result<User, Error>> => {
    try {
        const user = await prisma.user.update({ where: { id }, data });
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};
  

export const deleteSingle = async (id: string) => {
    try {
        const user = await prisma.user.delete({ where: { id } });
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}