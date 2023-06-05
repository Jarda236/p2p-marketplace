import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User, UserCreate, UserUpdate } from '../models';
import prisma from '../client';

export const getAll = async (): Promise<Result<User[], Error>> => {
    try {
        const users = await prisma.user.findMany();
        return Result.ok(users);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}


export const getSingle = async (id: string): Promise<Result<User | null, Error>> => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const createSingle = async (data: UserCreate): Promise<Result<User, Error>> => {
    try {
        const user = await prisma.user.create({ data });
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