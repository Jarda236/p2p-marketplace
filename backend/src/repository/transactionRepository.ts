import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Transaction, TransactionCreate, TransactionUpdate } from '../models';
import prisma from '../client';

export const getAll = async (): Promise<Result<Transaction[], Error>> => {
    try {
        const transactions = await prisma.transaction.findMany();
        const pom = Array(transactions.length).fill(undefined);
        for(let i = 0; i < transactions.length; i++) {
            pom[i] = { ...transactions[i], amount: transactions[i].amount.toNumber() };
        }
        return Result.ok(pom);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}

export const getSingle = async (id: string): Promise<Result<Transaction | null, Error>> => {
    try {
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction == null){
            const pom = { ...transaction, amount: transaction?.amount.toNumber() };
            Result.ok(pom);
        }
        return Result.ok(null);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const createSingle = async (data: TransactionCreate): Promise<Result<Transaction, Error>> => {
    try {
        const transaction = await prisma.transaction.create({ data });
        const pom = { ...transaction, amount: transaction?.amount.toNumber() };
        return Result.ok(pom);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const updateSingle = async (id: string, data: TransactionUpdate): Promise<Result<Transaction, Error>> => {
    try {
        const transaction = await prisma.transaction.update({ where: { id }, data });
        const pom = { ...transaction, amount: transaction?.amount.toNumber() };
        return Result.ok(pom);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};
  

export const deleteSingle = async (id: string) => {
    try {
        const transaction = await prisma.transaction.delete({ where: { id } });
        return Result.ok(transaction);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}